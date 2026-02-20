"use client";

import React from "react";
import Head from "next/head";

interface SchemaGeneratorProps {
  entity: any; // داده‌های پست یا محصول
  type: "article" | "product" | "portfolio"; // نوع اسکیما
}

export default function SchemaGenerator({ entity, type }: SchemaGeneratorProps) {
  let schemaData: any = {
    "@context": "https://schema.org",
  };

  if (type === "article") {
    schemaData["@type"] = "Article";
    schemaData.headline = entity.seoTitle || entity.title;
    schemaData.description = entity.seoDescription || entity.excerpt;
    schemaData.image = entity.imageUrl;
    schemaData.author = {
      "@type": "Person",
      name: entity.author || "نام نویسنده",
    };
    schemaData.publisher = {
      "@type": "Organization",
      name: "نام سایت",
      logo: {
        "@type": "ImageObject",
        url: "/logo.png",
      },
    };
    schemaData.datePublished = entity.createdAt;
    schemaData.dateModified = entity.updatedAt;
  }

  if (type === "product") {
    schemaData["@type"] = "Product";
    schemaData.name = entity.title;
    schemaData.description = entity.seoDescription || entity.excerpt;
    schemaData.image = entity.imageUrl;
    schemaData.brand = {
      "@type": "Brand",
      name: "نام برند",
    };
    schemaData.offers = {
      "@type": "Offer",
      priceCurrency: "USD",
      price: entity.price || "0",
      availability: "https://schema.org/InStock",
      url: `https://example.com/products/${entity.slug}`,
    };
  }

  if (type === "portfolio") {
    schemaData["@type"] = "CreativeWork";
    schemaData.name = entity.title;
    schemaData.description = entity.seoDescription || entity.excerpt;
    schemaData.image = entity.imageUrl;
    schemaData.url = `https://example.com/portfolio/${entity.slug}`;
  }

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Head>
  );
}


// **usage
// import SchemaGenerator from "@/components/seo/SchemaGenerator";

// export default function PostPage({ post }: { post: any }) {
//   return (
//     <>
//       <SchemaGenerator entity={post} type="article" />
//       <h1>{post.title}</h1>
//       <div dangerouslySetInnerHTML={{ __html: post.content }} />
//     </>
//   );
// }

