import { NextResponse } from "next/server";
import { db } from "@/db";
import { media } from "@/db/media";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { id, alt, title } = await req.json();

  await db
    .update(media)
    .set({ alt, title })
    .where(eq(media.id, id));

  return NextResponse.json({ success: true });
}