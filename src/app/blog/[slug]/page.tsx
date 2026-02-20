import { db } from "@/db";
import { blogs, contentMedia, media, tags, blogTags } from "@/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import Image from "next/image";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
const decodedSlug = decodeURIComponent(slug);

const post = await db.select().from(blogs).where(eq(blogs.slug, decodedSlug));


  if (!post.length) return <h1>پست پیدا نشد</h1>;

  const blog = post[0];


  // تگ‌ها
  const tagLinks = await db
    .select({ tagId: blogTags.tagId })
    .from(blogTags)
    .where(eq(blogTags.blogId, blog.id));

  const tagIds = tagLinks.map((t) => t.tagId);

  const tagList = tagIds.length
    ? await db.select().from(tags).where(inArray(tags.id, tagIds))
    : [];

  // گالری
  const gallery = await db
    .select({
      id: media.id,
      url: media.url,
      alt: media.alt,
      title: media.title,
    })
    .from(contentMedia)
    .innerJoin(media, eq(contentMedia.mediaId, media.id))
    .where(
      and(eq(contentMedia.entityType, "blog"), eq(contentMedia.entityId, blog.id))
    );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 text-gray-900">

      <h1 className="text-3xl font-bold">{blog.title}</h1>

      {blog.imageUrl && (
        <img src={blog.imageUrl} className="w-full rounded-lg" />
      )}

      <div className="prose prose-lg mt-6" dangerouslySetInnerHTML={{ __html: blog.content }} />

      {/* گالری */}
      {gallery.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mt-10 mb-4">گالری تصاویر</h2>
          <div className="grid grid-cols-3 gap-4">
            {gallery.map((img) => (
              <img
                key={img.id}
                src={img.url}
                // alt={img.alt}
                className="rounded-lg object-cover w-full h-40"
              />
            ))}
          </div>
        </div>
      )}

      {/* تگ‌ها */}
      <div className="flex gap-2 mt-8">
        {tagList.map((t) => (
          <span key={t.id} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
            #{t.name}
          </span>
        ))}
      </div>
    </div>
  );
}