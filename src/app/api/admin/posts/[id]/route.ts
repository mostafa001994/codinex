import { NextResponse } from "next/server";
import { db } from "@/db";
import { blogs, tags, blogTags, contentMedia, media } from "@/db/schema";
import { eq, inArray, and } from "drizzle-orm";

export async function GET(req: Request, context: any) {
  try {
    const { id } = await context.params;
    const blogId = Number(id);

    const post = await db.select().from(blogs).where(eq(blogs.id, blogId));

    if (!post.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const tagLinks = await db
      .select({ tagId: blogTags.tagId })
      .from(blogTags)
      .where(eq(blogTags.blogId, blogId));

    const tagIds = tagLinks.map((t) => t.tagId);

    const tagTitles = tagIds.length
      ? await db.select().from(tags).where(inArray(tags.id, tagIds))
      : [];

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
          eq(contentMedia.entityType, "blog"),
          eq(contentMedia.entityId, blogId)
        )
      );

    return NextResponse.json({
      ...post[0],
      tags: tagTitles.map((t) => t.name),
      gallery,
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function PUT(req: Request, context: any) {
  try {
    const { id } = await context.params;
    const blogId = Number(id);

    const body = await req.json();

    const {
      title,
      slug,
      content,
      imageUrl,
      categoryId,
      tags: tagNames,
      seoDescription,
      gallery,
    } = body;

    await db
      .update(blogs)
      .set({
        title,
        slug,
        content,
        imageUrl,
        categoryId: categoryId ? Number(categoryId) : null,
        seoDescription,
      })
      .where(eq(blogs.id, blogId));

    // پاک کردن گالری قبلی
    await db.delete(contentMedia).where(
      and(
        eq(contentMedia.entityType, "blog"),
        eq(contentMedia.entityId, blogId)
      )
    );

    // ذخیره گالری جدید
    if (gallery && gallery.length > 0) {
      await db.insert(contentMedia).values(
        gallery.map((file: any) => ({
          entityType: "blog",
          entityId: blogId,
          mediaId: file.id,
        }))
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: any
) {
  try {
    const { id } = await context.params;
    const blogId = Number(id);

    if (isNaN(blogId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await db.delete(blogTags).where(eq(blogTags.blogId, blogId));
    await db.delete(blogs).where(eq(blogs.id, blogId));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}