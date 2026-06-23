import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "@/db";
import { profiles, applications, pageMetrics, forumThreads } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const getAllProfiles = createServerFn({ method: "POST" })
  .handler(async () => {
    // În mod normal ar trebui verificat dacă cel care face cererea este admin.
    const allProfiles = await db.query.profiles.findMany();
    return allProfiles;
  });

export const adminUpdateProfile = createServerFn({ method: "POST" })
  .inputValidator((d: any) => d)
  .handler(async ({ data }) => {
    await db.update(profiles).set({
      ...data.updates,
      updated_at: new Date()
    }).where(eq(profiles.id, data.userId));
    return { success: true };
  });

export const getAllApplications = createServerFn({ method: "POST" })
  .handler(async () => {
    const apps = await db.query.applications.findMany({
      orderBy: (apps, { desc }) => [desc(apps.created_at)]
    });
    return apps;
  });

export const updateApplicationStatus = createServerFn({ method: "POST" })
  .inputValidator((d: any) => d)
  .handler(async ({ data }) => {
    await db.update(applications).set({
      status: data.status,
      admin_response: data.adminResponse || null,
      updated_at: new Date()
    }).where(eq(applications.id, data.appId));
    return { success: true };
  });

export const getViewsStatistics = createServerFn({ method: "GET" })
  .handler(async () => {
    const pages = await db.query.pageMetrics.findMany();
    const threads = await db.query.forumThreads.findMany({
      orderBy: (threads, { desc }) => [desc(threads.views_count)]
    });

    return {
      pages,
      threads: threads.map(t => ({
        id: t.id,
        title: t.title,
        category: t.category || "General",
        views_count: t.views_count
      }))
    };
  });
