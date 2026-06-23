import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
const auth = betterAuth({
  database: { provider: "sqlite" },
  emailAndPassword: { enabled: true }
});
console.log("Endpoints:");
for (const key in auth.api) {
  const ep = auth.api[key];
  if (ep && ep.path) {
    console.log(key, "=>", ep.path);
  }
}
