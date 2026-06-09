import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { profiles } from "../db/schema";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:8081"),
  trustedOrigins: ["https://flow-romania.vercel.app", "http://localhost:8081", "http://localhost:5173", process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""].filter(Boolean),
  secret: process.env.BETTER_AUTH_SECRET || "fallback_secret_for_development",
  database: drizzleAdapter(db, {
    provider: "mysql", // or "pg" or "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    generateId: false // Because we're using varchar(36) UUIDs
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await db.insert(profiles).values({
            id: user.id,
            username: user.name,
            display_name: user.name,
          });
        }
      }
    }
  }
});
