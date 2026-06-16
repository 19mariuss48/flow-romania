CREATE TABLE `applications` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`type` varchar(50) NOT NULL,
	`character_name` varchar(255) NOT NULL,
	`age` int NOT NULL,
	`playtime_hours` int NOT NULL,
	`motivation` text NOT NULL,
	`status` varchar(50) NOT NULL DEFAULT 'in_asteptare',
	`admin_response` text,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `page_metrics` (
	`id` varchar(255) NOT NULL,
	`views_count` int NOT NULL DEFAULT 0,
	CONSTRAINT `page_metrics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `applications` ADD CONSTRAINT `applications_user_id_profiles_id_fk` FOREIGN KEY (`user_id`) REFERENCES `profiles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `profiles` DROP COLUMN `reputation`;