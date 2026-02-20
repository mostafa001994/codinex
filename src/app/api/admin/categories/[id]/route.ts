import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";



export async function GET(req: Request, context: any) {
  const { id } = await context.params;

  const result = await db
    .select()
    .from(categories)
    .where(eq(categories.id, Number(id)));

  if (!result.length) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json(result[0]);
}




export async function DELETE(req: Request, context: any) {
  const { id } = await context.params;

  await db.delete(categories).where(eq(categories.id, id));

  return NextResponse.json({ success: true });
}

export async function PUT(req: Request, context: any) {
  const { id } = await context.params;
  const body = await req.json();

  await db
    .update(categories)
    .set({
      name: body.name,
      slug: body.slug,
      // description: body.description,
      // imageUrl: body.imageUrl,
      // parentId: body.parentId ? Number(body.parentId) : null,
    })
    .where(eq(categories.id, Number(id)));

  return NextResponse.json({ success: true });
}