// src/lib/utils.ts
// export function slugify(text: string): string {
//   return text
//     .toString()
//     .toLowerCase()
//     .replace(/\s+/g, "-")
//     .replace(/[^\w\-]+/g, "")
//     .replace(/\-\-+/g, "-")
//     .replace(/^-+/, "")
//     .replace(/-+$/, "");
// }


export function slugify(text: string) {
  return text
    .toString()
    .normalize("NFD") // تبدیل حروف فارسی/لاتین به حالت پایه
    .replace(/[\u064B-\u065F]/g, "") // حذف حرکات عربی
    .replace(/[^a-zA-Z0-9\u0600-\u06FF]+/g, "_") // تبدیل فاصله و علامت‌ها به -
    .replace(/^-+|-+$/g, "") // حذف - اضافی ابتدا/انتهای متن
    .toLowerCase();
}

