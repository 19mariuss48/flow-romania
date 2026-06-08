import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || "mysql://root:@localhost:3306/flowro";

const poolConnection = mysql.createPool({
  uri: connectionString,
  ssl: { rejectUnauthorized: false }
});

export const db = drizzle(poolConnection, { schema, mode: "default" });
