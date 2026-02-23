import {
  pgTable,
  varchar,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const media = pgTable("media", {
  id: varchar("id", { length: 255 }).primaryKey(),
  url: text("url").notNull(),
  size: integer("size").notNull(),
  folder: varchar("folder", { length: 255 }),
  alt: varchar("alt", { length: 255 }),
  title: varchar("title", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});
