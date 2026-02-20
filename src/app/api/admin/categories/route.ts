import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories } from "@/db/schema";

export async function GET() {
  try {
    const data = await db.select().from(categories);
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET CATEGORIES ERROR:", err);
    return NextResponse.json([]);
  }
}


export async function POST(req: Request) {
  const body = await req.json();

  await db.insert(categories).values({
    name: body.name,
    slug: body.slug,
  });

  return NextResponse.json({ success: true });
}


