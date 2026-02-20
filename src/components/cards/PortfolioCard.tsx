import Link from "next/link";

export default function PortfolioCard({ item }: { item: any }) {
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
    >
      {item.imageUrl && (
        <img src={item.imageUrl} className="w-full h-48 object-cover" />
      )}

      <div className="p-4">
        <h3 className="font-bold text-lg">{item.title}</h3>
        <p className="text-gray-600 text-sm mt-2">{item.status}</p>
      </div>
    </Link>
  );
}