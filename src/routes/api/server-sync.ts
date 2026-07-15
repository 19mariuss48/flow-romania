import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { setCache } from "@/lib/api/cache.server";

export const APIRoute = createAPIFileRoute("/api/server-sync")({
  POST: async ({ request }) => {
    try {
      const data = await request.json();
      console.log("[FLOW-DEBUG] Date primite pe API /api/server-sync:", data);
      
      // Expected payload: { uptime: string, queue: number, restartPhase?: string, restartTime?: number, dvPhase?: string, dvTime?: number, secret: string }
      
      // Security check
      if (data.secret !== process.env.FIVEM_API_SECRET) {
        return json({ error: "Unauthorized" }, { status: 401 });
      }

      setCache("fivem_server_sync_data", data, 120); // Valid for 2 minutes

      return json({ success: true });
    } catch (err) {
      return json({ error: "Bad Request" }, { status: 400 });
    }
  }
});
