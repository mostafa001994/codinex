import Image from "next/image";
import Link from "next/link";
import Slider from "@/components/ui/Slider";

import { blogs, portfolio } from "@/db/schema";
import { desc } from "drizzle-orm";
import { db } from "@/db";

export default async function Plans() {


    const posts = await db.select().from(blogs).orderBy(desc(blogs.id)).limit(5);
    const works = await db.select().from(portfolio).orderBy(desc(portfolio.id)).limit(10);



    return (
        <div className="flex min-h-screen items-center justify-center font-sans //dark:bg-black">
            <main className="flex min-h-screen w-full max-w-7xl flex-col items-center justify-between py-10 bg-white ">



                <section className="text-gray-800 text-center flex flex-col gap-5 py-10">
                    <h2 className="text-3xl font-bold">
                        پکیج های اقتصادی ادمینی و مدیریت ماهیانه وبسایت شما

                    </h2>

                    <p>
                        شما میتوانید مدیریت ماهانه وبسایت شامل بارگزاری محتوا و محصولات، امنیت و بروزرسانی، بک آپ گیری و دیگر نیازهای وبسایت خود را به تیم حرفه ای وبیتو بسپارید و بدون نیاز به استخدام حضوری نیروی فنی و ادمین سایت، از هر نیازی از بابت وبسایت خود بی نیاز شوید:
                    </p>
                    <p className="text-gray-500">
                        (این خدمات محدود به مشتریان وبسایت های وبیتو نمیباشد)


                    </p>

                </section>
                <section className="w-full">

                    <div className="grid grid-cols-3 gap-4 items-start justify-between">


                        <div className="flex flex-col gap-4 border rounded-md p-6 border-slate-400">


                            <div className="text-gray-800 flex flex-col gap-4">

                                <div>

                                    <h3 className="text-2xl font-bold">
                                        پایه
                                    </h3>
                                    <p>
                                        مناسب سایت های معرفی ، شرکتی و ...
                                    </p>
                                </div>

                                <div className="">

                                    <h4 className="text-2xl font-bold">
                                        2,500

                                        <span className="text-lg">
                                         ملیون تومان

                                        </span>
                                    </h4>
                                    <span className="text-lg -mt-2">
                                        ماهانه
                                    </span>
                                </div>


                            </div>

                            <ul className="flex flex-col gap-3 text-gray-800 p-3">
                                <li>
                                    تولید و انتشار 2 مقاله در ماه
                                </li>
                                <li>
                                    فشرده سازی تصاویر (با کمترین افت کیفیت) تا 20 عکس
                                </li>
                                <li>
                                    درج یا به روز رسانی 5 محصول با حداکثر 4 عکس برای هر محصول
                                </li>

                                <li>
                                    به روزرسانی افزونه ها و پنل کنترلی

                                </li>
                                <li>
                                    نصب 3 افزونه در ماه درصورت نیاز
                                </li>
                                <li>
                                    پاسخ به دیدگاه کاربران تا 50 پاسخ

                                </li>
                                <li>
                                    مدیریت منابع سروری

                                </li>
                                <li>
                                    آپدیت قیمت ها تا 10 محصول در ماه

                                </li>

                                <li>
                                    حذف و اضافه زیرمنوها

                                </li>
                                <li>
                                    حذف و اضافه دسته بندی ها
                                </li>
                                <li>
                                    حذف و اضافه تگ ها
                                </li>

                                <li>
                                    درج اطلاعات شرکتی و درباره ما برای سایت

                                </li>

                                <li>
                                    درج راه های ارتباطی

                                </li>
                                <li>
                                    لینک کردن شبکه های اجتماعی

                                </li>
                                <li>
                                    تقویم محتوای وبسایت

                                </li>
                                <li>
                                    جلسه آنلاین تا 3 ساعت در ماه

                                </li>
                            </ul>

                            <a href="#" className="p-2 text-center w-full rounded-md hover:bg-green-700 bg-emerald-700">

                                شروع کنید
                            </a>

                        </div>





                        <div className="flex flex-col gap-4 border rounded-md p-6 border-slate-400">


                            <div className="text-gray-800 flex flex-col gap-4">

                                <div>

                                    <h3 className="text-2xl font-bold">
                                        استاندارد
                                    </h3>
                                    <p>
                                       مناسب سایت های فروشگاهی ، خدماتی و ...
                                    </p>
                                </div>

                                <div className="">

                                    <h4 className="text-2xl font-bold">
                                        4,500

                                        <span className="text-lg">
                                        ملیون تومان

                                        </span>
                                    </h4>
                                    <span className="text-lg -mt-2">
                                        ماهانه
                                    </span>
                                </div>


                            </div>

                            <ul className="flex flex-col gap-3 text-gray-800 p-3">
                                <li>
                                    تولید و انتشار 5 مقاله در ماه
                                </li>
                                <li>
                                    فشرده سازی تصاویر (با کمترین افت کیفیت) تا 50 عکس
                                </li>
                                <li>
                                    درج یا به روز رسانی 20 محصول با حداکثر 4 عکس برای هر محصول

                                </li>

                                <li>
                                    به روزرسانی افزونه ها و پنل کنترلی

                                </li>
                                <li>
                                    نصب 10 افزونه در ماه درصورت نیاز

                                </li>
                                <li>
                                    پاسخ به دیدگاه کاربران تا 120 پاسخ


                                </li>
                                <li>
                                    مدیریت منابع سروری

                                </li>
                                <li>
                                    آپدیت قیمت ها تا 40 محصول در ماه

                                </li>

                                <li>
                                    حذف و اضافه زیرمنوها

                                </li>
                                <li>
                                    حذف و اضافه دسته بندی ها
                                </li>
                                <li>
                                    حذف و اضافه تگ ها
                                </li>

                                <li>
                                    درج اطلاعات شرکتی و درباره ما برای سایت

                                </li>

                                <li>
                                    درج راه های ارتباطی

                                </li>
                                <li>
                                    لینک کردن شبکه های اجتماعی

                                </li>
                                <li>
                                    تقویم محتوای وبسایت

                                </li>
                                <li>
                                    آنالیز سایت و افزایش سرعت

                                </li>

                                <li>
                                    بررسی صفحات 404
                                </li>
                                <li>
                                    بررسی Sitemap

                                </li>

                                <li>
                                    بررسی فایل لاگ سرور

                                </li>

                                <li>
                                    بازبینی ، اصلاح و بروزرسانی مطالب قبلی سایت

                                </li>
                                <li>
                                    امنیت وبسایت و انجام تنظیمات فابروال
                                </li>
                                <li>
                                    بررسی Search Console

                                </li>

                                <li>
                                    بررسی Google Analytics

                                </li>
                                <li>
                                    جلسه آنلاین تا 3 ساعت در ماه

                                </li>
                            </ul>

                            <a href="#" className="p-2 text-center w-full rounded-md hover:bg-green-700 bg-emerald-700">

                                شروع کنید
                            </a>

                        </div>


                        <div className="flex flex-col gap-4 border rounded-md p-6 border-slate-400">


                            <div className="text-gray-800 flex flex-col gap-4">

                                <div>

                                    <h3 className="text-2xl font-bold">
                                        پیشرفته
                                    </h3>
                                    <p>
                                       مناسب سایت های فروشگاهی ، خدماتی و ...
                                    </p>
                                </div>

                                <div className="">

                                    <h4 className="text-2xl font-bold">
                                        8,000

                                        <span className="text-lg">
                                            ملیون تومان
                                        </span>
                                    </h4>
                                    <span className="text-lg -mt-2">
                                        ماهانه
                                    </span>
                                </div>


                            </div>

                            <ul className="flex flex-col gap-3 text-gray-800 p-3">
                              <li>تولید و انتشار  12 مقاله در ماه</li>
                              <li>فشرده سازی تصاویر (با کمترین افت کیفیت) تا 120 عکس</li>
                              <li>درج یا به روز رسانی 50 محصول با حداکثر 4 عکس برای هر محصول</li>
                              <li>به روزرسانی افزونه ها و پنل کنترلی</li>
                              <li>نصب 10 افزونه در ماه درصورت نیاز</li>
                              <li>پاسخ به دیدگاه کاربران تا 300 پاسخ</li>
                              <li>مدیریت منابع سروری</li>
                              <li>آپدیت قیمت ها تا 80 محصول در ماه</li>
                              <li>حذف و اضافه زیرمنوها</li>
                              <li>حذف و اضافه دسته بندی ها</li>
                              <li>حذف و اضافه تگ ها</li>
                              <li>درج اطلاعات شرکتی و درباره ما برای سایت</li>
                              <li>درج راه های ارتباطی</li>
                              <li>لینک کردن شبکه های اجتماعی</li>
                              <li>تقویم محتوای وبسایت</li>
                              <li>آنالیز سایت و افزایش سرعت</li>
                              <li>بررسی صفحات 404</li>
                              <li>بررسی Sitemap</li>
                              <li>بررسی فایل لاگ سرور</li>
                              <li>بازبینی ، اصلاح و بروزرسانی مطالب قبلی سایت</li>
                              <li>امنیت وبسایت و انجام تنظیمات فابروال</li>
                              <li>بررسی Search Console</li>
                              <li>بررسی Google Analytics</li>
                              <li>ارائه گزارش هفتگی و ماهانه وضعیت سئو سایت</li>
                              <li>ارائه گزارش هفتگی و ماهانه وضعیت تعداد بازدید و ورودی سایت</li>
                              <li>اضافه کردن 2 صفحه جدید در ماه</li>
                              <li>اضافه کردن لندینگ پیج های تبلیغاتی ، مسابقه ای و رویدادها</li>
                              <li>جلسه آنلاین تا 12 ساعت در ماه</li>
                            </ul>
                            <a href="#" className="p-2 text-center w-full rounded-md hover:bg-green-700 bg-emerald-700">

                                شروع کنید
                            </a>

                        </div>





                    </div>

                </section>




            </main>
        </div>
    );
}
