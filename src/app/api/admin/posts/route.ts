import { NextResponse } from "next/server";
import { db } from "@/db";
import { blogs, categories, tags, blogTags, comments } from "@/db/schema";
import { desc, eq, like, inArray } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const search = searchParams.get("search") || "";

    const offset = (page - 1) * limit;

    const filteredPosts = await db
      .select()
      .from(blogs)
      .where(search ? like(blogs.title, `%${search}%`) : undefined);

    const total = filteredPosts.length;

    const posts = filteredPosts
      .sort((a, b) => b.id - a.id)
      .slice(offset, offset + limit);

    const categoriesList = await db.select().from(categories);
    const tagsList = await db.select().from(tags);
    const blogTagsList = await db.select().from(blogTags);
    const commentsList = await db.select().from(comments);

    const result = posts.map((post) => {
      const category = categoriesList.find((c) => c.id === post.categoryId);

      const tagIds = blogTagsList
        .filter((bt) => bt.blogId === post.id)
        .map((bt) => bt.tagId);

      const postTags = tagsList.filter((t) => tagIds.includes(t.id));

      const commentCount = commentsList.filter(
        (c) => c.blogId === post.id
      ).length;

      return {
        ...post,
        category: category ? { id: category.id, title: category.name } : null,
        tags: postTags.map((t) => ({ id: t.id, title: t.name })),
        commentCount,
      };
    });

    return NextResponse.json({
      posts: result,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("GET POSTS ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
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
      tags: tagNames,
    }: {
      title: string;
      slug: string;
      content: string;
      imageUrl?: string;
      categoryId?: number | null;
      tags: string[];
    } = body;

    // -------------------------
    // ایجاد پست
    // -------------------------
    await db.insert(blogs).values({
      title,
      slug,
      content,
      imageUrl,
      categoryId: categoryId ? Number(categoryId) : null,
    });

    // -------------------------
    // گرفتن ID پست ایجاد شده
    // (روش صحیح در Drizzle MySQL)
    // -------------------------
    const created = await db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, slug))
      .orderBy(desc(blogs.id))
      .limit(1);

    if (!created.length) {
      return NextResponse.json(
        { error: "Post not found after insert" },
        { status: 500 }
      );
    }

    const blogId = created[0].id;

    // -------------------------
    // تگ‌ها
    // -------------------------
    if (tagNames && tagNames.length > 0) {
      const cleanTags = tagNames.map((t) => t.trim()).filter(Boolean);

      // گرفتن تگ‌های موجود
      const existingTags = await db
        .select()
        .from(tags)
        .where(inArray(tags.name, cleanTags));

      const existingMap = new Map(existingTags.map((t) => [t.name, t.id]));

      // تگ‌های جدید
      const newTags = cleanTags.filter((name) => !existingMap.has(name));

      if (newTags.length > 0) {
        await db.insert(tags).values(
          newTags.map((name) => ({
            name,
            slug: name,
          }))
        );
      }

      // گرفتن همه تگ‌ها بعد از درج
      const allTags = await db
        .select()
        .from(tags)
        .where(inArray(tags.name, cleanTags));

      // ساخت ارتباط blogTags
      await db.insert(blogTags).values(
        allTags.map((t) => ({
          blogId,
          tagId: t.id,
        }))
      );
    }

    return NextResponse.json({ success: true, id: blogId });
  } catch (err) {
    console.error("POST ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}