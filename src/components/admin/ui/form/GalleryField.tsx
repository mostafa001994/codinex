"use client";

interface GalleryFieldProps {
  label: string;
  value: { id: number; imageUrl: string }[];
  onChange: (val: { id: number; imageUrl: string }[]) => void;
  postId?: number;
  // entity: "posts" | "portfolio"; // ← اضافه شد
}

export default function GalleryField({ label, value, onChange, postId }: GalleryFieldProps) {

  const baseUrl = `/api/admin/gallery/${postId}`;

  async function uploadImages(e: React.ChangeEvent<HTMLInputElement>) {
    if (!postId) {
      alert("برای افزودن گالری، ابتدا آیتم را ذخیره کنید.");
      return;
    }

    const files = e.target.files;
    if (!files || files.length === 0) return;

    const form = new FormData();
    for (let i = 0; i < files.length; i++) {
      form.append("files", files[i]);
    }

    const res = await fetch(baseUrl, {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      console.error("Gallery upload failed:", await res.text());
      return;
    }

    const data: { uploaded: { id: number; imageUrl: string }[] } = await res.json();

    onChange([...value, ...data.uploaded]);
  }

  async function removeImage(id: number) {
    if (!postId) return;

    await fetch(`${baseUrl}?imageId=${id}`, {
      method: "DELETE",
    });

    onChange(value.filter((img) => img.id !== id));
  }

  return (
    <div>
      <label className="block mb-1">{label}</label>

      <input
        type="file"
        multiple
        onChange={uploadImages}
        disabled={!postId}
      />

      {!postId && (
        <p className="text-xs text-gray-500 mt-1">
          برای افزودن گالری، ابتدا آیتم را ذخیره کنید.
        </p>
      )}

      <div className="flex gap-3 mt-3 flex-wrap">
        {value.map((img) => (
          <div key={img.id} className="relative">
            ییی<img
              src={img.imageUrl}
              className="w-24 h-24 object-cover border rounded"
            />

            <button
              type="button"
              onClick={() => removeImage(img.id)}
              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded"
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}