import { NextResponse } from "next/server";
import { db } from "@/db";
import { media } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get("folder");

  const files = folder
    ? await db.select().from(media).where(eq(media.folder, folder))
    : await db.select().from(media);

  return NextResponse.json(files);
}