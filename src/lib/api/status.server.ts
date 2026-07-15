import { createServerFn } from "@tanstack/react-start";
import { getCache } from "./cache.server";

export const getServerStatus = createServerFn({ method: "GET" }).handler(async () => {
  const fivemIp = process.env.FIVEM_SERVER_IP; // e.g. "play.flowromania.ro:30120"
  const launchDateStr = process.env.LAUNCH_DATE; // e.g. "2026-06-30T18:00:00Z"

  // Check if we have synced data from FiveM API
  const syncedData = getCache<any>("fivem_server_sync_data") || {};

  const status = {
    players: syncedData.players ?? 0,
    maxPlayers: syncedData.maxPlayers ?? 300,
    launchDate: launchDateStr || "2026-06-30T18:00:00Z",
    
    // Default fallback values if no API sync yet
    queue: syncedData.queue ?? 0,
    uptime: syncedData.uptime ?? "0h",
    version: "v2.0",
    
    restartPhase: syncedData.status === "ONLINE" ? "online" : (syncedData.restartPhase ?? "online"),
    nextRestart: syncedData.nextRestart ?? "--:--",
    lastRestart: syncedData.lastRestart ?? "--:--",
    
    nextDv: syncedData.nextDv ?? "--:--",
    lastDv: syncedData.lastDv ?? "--:--",
    
    whitelist: syncedData.whitelisted === "ON" || syncedData.whitelist || false,
  };

  try {
    // Fetch FiveM Status (Dynamic)
    if (fivemIp) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const res = await fetch(`http://${fivemIp}/dynamic.json`, { signal: controller.signal }).catch(() => null);
        
      clearTimeout(timeoutId);

      if (res && res.ok) {
        const data = await res.json();
        if (data && typeof data.clients === 'number') {
          status.players = data.clients;
          status.maxPlayers = data.sv_maxclients || 300;
          status.restartPhase = "online";
        }
      } else {
        if (syncedData.status !== "ONLINE") {
          status.restartPhase = "offline";
        }
      }
    }
  } catch (error) {
    console.error("Error fetching server status:", error);
  }

  return status;
});
