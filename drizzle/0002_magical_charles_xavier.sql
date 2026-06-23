CREATE TABLE `site_content` (
	`id` varchar(255) NOT NULL,
	`content` json NOT NULL,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `site_content_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `forum_threads` ADD `category` varchar(50);