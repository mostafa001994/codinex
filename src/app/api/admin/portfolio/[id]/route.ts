import { NextResponse } from "next/server";
import { db } from "@/db";
import {
  portfolio,
  tags,
  portfolioTags,
  contentMedia,
  media,
} from "@/db/schema";
import { eq, and, inArray } from "drizzle-orm";

// =========================
// GET
// =========================
export async function GET(req: Request, context: any) {
  try {
    const { id } = await context.params;
    const portfolioId = Number(id);

    const item = await db
      .select()
      .from(portfolio)
      .where(eq(portfolio.id, portfolioId));

    if (!item.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // تگ‌ها
    const tagLinks = await db
      .select({ tagId: portfolioTags.tagId })
      .from(portfolioTags)
      .where(eq(portfolioTags.portfolioId, portfolioId));

    const tagIds = tagLinks.map((t) => t.tagId);

    const tagTitles = tagIds.length
      ? await db
        .select({ name: tags.name })   // فقط name
        .from(tags)
        .where(inArray(tags.id, tagIds))
      : [];

    // گالری
    const gallery = await db
      .select({
        id: media.id,
        url: media.url,
        alt: media.alt,
        title: media.title,
      })
      .from(contentMedia)
      .innerJoin(media, eq(contentMedia.mediaId, media.id))
      .where(
        and(
          eq(contentMedia.entityType, "portfolio"),
          eq(contentMedia.entityId, portfolioId)
        )
      );

    return NextResponse.json({
      ...item[0],
      tags: tagTitles.map((t) => t.name), // ← دقیقاً مثل بلاگ
      gallery,
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// =========================
// PUT
// =========================
export async function PUT(req: Request, context: any) {
  try {
    const { id } = await context.params;
    const portfolioId = Number(id);

    const body = await req.json();

    const {
      title,
      slug,
      content,
      imageUrl,
      categoryId,
      tags: tagNames, // ← string[]
      technologies,
      links,
      status,
      date,
      clientName,
      seoTitle,
      seoDescription,
      gallery,
    } = body;

    await db
      .update(portfolio)
      .set({
        title,
        slug,
        content,
        imageUrl,
        categoryId: categoryId ? Number(categoryId) : null,
        technologies: technologies ?? [],
        links: links ?? [],
        status,
        date: date
          ? new Date(date).toISOString().split("T")[0]
          : null,
        clientName,
        seoTitle,
        seoDescription,
      })
      .where(eq(portfolio.id, portfolioId));

    // پاک کردن تگ‌های قبلی
    await db
      .delete(portfolioTags)
      .where(eq(portfolioTags.portfolioId, portfolioId));

    // ذخیره تگ‌های جدید
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

    // پاک کردن گالری قبلی
    await db.delete(contentMedia).where(
      and(
        eq(contentMedia.entityType, "portfolio"),
        eq(contentMedia.entityId, portfolioId)
      )
    );

    // ذخیره گالری جدید
    if (gallery && gallery.length > 0) {
      await db.insert(contentMedia).values(
        gallery.map((file: any) => ({
          entityType: "portfolio",
          entityId: portfolioId,
          mediaId: file.id,
        }))
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// =========================
// DELETE
// =========================
export async function DELETE(req: Request, context: any) {
  try {
    const { id } = await context.params;
    const portfolioId = Number(id);

    if (isNaN(portfolioId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await db
      .delete(portfolioTags)
      .where(eq(portfolioTags.portfolioId, portfolioId));

    await db.delete(portfolio).where(eq(portfolio.id, portfolioId));

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}