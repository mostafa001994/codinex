import Link from "next/link";

export default function PostCard({ post }: { post: any }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
    >
      {post.imageUrl && (
        <img src={post.imageUrl} className="w-full h-48 object-cover" />
      )}

      <div className="p-4">
        <h3 className="font-bold text-lg">{post.title}</h3>
        <p className="text-gray-600 text-sm mt-2">
          {post.seoDescription?.slice(0, 100)}...
        </p>
      </div>
    </Link>
  );
}