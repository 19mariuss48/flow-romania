import { createServerFn } from "@tanstack/react-start";

import { getCache } from "./cache.server";

export const getServerStatus = createServerFn({ method: "GET" }).handler(async () => {
  const fivemIp = process.env.FIVEM_SERVER_IP; // e.g. "play.flowromania.ro:30120"
  const discordId = process.env.DISCORD_WIDGET_ID; // e.g. "1234567890"
  const launchDateStr = process.env.LAUNCH_DATE; // e.g. "2026-06-30T18:00:00Z"

  // Check if we have synced data from FiveM API
  const syncedData = getCache<any>("fivem_server_sync_data") || {};

  const status = {
    players: 0,
    maxPlayers: 300,
    discord: "0",
    launchDate: launchDateStr || "2026-06-30T18:00:00Z",
    
    // Default fallback values if no API sync yet
    queue: syncedData.queue ?? 0,
    uptime: syncedData.uptime ?? "99.9%",
    ping: "--ms",
    version: syncedData.version ?? "v1.0",
    
    restartPhase: syncedData.restartPhase ?? "online", // countdown, restarting, offline, online
    restartTime: syncedData.restartTime ?? 0,
    lastRestart: syncedData.lastRestart ?? "--:--",
    
    dvPhase: syncedData.dvPhase ?? "idle", // countdown, idle
    dvTime: syncedData.dvTime ?? 0,
    lastDvTime: syncedData.lastDvTime ?? "--:--",
    
    whitelist: false,
  };

  try {
    // 1. Fetch FiveM Status (Dynamic & Info)
    if (fivemIp) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const startTime = Date.now();
      
      const [dynamicRes, infoRes] = await Promise.all([
        fetch(`http://${fivemIp}/dynamic.json`, { signal: controller.signal }).catch(() => null),
        fetch(`http://${fivemIp}/info.json`, { signal: controller.signal }).catch(() => null)
      ]);
        
      clearTimeout(timeoutId);

      if (dynamicRes && dynamicRes.ok) {
        status.ping = `${Date.now() - startTime}ms`;
        const data = await dynamicRes.json();
        if (data && typeof data.clients === 'number') {
          status.players = data.clients;
          status.maxPlayers = data.sv_maxclients || 300;
        }
      } else {
        status.ping = "OFFLINE";
        status.restartPhase = "offline";
      }

      if (infoRes && infoRes.ok) {
        const infoData = await infoRes.json();
        if (infoData && infoData.server) {
          // Sometimes version is in infoData.server (e.g. "FXServer-master v1.0.0.9850")
          const versionMatch = infoData.server.match(/v\d+\.\d+\.\d+\.\d+/);
          if (versionMatch) {
            status.version = versionMatch[0];
          }
        }
      }
    }

    // 2. Fetch Discord Status (Total Members via Invite API)
    const inviteCode = "flowro";
    const res = await fetch(`https://discord.com/api/v10/invites/${inviteCode}?with_counts=true`)
      .catch(() => null);
      
    if (res && res.ok) {
      const data = await res.json();
      if (data && data.approximate_member_count) {
        const count = data.approximate_member_count;
        status.discord = count > 999 ? (count / 1000).toFixed(1) + 'k' : count.toString();
      }
    } else if (discordId) {
      const fallbackRes = await fetch(`https://discord.com/api/guilds/${discordId}/widget.json`)
        .catch(() => null);
      if (fallbackRes && fallbackRes.ok) {
        const data = await fallbackRes.json();
        if (data && data.presence_count) {
          const count = data.presence_count;
          status.discord = count > 999 ? (count / 1000).toFixed(1) + 'k' : count.toString();
        }
      }
    }
  } catch (error) {
    console.error("Error fetching server status:", error);
  }

  return status;
});
