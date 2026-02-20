import { db } from "@/db";
import { comments } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: any) {
  const { id } = params;
  const body = await req.json();

  const { name, email, message } = body;

  await db.insert(comments).values({
    blogId: Number(id),
    name,
    email,
    message,
  });

  return NextResponse.json({ success: true });
}