import { NextResponse } from "next/server";
import { db } from "@/db";
import { like, desc, sql } from "drizzle-orm";


import {
  portfolio,
  tags,
  portfolioTags,
  contentMedia,
} from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const search = searchParams.get("search") || "";

  const offset = (page - 1) * limit;

  // تعداد کل
  const total = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(portfolio)
    .where(search ? like(portfolio.title, `%${search}%`) : undefined);

  const totalCount = total[0].count;
  const pages = Math.ceil(totalCount / limit);

  // داده‌ها
  const items = await db
    .select()
    .from(portfolio)
    .where(search ? like(portfolio.title, `%${search}%`) : undefined)
    .orderBy(desc(portfolio.id))
    .limit(limit)
    .offset(offset);

  return NextResponse.json({
    items,
    page,
    pages,
  });
}





export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      slug,
      content,
      imageUrl,
      categoryId,
      tags: tagNames, // string[]
      technologies,
      links,
      status,
      date,
      clientName,
      seoTitle,
      seoDescription,
      gallery,
    } = body;

    // ایجاد نمونه‌کار
    const inserted = await db
      .insert(portfolio)
      .values({
        title,
        slug,
        content,
        imageUrl,
        categoryId: categoryId ? Number(categoryId) : null,
        technologies: technologies ?? [],
        links: links ?? [],
        status,
        date: date ? new Date(date) : null,
        clientName,
        seoTitle,
        seoDescription,
      })
      .$returningId(); // ← مخصوص MySQL

    const portfolioId = inserted[0].id;

    // -------------------------
    // تگ‌ها (string[])
    // -------------------------
    if (tagNames && tagNames.length > 0) {
      const tagRows = await db
        .select()
        .from(tags)
        .where(inArray(tags.name, tagNames));

      await db.insert(portfolioTags).values(
        tagRows.map((t) => ({
          portfolioId,
          tagId: t.id,
        }))
      );
    }

    // -------------------------
    // گالری
    // -------------------------
    if (gallery && gallery.length > 0) {
      await db.insert(contentMedia).values(
        gallery.map((file: any) => ({
          entityType: "portfolio",
          entityId: portfolioId,
          mediaId: file.id,
        }))
      );
    }

    return NextResponse.json({ success: true, id: portfolioId });
  } catch (err) {
    console.error("PORTFOLIO CREATE ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}