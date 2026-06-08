CREATE TABLE `account` (
	`id` varchar(36) NOT NULL,
	`accountId` text NOT NULL,
	`providerId` text NOT NULL,
	`userId` varchar(36) NOT NULL,
	`accessToken` text,
	`refreshToken` text,
	`idToken` text,
	`accessTokenExpiresAt` datetime,
	`refreshTokenExpiresAt` datetime,
	`scope` text,
	`password` text,
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime NOT NULL,
	CONSTRAINT `account_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `forum_categories` (
	`id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`order_index` int NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `forum_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `forum_categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `forum_likes` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`thread_id` varchar(36),
	`post_id` varchar(36),
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `forum_likes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `forum_posts` (
	`id` varchar(36) NOT NULL,
	`thread_id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`content` text NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `forum_posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `forum_threads` (
	`id` varchar(36) NOT NULL,
	`forum_id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`is_pinned` boolean NOT NULL DEFAULT false,
	`is_locked` boolean NOT NULL DEFAULT false,
	`views_count` int NOT NULL DEFAULT 0,
	`replies_count` int NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `forum_threads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `forums` (
	`id` varchar(36) NOT NULL,
	`category_id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` text,
	`icon` varchar(50) NOT NULL DEFAULT '◆',
	`threads_count` int NOT NULL DEFAULT 0,
	`posts_count` int NOT NULL DEFAULT 0,
	`order_index` int NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `forums_id` PRIMARY KEY(`id`),
	CONSTRAINT `forums_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` varchar(36) NOT NULL,
	`username` varchar(255) NOT NULL,
	`display_name` varchar(255),
	`character_name` varchar(255),
	`avatar_url` text,
	`bio` text,
	`faction` varchar(100),
	`fivem_connected` boolean NOT NULL DEFAULT false,
	`fivem_username` varchar(255),
	`fivem_license` varchar(255),
	`fivem_discord_id` varchar(100),
	`fivem_steam_hex` varchar(100),
	`fivem_cash` int DEFAULT 0,
	`fivem_bank` int DEFAULT 0,
	`fivem_job` varchar(255),
	`fivem_playtime` int DEFAULT 0,
	`fivem_character_data` json,
	`fivem_synced_at` datetime,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `profiles_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(36) NOT NULL,
	`expiresAt` datetime NOT NULL,
	`token` varchar(255) NOT NULL,
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime NOT NULL,
	`ipAddress` text,
	`userAgent` text,
	`userId` varchar(36) NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`),
	CONSTRAINT `session_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(36) NOT NULL,
	`name` text NOT NULL,
	`email` varchar(255) NOT NULL,
	`emailVerified` boolean NOT NULL,
	`image` text,
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` varchar(36) NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expiresAt` datetime NOT NULL,
	`createdAt` datetime,
	`updatedAt` datetime,
	CONSTRAINT `verification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forum_likes` ADD CONSTRAINT `forum_likes_user_id_profiles_id_fk` FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forum_likes` ADD CONSTRAINT `forum_likes_thread_id_forum_threads_id_fk` FOREIGN KEY (`thread_id`) REFERENCES `forum_threads`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forum_likes` ADD CONSTRAINT `forum_likes_post_id_forum_posts_id_fk` FOREIGN KEY (`post_id`) REFERENCES `forum_posts`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forum_posts` ADD CONSTRAINT `forum_posts_thread_id_forum_threads_id_fk` FOREIGN KEY (`thread_id`) REFERENCES `forum_threads`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forum_posts` ADD CONSTRAINT `forum_posts_user_id_profiles_id_fk` FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forum_threads` ADD CONSTRAINT `forum_threads_forum_id_forums_id_fk` FOREIGN KEY (`forum_id`) REFERENCES `forums`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forum_threads` ADD CONSTRAINT `forum_threads_user_id_profiles_id_fk` FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forums` ADD CONSTRAINT `forums_category_id_forum_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `forum_categories`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;