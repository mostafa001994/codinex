import { NextResponse } from "next/server";
import { db } from "@/db";
import { tags } from "@/db/schema";

export async function GET() {
  try {
    const data = await db.select().from(tags);
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET TAGS ERROR:", err);
    return NextResponse.json([]);
  }
}