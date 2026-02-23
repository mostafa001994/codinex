import { NextResponse } from "next/server";
import { db } from "@/db";
import { media } from "@/db/media";
import { sql } from "drizzle-orm";

export async function GET() {
  const result = await db.execute(sql`SELECT DISTINCT folder FROM media`);
  const folders = result.rows.map((r: any) => r.folder).filter(Boolean);

  return NextResponse.json(folders);
}

export async function POST(req: Request) {
  const { name } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "No name" }, { status: 400 });
  }

  await db.insert(media).values({
    id: "folder-" + Date.now(),
    url: "",
    size: 0,
    folder: name,
    alt: "",
    title: "",
  });

  return NextResponse.json({ success: true });
}