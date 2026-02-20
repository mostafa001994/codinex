import Image from "next/image";
import Link from "next/link";
import Slider from "@/components/ui/Slider";

import { blogs, portfolio } from "@/db/schema";
import { desc } from "drizzle-orm";
import { db } from "@/db";

export default async function Home() {


    const posts = await db.select().from(blogs).orderBy(desc(blogs.id)).limit(5);
    const works = await db.select().from(portfolio).orderBy(desc(portfolio.id)).limit(10);



    return (
        <div className="flex min-h-screen items-center justify-center font-sans //dark:bg-black">
            <main className="flex min-h-screen w-full max-w-7xl flex-col items-center justify-between py-10 bg-white ">


                <section className="w-full">

                    <div className="flex gap-4 items-center justify-between">
                        <div className="flex">


                            <Image
                                className=""
                                src="/poshtibani-min-2.png"
                                alt="تماس با ما"
                                width={550}
                                height={500}
                                priority
                            />

                        </div>
                        <div className="text-gray-900 flex flex-col gap-4">



                            <h3 className="text-4xl">
                                تماس با ما
                            </h3>
                            <p>

                                شما می توانید در تمام روزهای هفته از طریق واتس اپ یا تلگرام و در روزهای کاری از ساعت 9 الی 17 از طریق تلفن با ما در تماس باشید.

                            </p>

                            <p>

                                همچنین در پیشخوان کاربری خود امکان ارسال تیکت بصورت شبانه روزی را دارید.

                            </p>




                            <p>📞
                                شماره تماس 37225792-025
                            </p>
                            <p>📲
                                <a href="#" className="text-green-700">واتس اپ</a> | <a href="#" className="text-blue-600">تلگرام</a>  09388683852
                            </p>


                            <p>📍
                                نشانی: آدرس:قم، بلوار امام رضا ، مجتمع فردوسی، پلاک55 
                            </p>



                        </div>
                    </div>

                </section>




            </main>
        </div>
    );
}
