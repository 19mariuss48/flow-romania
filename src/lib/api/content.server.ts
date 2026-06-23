import { db } from "@/db";
import { siteContent } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getSiteContent = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    try {
      const result = await db.select().from(siteContent).where(eq(siteContent.id, data.id)).limit(1);
      if (result.length > 0) {
        return result[0].content;
      }
      return null;
    } catch (err) {
      console.error("Failed to fetch site content:", err);
      return null;
    }
  });

export const updateSiteContent = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string(), content: z.any() }))
  .handler(async ({ data }) => {
    try {
      // Upsert
      const existing = await db.select().from(siteContent).where(eq(siteContent.id, data.id)).limit(1);
      if (existing.length > 0) {
        await db.update(siteContent).set({
          content: data.content,
          updated_at: new Date()
        }).where(eq(siteContent.id, data.id));
      } else {
        await db.insert(siteContent).values({
          id: data.id,
          content: data.content,
          updated_at: new Date()
        });
      }
      return { success: true };
    } catch (err: any) {
      console.error("Failed to update site content:", err);
      throw new Error(err.message || "Failed to update site content");
    }
  });
