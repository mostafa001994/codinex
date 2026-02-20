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