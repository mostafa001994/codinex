CREATE TABLE `blog_tags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`blog_id` int NOT NULL,
	`tag_id` int NOT NULL,
	CONSTRAINT `blog_tags_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(191) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`content` text NOT NULL,
	`image_url` varchar(500),
	`seoDescription` text,
	`author_id` int,
	`category_id` int,
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blogs_id` PRIMARY KEY(`id`),
	CONSTRAINT `blogs_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`slug` varchar(191) NOT NULL,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_name_unique` UNIQUE(`name`),
	CONSTRAINT `categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`blog_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `content_media` (
	`id` int AUTO_INCREMENT NOT NULL,
	`entity_type` varchar(50) NOT NULL,
	`entity_id` int NOT NULL,
	`media_id` varchar(191) NOT NULL,
	CONSTRAINT `content_media_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media` (
	`id` varchar(191) NOT NULL,
	`url` varchar(500) NOT NULL,
	`alt` varchar(500) DEFAULT '',
	`title` varchar(500) DEFAULT '',
	`folder` varchar(191) DEFAULT '',
	`size` int NOT NULL,
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `media_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portfolio` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(255),
	`slug` varchar(255),
	`content` text,
	`imageUrl` varchar(500),
	`categoryId` int,
	`tags` json,
	`technologies` json,
	`links` json,
	`status` varchar(50),
	`date` date,
	`clientName` varchar(255),
	`seoTitle` varchar(255),
	`seoDescription` text,
	CONSTRAINT `portfolio_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portfolio_tags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`portfolio_id` int NOT NULL,
	`tag_id` int NOT NULL,
	CONSTRAINT `portfolio_tags_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`slug` varchar(191) NOT NULL,
	CONSTRAINT `tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `tags_name_unique` UNIQUE(`name`),
	CONSTRAINT `tags_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`email` varchar(191) NOT NULL,
	`password` varchar(191) NOT NULL,
	`role` varchar(20) NOT NULL DEFAULT 'user',
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
