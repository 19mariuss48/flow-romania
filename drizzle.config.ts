import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    host: 'serverless-europe-west2.sysp0000.db2.skysql.com',
    port: 4078,
    user: 'dbpgf35443969',
    password: '4SEOQ8xA5Ckj77wdN0(4Q9',
    database: 'flowro',
    ssl: "require" as any,
  },
});
