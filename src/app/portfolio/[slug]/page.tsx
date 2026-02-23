import { db } from "@/db";
import { portfolio, contentMedia, media, tags, portfolioTags } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import GallerySlider from "@/components/ui/GallerySlider";

import Image from "next/image";

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const decodedSlug = decodeURIComponent(slug);

  const itemList = await db
    .select()
    .from(portfolio)
    .where(eq(portfolio.slug, decodedSlug));

  if (!itemList.length) return <h1>نمونه‌کار پیدا نشد</h1>;

  const item = itemList[0];

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
      and(
        eq(contentMedia.entityType, "portfolio"),
        eq(contentMedia.entityId, item.id)
      )
    );

  return (
    <div className="max-w-7xl mx-auto flex flex-wrap justify-between ">


      <div className="w-7/12">
        <h1 className="text-3xl font-bold text-cyan-900">{item.title}</h1>


        {Array.isArray(item.technologies) && item.technologies.length > 0 && (
          <div className="flex gap-2 mt-6 flex-wrap text-black">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-blue-100 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {item.links && (
          <div className="mt-6 space-y-2">
            {item.links.map((l: any) => (
              <a
                key={l.url}
                href={l.url}
                className="text-blue-600 underline block"
                target="_blank"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}


      </div>
      <div className="w-5/12">




        {gallery.length > 0 && (
          <div>
            <div className="relative overflow-hidden">

              <Image
                className="absolute top-0 right-0 min-h-full "
                src="/laptop.png"
                alt="Next.js logo"
                width={800}
                height={400}
                priority
              />
              <GallerySlider images={gallery} />
            </div>

          </div>
        )}



      </div>


      {/* {item.imageUrl && (
        <img src={item.imageUrl} className="w-full rounded-lg" />
      )} */}

      {item.content && (
        <div
          className="prose prose-lg mt-6 text-gray-800"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      )}





    </div>
  );
}