import {
  int,
  mysqlTable,
  varchar,
  text,
  datetime,
  serial,
  json,
  date,
  timestamp,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

//
// USERS
//
export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 191 }).notNull(),
  email: varchar("email", { length: 191 }).notNull().unique(),
  password: varchar("password", { length: 191 }).notNull(),
  role: varchar("role", { length: 20 }).notNull().default("user"),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
});

//
// CATEGORIES
//
export const categories = mysqlTable("categories", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 191 }).notNull().unique(),
  slug: varchar("slug", { length: 191 }).notNull().unique(),
});

//
// TAGS
//
export const tags = mysqlTable("tags", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 191 }).notNull().unique(),
  slug: varchar("slug", { length: 191 }).notNull().unique(),
});

//
// BLOGS
//
export const blogs = mysqlTable("blogs", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 191 }).notNull(),
  slug: varchar("slug", { length: 191 }).notNull().unique(),
  content: text("content").notNull(),

  imageUrl: varchar("image_url", { length: 500 }),

  seoDescription: text("seoDescription"),

  authorId: int("author_id"),
  categoryId: int("category_id"),

  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(
    sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`
  ),
});

//
// BLOG TAGS
//
export const blogTags = mysqlTable("blog_tags", {
  id: int("id").primaryKey().autoincrement(),
  blogId: int("blog_id").notNull(),
  tagId: int("tag_id").notNull(),
});

//
// COMMENTS
//
export const comments = mysqlTable("comments", {
  id: int("id").primaryKey().autoincrement(),
  blogId: int("blog_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

//
// MEDIA (مرکز مدیریت فایل‌ها)
//
export const media = mysqlTable("media", {
  id: varchar("id", { length: 191 }).primaryKey(),
  url: varchar("url", { length: 500 }).notNull(),
  alt: varchar("alt", { length: 500 }).default(""),
  title: varchar("title", { length: 500 }).default(""),
  folder: varchar("folder", { length: 191 }).default(""),
  size: int("size").notNull(),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
});

//
// PORTFOLIO
//
export const portfolio = mysqlTable("portfolio", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }),
  slug: varchar("slug", { length: 255 }),
  content: text("content"),
  imageUrl: varchar("imageUrl", { length: 500 }),
  categoryId: int("categoryId"),
  technologies: json("technologies"),
  links: json("links"),
  status: varchar("status", { length: 50 }),
  date: date("date"),
  clientName: varchar("clientName", { length: 255 }),
  seoTitle: varchar("seoTitle", { length: 255 }),
  seoDescription: text("seoDescription"),
});

//
// PORTFOLIO TAGS
//
export const portfolioTags = mysqlTable("portfolio_tags", {
  id: int("id").primaryKey().autoincrement(),
  portfolioId: int("portfolio_id").notNull(),
  tagId: int("tag_id").notNull(),
});

//
// CONTENT MEDIA (جدول کلی گالری)
//
export const contentMedia = mysqlTable("content_media", {
  id: int("id").primaryKey().autoincrement(),
  entityType: varchar("entity_type", { length: 50 }).notNull(), // "blog" | "portfolio"
  entityId: int("entity_id").notNull(),
  mediaId: varchar("media_id", { length: 191 }).notNull(),
});

//
// RELATIONS
//
export const contentMediaRelations = relations(contentMedia, ({ one }) => ({
  media: one(media, {
    fields: [contentMedia.mediaId],
    references: [media.id],
  }),
}));