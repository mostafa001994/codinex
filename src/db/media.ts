import { mysqlTable, varchar, int, datetime } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const media = mysqlTable("media", {
  id: varchar("id", { length: 191 }).primaryKey(),
  url: varchar("url", { length: 500 }).notNull(),
  alt: varchar("alt", { length: 500 }).default(""),
  title: varchar("title", { length: 500 }).default(""),
  folder: varchar("folder", { length: 191 }).default(""),
  size: int("size").notNull(),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
});




