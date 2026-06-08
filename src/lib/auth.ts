import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5173",
  trustedOrigins: ["https://flow-romania.vercel.app", "http://localhost:5173"],
  secret: process.env.BETTER_AUTH_SECRET || "fallback_secret_for_development",
  database: drizzleAdapter(db, {
    provider: "mysql", // or "pg" or "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    generateId: false // Because we're using varchar(36) UUIDs
  }
});
