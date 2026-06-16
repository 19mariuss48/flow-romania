import { createServerFn } from "@tanstack/react-start";

export const getServerStatus = createServerFn({ method: "GET" }).handler(async () => {
  const fivemIp = process.env.FIVEM_SERVER_IP; // e.g. "play.flowromania.ro:30120"
  const discordId = process.env.DISCORD_WIDGET_ID; // e.g. "1234567890"
  const launchDateStr = process.env.LAUNCH_DATE; // e.g. "2026-06-30T18:00:00Z"

  const status = {
    players: 184,
    maxPlayers: 300,
    discord: "14.2k",
    launchDate: launchDateStr || "2026-06-30T18:00:00Z", // Data default
  };

  try {
    // 1. Fetch FiveM Status
    if (fivemIp) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const res = await fetch(`http://${fivemIp}/dynamic.json`, { signal: controller.signal })
        .catch(() => null);
        
      clearTimeout(timeoutId);

      if (res && res.ok) {
        const data = await res.json();
        if (data && typeof data.clients === 'number') {
          status.players = data.clients;
          status.maxPlayers = data.sv_maxclients || 300;
        }
      }
    }

    // 2. Fetch Discord Status (Total Members via Invite API)
    // We use the vanity URL 'flowro' which is public and gives approximate_member_count
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
      // Fallback to widget.json (which only gives online count) if invite fails
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
