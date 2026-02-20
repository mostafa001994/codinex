// import { NextResponse } from "next/server";
// import { writeFile } from "fs/promises";
// import path from "path";
// import { db } from "@/db";
// import { blogGallery } from "@/db/schema";
// import { eq } from "drizzle-orm";

// export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;
//   const blogId = Number(id);

//   const images = await db
//     .select()
//     .from(blogGallery)
//     .where(eq(blogGallery.blogId, blogId));

//   return NextResponse.json(images);
// }

// export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;
//   const blogId = Number(id);

//   const form = await req.formData();
//   const files = form.getAll("files") as File[];

//   if (!files || files.length === 0) {
//     return NextResponse.json({ uploaded: [] });
//   }

//   const uploaded: any[] = [];

//   for (const file of files) {
//     const bytes = Buffer.from(await file.arrayBuffer());
//     const fileName = `${Date.now()}-${file.name}`;
//     const filePath = path.join(process.cwd(), "public", "uploads", fileName);

//     await writeFile(filePath, bytes);

//     const url = `/uploads/${fileName}`;

//     // INSERT + get ID
//     const inserted = await db
//       .insert(blogGallery)
//       .values({
//         blogId,
//         imageUrl: url,
//       })
//       .$returningId();

//     const newImage = {
//       id: inserted[0].id,
//       blogId,
//       imageUrl: url,
//     };

//     uploaded.push(newImage);
//   }

//   return NextResponse.json({ uploaded });
// }

// export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;
//   const blogId = Number(id);

//   const { searchParams } = new URL(req.url);
//   const imageId = searchParams.get("imageId");

//   if (!imageId) {
//     return NextResponse.json({ error: "imageId required" }, { status: 400 });
//   }

//   await db
//     .delete(blogGallery)
//     .where(eq(blogGallery.id, Number(imageId)));

//   return NextResponse.json({ success: true });
// }