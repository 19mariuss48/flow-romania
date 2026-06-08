import { mysqlTable, varchar, text, int, boolean, datetime, json } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const profiles = mysqlTable("profiles", {
  id: varchar("id", { length: 36 }).primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  display_name: varchar("display_name", { length: 255 }),
  character_name: varchar("character_name", { length: 255 }),
  avatar_url: text("avatar_url"),
  bio: text("bio"),
  faction: varchar("faction", { length: 100 }),
  fivem_connected: boolean("fivem_connected").default(false).notNull(),
  fivem_username: varchar("fivem_username", { length: 255 }),
  fivem_license: varchar("fivem_license", { length: 255 }),
  fivem_discord_id: varchar("fivem_discord_id", { length: 100 }),
  fivem_steam_hex: varchar("fivem_steam_hex", { length: 100 }),
  fivem_cash: int("fivem_cash").default(0),
  fivem_bank: int("fivem_bank").default(0),
  fivem_job: varchar("fivem_job", { length: 255 }),
  fivem_playtime: int("fivem_playtime").default(0),
  fivem_character_data: json("fivem_character_data"),
  fivem_synced_at: datetime("fivem_synced_at"),
  created_at: datetime("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updated_at: datetime("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const forumCategories = mysqlTable("forum_categories", {
  id: varchar("id", { length: 36 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  order_index: int("order_index").default(0).notNull(),
  created_at: datetime("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const forums = mysqlTable("forums", {
  id: varchar("id", { length: 36 }).primaryKey(),
  category_id: varchar("category_id", { length: 36 }).notNull().references(() => forumCategories.id, { onDelete: 'cascade' }),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  icon: varchar("icon", { length: 50 }).default("◆").notNull(),
  threads_count: int("threads_count").default(0).notNull(),
  posts_count: int("posts_count").default(0).notNull(),
  order_index: int("order_index").default(0).notNull(),
  created_at: datetime("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const forumThreads = mysqlTable("forum_threads", {
  id: varchar("id", { length: 36 }).primaryKey(),
  forum_id: varchar("forum_id", { length: 36 }).notNull().references(() => forums.id, { onDelete: 'cascade' }),
  user_id: varchar("user_id", { length: 36 }).notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  is_pinned: boolean("is_pinned").default(false).notNull(),
  is_locked: boolean("is_locked").default(false).notNull(),
  views_count: int("views_count").default(0).notNull(),
  replies_count: int("replies_count").default(0).notNull(),
  created_at: datetime("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updated_at: datetime("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const forumPosts = mysqlTable("forum_posts", {
  id: varchar("id", { length: 36 }).primaryKey(),
  thread_id: varchar("thread_id", { length: 36 }).notNull().references(() => forumThreads.id, { onDelete: 'cascade' }),
  user_id: varchar("user_id", { length: 36 }).notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  content: text("content").notNull(),
  created_at: datetime("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updated_at: datetime("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const forumLikes = mysqlTable("forum_likes", {
  id: varchar("id", { length: 36 }).primaryKey(),
  user_id: varchar("user_id", { length: 36 }).notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  thread_id: varchar("thread_id", { length: 36 }).references(() => forumThreads.id, { onDelete: 'cascade' }),
  post_id: varchar("post_id", { length: 36 }).references(() => forumPosts.id, { onDelete: 'cascade' }),
  created_at: datetime("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// Better Auth core tables
export const user = mysqlTable("user", {
	id: varchar("id", { length: 36 }).primaryKey(),
	name: text('name').notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	emailVerified: boolean('emailVerified').notNull(),
	image: text('image'),
	createdAt: datetime('createdAt').notNull(),
	updatedAt: datetime('updatedAt').notNull()
});

export const session = mysqlTable("session", {
	id: varchar("id", { length: 36 }).primaryKey(),
	expiresAt: datetime('expiresAt').notNull(),
	token: varchar('token', { length: 255 }).notNull().unique(),
	createdAt: datetime('createdAt').notNull(),
	updatedAt: datetime('updatedAt').notNull(),
	ipAddress: text('ipAddress'),
	userAgent: text('userAgent'),
	userId: varchar('userId', { length: 36 }).notNull().references(() => user.id, { onDelete: 'cascade' })
});

export const account = mysqlTable("account", {
	id: varchar("id", { length: 36 }).primaryKey(),
	accountId: text('accountId').notNull(),
	providerId: text('providerId').notNull(),
	userId: varchar('userId', { length: 36 }).notNull().references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('accessToken'),
	refreshToken: text('refreshToken'),
	idToken: text('idToken'),
	accessTokenExpiresAt: datetime('accessTokenExpiresAt'),
	refreshTokenExpiresAt: datetime('refreshTokenExpiresAt'),
	scope: text('scope'),
	password: text('password'),
	createdAt: datetime('createdAt').notNull(),
	updatedAt: datetime('updatedAt').notNull()
});

export const verification = mysqlTable("verification", {
	id: varchar("id", { length: 36 }).primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: datetime('expiresAt').notNull(),
	createdAt: datetime('createdAt'),
	updatedAt: datetime('updatedAt')
});
