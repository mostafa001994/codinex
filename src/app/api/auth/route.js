import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb"; // این فایل را در گام بعد می‌سازیم

// مطمئن شوید که این متغیرها در .env.local شما تعریف شده‌اند:
// NEXTAUTH_SECRET=YOUR_SUPER_SECRET_KEY_AT_LEAST_32_CHARS_LONG
// MONGODB_URI="mongodb://localhost:27017/your_database_name" 

const handler = NextAuth({
  // اگر از MongoDBAdapter استفاده می‌کنید، باید این خطوط را اضافه کنید
  adapter: MongoDBAdapter(clientPromise),
  
  providers: [
    // اینجا می توانید providers خود را اضافه کنید، مثلاً Credentials Provider برای ورود با ایمیل/پسورد
    // Credentials({
    //   async authorize(credentials, req) {
    //     // منطق احراز هویت شما اینجا خواهد بود
    //   },
    // }),
  ],
  
  // تنظیمات اضافی سشن و صفحه لاگین
  session: {
    strategy: "jwt", // یا "database"
  },
  pages: {
    signIn: '/login', // اگر صفحه ورود سفارشی دارید
  },
  
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
