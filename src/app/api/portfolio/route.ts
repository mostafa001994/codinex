import { NextResponse } from "next/server";
import { db } from "@/db";
import { portfolio } from "@/db/schema";

export async function GET() {
  const items = await db
    .select({
      id: portfolio.id,
      title: portfolio.title,
      slug: portfolio.slug,
      imageUrl: portfolio.imageUrl,
      status: portfolio.status,
      date: portfolio.date,
    })
    .from(portfolio)
    .orderBy(portfolio.date);

  return NextResponse.json(items);
}