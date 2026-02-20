import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { db } from "@/db";
import { media } from "@/db/media";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = Date.now() + "-" + file.name;
  const filePath = path.join(process.cwd(), "public/uploads", fileName);

  await writeFile(filePath, buffer);

  const id = randomUUID();

  await db.insert(media).values({
    id,
    url: "/uploads/" + fileName,
    size: file.size,
    alt: "",
    title: "",
    folder: "",
  });

  return NextResponse.json({ id, url: "/uploads/" + fileName });
}