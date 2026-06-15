import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "@/db";
import { profiles, applications } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUserProfile = createServerFn({ method: "POST" })
  .validator(z.object({ userId: z.string() }))
  .handler(async ({ data }) => {
    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.id, data.userId),
    });
    return profile || null;
  });

export const updateUserProfile = createServerFn({ method: "POST" })
  .validator(z.object({
    userId: z.string(),
    displayName: z.string().optional(),
    bio: z.string().optional(),
    characterName: z.string().optional(),
    faction: z.string().optional(),
    avatarUrl: z.string().optional()
  }))
  .handler(async ({ data }) => {
    const updateData: any = { updated_at: new Date() };
    if (data.displayName !== undefined) updateData.display_name = data.displayName;
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.characterName !== undefined) updateData.character_name = data.characterName;
    if (data.faction !== undefined) updateData.faction = data.faction;
    if (data.avatarUrl !== undefined) updateData.avatar_url = data.avatarUrl;

    await db.update(profiles).set(updateData).where(eq(profiles.id, data.userId));
    return { success: true };
  });

export const disconnectFiveM = createServerFn({ method: "POST" })
  .validator(z.object({ userId: z.string() }))
  .handler(async ({ data }) => {
    await db.update(profiles).set({
      fivem_connected: false,
      fivem_username: null,
      fivem_license: null,
      fivem_discord_id: null,
      fivem_steam_hex: null,
      fivem_cash: 0,
      fivem_bank: 0,
      fivem_job: null,
      fivem_playtime: 0,
      fivem_character_data: [],
      fivem_synced_at: null
    }).where(eq(profiles.id, data.userId));
    return { success: true };
  });

export const updateFiveMSync = createServerFn({ method: "POST" })
  .validator(z.object({
    userId: z.string(),
    syncData: z.any()
  }))
  .handler(async ({ data }) => {
    await db.update(profiles).set({
      ...data.syncData,
      fivem_connected: true,
      fivem_synced_at: new Date()
    }).where(eq(profiles.id, data.userId));
    return { success: true };
  });

export const getUserApplications = createServerFn({ method: "POST" })
  .validator(z.object({ userId: z.string() }))
  .handler(async ({ data }) => {
    const apps = await db.query.applications.findMany({
      where: eq(applications.user_id, data.userId),
      orderBy: (apps, { desc }) => [desc(apps.created_at)]
    });
    return apps;
  });

export const submitApplication = createServerFn({ method: "POST" })
  .validator(z.object({
    userId: z.string(),
    type: z.string(),
    characterName: z.string(),
    age: z.number(),
    playtimeHours: z.number(),
    motivation: z.string()
  }))
  .handler(async ({ data }) => {
    const id = crypto.randomUUID();
    await db.insert(applications).values({
      id,
      user_id: data.userId,
      type: data.type,
      character_name: data.characterName,
      age: data.age,
      playtime_hours: data.playtimeHours,
      motivation: data.motivation,
      status: "in_asteptare"
    });
    return { success: true, id };
  });
