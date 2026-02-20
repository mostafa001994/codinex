// فایل: app/types/next-auth.d.ts

import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// تعریف مجدد تایپ Session برای افزودن نقش (role)
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: string; 
    };
  }
}

// تعریف مجدد تایپ JWT برای افزودن نقش (role)
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
  }
}
