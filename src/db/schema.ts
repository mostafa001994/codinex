import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  timestamp,
  date,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// USERS
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  email: varchar("email", { length: 191 }).notNull().unique(),
  password: varchar("password", { length: 191 }).notNull(),
  role: varchar("role", { length: 20 }).notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

// CATEGORIES
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 191 }).notNull().unique(),
  slug: varchar("slug", { length: 191 }).notNull().unique(),
});

// TAGS
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 191 }).notNull().unique(),
  slug: varchar("slug", { length: 191 }).notNull().unique(),
});

// BLOGS
export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 191 }).notNull(),
  slug: varchar("slug", { length: 191 }).notNull().unique(),
  content: text("content").notNull(),

  imageUrl: varchar("image_url", { length: 500 }),

  seoDescription: text("seoDescription"),

  authorId: integer("author_id"),
  categoryId: integer("category_id"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// BLOG TAGS
export const blogTags = pgTable("blog_tags", {
  id: serial("id").primaryKey(),
  blogId: integer("blog_id").notNull(),
  tagId: integer("tag_id").notNull(),
});

// COMMENTS
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  blogId: integer("blog_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// MEDIA
export const media = pgTable("media", {
  id: varchar("id", { length: 191 }).primaryKey(),
  url: varchar("url", { length: 500 }).notNull(),
  alt: varchar("alt", { length: 500 }).default(""),
  title: varchar("title", { length: 500 }).default(""),
  folder: varchar("folder", { length: 191 }).default(""),
  size: integer("size").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// PORTFOLIO
export const portfolio = pgTable("portfolio", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }),
  slug: varchar("slug", { length: 255 }),
  content: text("content"),
  imageUrl: varchar("imageUrl", { length: 500 }),
  categoryId: integer("categoryId"),
  technologies: jsonb("technologies").$type<string[]>(),
  links: jsonb("links").$type<{ url: string; label: string }[]>(),
  status: varchar("status", { length: 50 }),
  date: date("date"),
  clientName: varchar("clientName", { length: 255 }),
  seoTitle: varchar("seoTitle", { length: 255 }),
  seoDescription: text("seoDescription"),
});

// PORTFOLIO TAGS
export const portfolioTags = pgTable("portfolio_tags", {
  id: serial("id").primaryKey(),
  portfolioId: integer("portfolio_id").notNull(),
  tagId: integer("tag_id").notNull(),
});

// CONTENT MEDIA
export const contentMedia = pgTable("content_media", {
  id: serial("id").primaryKey(),
  entityType: varchar("entity_type", { length: 50 }).notNull(),
  entityId: integer("entity_id").notNull(),
  mediaId: varchar("media_id", { length: 191 }).notNull(),
});

// RELATIONS
export const contentMediaRelations = relations(contentMedia, ({ one }) => ({
  media: one(media, {
    fields: [contentMedia.mediaId],
    references: [media.id],
  }),
}));