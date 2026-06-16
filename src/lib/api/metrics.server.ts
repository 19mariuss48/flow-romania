import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "@/db";
import { pageMetrics } from "@/db/schema";
import { eq } from "drizzle-orm";

export const incrementPageViews = createServerFn({ method: "POST" })
  .inputValidator(z.object({ pageId: z.string() }))
  .handler(async ({ data }) => {
    try {
      const metric = await db.query.pageMetrics.findFirst({
        where: eq(pageMetrics.id, data.pageId)
      });
      if (metric) {
        await db.update(pageMetrics).set({ views_count: metric.views_count + 1 }).where(eq(pageMetrics.id, data.pageId));
        return metric.views_count + 1;
      } else {
        await db.insert(pageMetrics).values({ id: data.pageId, views_count: 1 });
        return 1;
      }
    } catch {
      return null;
    }
  });

export const getPageViews = createServerFn({ method: "POST" })
  .inputValidator(z.object({ pageId: z.string() }))
  .handler(async ({ data }) => {
    try {
      const metric = await db.query.pageMetrics.findFirst({
        where: eq(pageMetrics.id, data.pageId)
      });
      return metric ? metric.views_count : 0;
    } catch {
      return null;
    }
  });
