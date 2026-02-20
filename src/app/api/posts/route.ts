import { NextResponse } from "next/server";
import { db } from "@/db";
import { blogs } from "@/db/schema";

export async function GET() {
  const posts = await db
    .select({
      id: blogs.id,
      title: blogs.title,
      slug: blogs.slug,
      imageUrl: blogs.imageUrl,
      seoDescription: blogs.seoDescription,
      createdAt: blogs.createdAt,
    })
    .from(blogs)
    .orderBy(blogs.createdAt);

  return NextResponse.json(posts);
}