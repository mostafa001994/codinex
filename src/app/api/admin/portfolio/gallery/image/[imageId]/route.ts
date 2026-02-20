// import { NextResponse } from "next/server";
// import { db } from "@/db";
// import { portfolioGallery } from "@/db/schema";
// import { eq } from "drizzle-orm";

// export async function DELETE(req: Request, context: any) {
//   const { imageId } = context.params;

//   await db.delete(portfolioGallery).where(eq(portfolioGallery.id, Number(imageId)));

//   return NextResponse.json({ success: true });
// }