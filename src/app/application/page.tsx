import Image from "next/image";
import Link from "next/link";
import Slider from "@/components/ui/Slider";
import ImageSlider from "@/components/ui/MainSlider";


import { blogs, portfolio } from "@/db/schema";
import { desc } from "drizzle-orm";
import { db } from "@/db";

export default async function Application() {


  const posts = await db.select().from(blogs).orderBy(desc(blogs.id)).limit(5);
  const works = await db.select().from(portfolio).orderBy(desc(portfolio.id)).limit(10);



  return (
    <div className="flex min-h-screen items-center justify-center font-sans //dark:bg-black">
      <main className="flex min-h-screen w-full max-w-7xl flex-col items-center justify-between bg-white ">


        <section className="w-full">

          <div className="flex md:flex-row flex-col-reverse gap-4 items-center justify-between">
            <div className="flex md:w-7/12 flex-col gap-10">
              <h3 className=" font-normal text-cyan-700 p-3 rounded-2xl bg-blue-100 w-fit">


                طراحی انواع سایت و اپلیکیشن با پشتیبانی رایگان

              </h3>

              <h2 className="lg:text-4xl md:text-3xl text-3xl font-extrabold text-[#3c416a]">
                سایت حرفه ای
                را خودتان بسازید


              </h2>
              <h1 className="text-2xl text-gray-800">
                با کدینکس به دنیای وب قدم بگذارید!

              </h1>


              <div className="flex items-center gap-4 ">
                <Link href={'edwededewd'} className="bg-blue-500 rounded-full p-2 px-4">
                  نمونه کارها
                </Link>


                <Link href={'edwededewd'} className="bg-green-700 rounded-full p-2 px-4">
                  تعرفه و خدمات
                </Link>
              </div>

            </div>
            <div className="md:w-5/12 w-full">

              <div className="relative bg-cyan-500">


              </div>

              <ImageSlider />

            </div>
          </div>

        </section>


        <section>

          <div className="text-center bg-sky-50 p-10 rounded-4xl">
            <h3 className="mg:text-3xl text-2xl font-bold text-gray-800">
              چطور سایت یا اپلیکیشن سفارش بدم؟
            </h3>
            <p className="text-gray-600 p-4">
              مراحل رو بگذرونید و سایتتون رو بسازید یا با تماس بگیرید تا کارشناسان سایت شمارو راه اندازی کنند.

            </p>

            <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 py-6">


              <div className="flex flex-col gap-3 items-center">
                <span className="text-4xl bg-violet-800 p-3 rounded-2xl">
                  1
                </span>
                <h4 className="text-xl font-bold text-gray-800">
                  طرح سایتتون رو انتخاب کنید
                </h4>
                <p className="text-gray-600">
                  بر اساس حوزه و کاربری مورد نیاز طرح سایت رو انتخاب کنید

                </p>
              </div>


              <div className="flex flex-col gap-3 items-center md:pt-0 pt-10">
                <span className="text-4xl bg-violet-800 p-3 rounded-2xl">
                  2
                </span>
                <h4 className="text-xl font-bold text-gray-800">
                  سایتتون رو بسازید
                </h4>
                <p className="text-gray-600">
                  سفارشتون رو ثبت کنید ، سایتتون ساخته میشه



                </p>
              </div>


              <div className="flex flex-col gap-3 items-center">
                <span className="text-4xl bg-violet-800 p-3 rounded-2xl">
                  3
                </span>
                <h4 className="text-xl font-bold text-gray-800">
                  ارتباط کارشناسان

                </h4>
                <p className="text-gray-600">
                  کارشناسان مستقیم با شما ارتباط میگیرند و دامنه تون رو ثبت می کنند درگاهتون رو متصل می کنند و هر خدماتی لازم داشته باشید براتون انجام میدن

                </p>
              </div>



              <div className="flex flex-col gap-3 items-center md:pt-0 pt-10">
                <span className="text-4xl bg-violet-800 p-3 rounded-2xl">
                  4
                </span>
                <h4 className="text-xl font-bold text-gray-800">
                  شروع ارائه خدمات
                </h4>
                <p className="text-gray-600">
                  حالا میتونید خدمات داخل سایت تون رو ارائه بدید ، محتواتون قرار بدید و در دنیای مجازی بتازید

                </p>
              </div>

            </div>


          </div>

        </section>




        <section className="w-full text-center py-10">
          <h3 className="text-2xl font-bold mb-4 text-blue-950">
            طرح های متنوع سایت
          </h3>

          <p className="text-gray-600 p-3">
            از میان طرح های متنوع وبیتو یک طرح را انتخاب کنید و سایت خود را تحویل بگیرید.


          </p>

          <div className="flex gap-5 underline items-center justify-center p-3">
            <Link href="/" className="text-violet-800">
              مشاهده و انتخاب طرح
            </Link>
            <Link href="#" className="text-violet-800">
              انتخاب حوزه کاری
            </Link>

          </div>

          <Slider className="p-3" items={works} type="portfolio" />
        </section>





        <section className="py-10">

          <h3 className="text-2xl text-center font-bold text-gray-800">
            نوع کسب و کارتون چیه؟
          </h3>
          <p className="text-gray-500 py-4 text-center">
            حوزه کسب و کارتون رو انتخاب کنید تا بهتون پیشنهاد بدیم چه طراحی سایتی مناسب شماست


          </p>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-10">


            <div className="text-center">

              <span className="relative group my-4">

                <Image
                  className="text-center"
                  src="/2-min-3.png"
                  alt="سایت فروشگاهی"
                  width={300}
                  height={300}

                />

                <Link href="#" className="bg-violet-800 rounded-full group-hover:scale-125 p-3 flex items-center absolute -mx-6 right-0 left-0 -bottom-5 w-fit">
                  <svg className="w-5 h-5">
                    <use href="#rocket" />
                  </svg>
                </Link>

              </span>

              <h4 className="text-xl text-gray-800 font-bold pt-6">
                سایت فروشگاهی
              </h4>

              <p className="text-gray-500">
                محصول دارم و میخوام آنلاین شاپ راه اندازی کنم
              </p>

            </div>


            <div className="text-center">

              <span className="relative group my-4">

                <Image
                  className="text-center"
                  src="/1-min.png"
                  alt=" سایت شرکتی"
                  width={300}
                  height={300}

                />

                <Link href="#" className="bg-violet-800 rounded-full group-hover:scale-125 p-3 flex items-center absolute -mx-6 right-0 left-0 -bottom-5 w-fit">
                  <svg className="w-5 h-5">
                    <use href="#rocket" />
                  </svg>
                </Link>

              </span>

              <h4 className="text-xl text-gray-800 font-bold pt-6">
                سایت شرکتی
              </h4>

              <p className="text-gray-500">
               شرکت و کسب و کار دارم که میخوام معرفیشون کنم
              </p>

            </div>



            <div className="text-center">

              <span className="relative group my-4">

                <Image
                  className="text-center"
                  src="/3-min-2.png"
                  alt="سایت آموزشی"
                  width={300}
                  height={300}

                />

                <Link href="#" className="bg-violet-800 rounded-full group-hover:scale-125 p-3 flex items-center absolute -mx-6 right-0 left-0 -bottom-5 w-fit">
                  <svg className="w-5 h-5">
                    <use href="#rocket" />
                  </svg>
                </Link>

              </span>

              <h4 className="text-xl text-gray-800 font-bold pt-6">
                سایت آموزشی
              </h4>

              <p className="text-gray-500">
               میخوام دوره و آموزش داخل سایتم به فروش برسونم


              </p>

            </div>



            <div className="text-center">

              <span className="relative group my-4">

                <Image
                  className="text-center"
                  src="/4-min-1.png"
                  alt="سایت رزرو آنلاین"
                  width={300}
                  height={300}

                />

                <Link href="#" className="bg-violet-800 rounded-full group-hover:scale-125 p-3 flex items-center absolute -mx-6 right-0 left-0 -bottom-5 w-fit">
                  <svg className="w-5 h-5">
                    <use href="#rocket" />
                  </svg>
                </Link>

              </span>

              <h4 className="text-xl text-gray-800 font-bold pt-6">
                سایت رزور آنلاین
              </h4>

              <p className="text-gray-500">
               خدماتی مثل هتل ، پزشکی و اتاق فرار دارم که رزرو میخوان
              </p>

            </div>



          </div>
        </section>



        <section>

          <div className="bg-sky-50 p-10 rounded-4xl text-center ">

            <h3 className="p-4 md:text-4xl text-3xl text-gray-800 font-bold">
              +10 دلیل برای انتخاب کدینکس
            </h3>

            <p className="p-3 text-gray-700">
              بخشی از ویژگی های مهم سایت هایی که کدینکس می سازد

            </p>

            <div className=" grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3  md:gap-8 gap-4 py-5">


              <div className="flex flex-col gap-3 rounded-3xl bg-white items-center p-3">

                <Image
                  className=""
                  src="/icons-joda-joda-09.png"
                  alt=" پشتیبانی فنی دائمی توسط کدینکس"
                  width={50}
                  height={50}
                  priority
                />
                <span className="text-center text-gray-800">
                  پشتیبانی فنی دائمی توسط کدینکس

                </span>
              </div>

              <div className="flex flex-col gap-3 rounded-3xl bg-white items-center p-3">

                <Image
                  className=""
                  src="/icons-joda-joda-11.png"
                  alt=" تحویل سریع و حرفه ای وبسایت"
                  width={30}
                  height={50}
                  priority
                />
                <span className="text-center text-gray-800">
                  تحویل سریع و حرفه ای وبسایت


                </span>
              </div>

              <div className="flex flex-col gap-3 rounded-3xl bg-white items-center p-3">

                <Image
                  className=""
                  src="/icons-joda-joda-05.png"
                  alt="دامنه اختصاصی رایگان"
                  width={50}
                  height={50}
                  priority
                />
                <span className="text-center text-gray-800">
                  دامنه اختصاصی رایگان


                </span>
              </div>

              <div className="flex flex-col gap-3 rounded-3xl bg-white items-center p-3">

                <Image
                  className=""
                  src="/icons-joda-joda-06.png"
                  alt=" بهینه ترین سایت برای گوگل"
                  width={50}
                  height={50}
                  priority
                />
                <span className="text-center text-gray-800">
                  بهینه ترین سایت برای گوگل


                </span>
              </div>

              <div className="flex flex-col gap-3 rounded-3xl bg-white items-center p-3">

                <Image
                  className=""
                  src="/icons-joda-joda-10.png"
                  alt=" قابلیت اتصال به الوپیک و پست ایران"
                  width={50}
                  height={50}
                  priority
                />
                <span className="text-center text-gray-800">
                  قابلیت اتصال به الوپیک و پست ایران

                </span>
              </div>

              <div className="flex flex-col gap-3 rounded-3xl bg-white items-center p-3">

                <Image
                  className=""
                  src="/icons-joda-joda-01.png"
                  alt=" اتصال به انواع درگاه های بانکی"
                  width={50}
                  height={50}
                  priority
                />
                <span className="text-center text-gray-800">
                  اتصال به انواع درگاه های بانکی

                </span>
              </div>

              <div className="flex flex-col gap-3 rounded-3xl bg-white items-center p-3">

                <Image
                  className=""
                  src="/icons-joda-joda-08.png"
                  alt=" ضمانت بازگشت وجه 7 روزه"
                  width={50}
                  height={50}
                  priority
                />
                <span className="text-center text-gray-800">
                  ضمانت بازگشت وجه 7 روزه


                </span>
              </div>

              <div className="flex flex-col gap-3 rounded-3xl bg-white items-center p-3">

                <Image
                  className=""
                  src="/icons-joda-joda-03.png"
                  alt=" سیستم آمار بازدید پیشرفته"
                  width={50}
                  height={50}
                  priority
                />
                <span className="text-center text-gray-800">
                  سیستم آمار بازدید پیشرفته

                </span>
              </div>

              <div className="flex flex-col gap-3 rounded-3xl bg-white items-center p-3">

                <Image
                  className=""
                  src="/icons-joda-joda-07.png"
                  alt=" سرور های قدرتمند SSD"
                  width={50}
                  height={50}
                  priority
                />
                <span className="text-center text-gray-800">
                  سرور های قدرتمند SSD

                </span>
              </div>

              <div className="flex flex-col gap-3 rounded-3xl bg-white items-center p-3">

                <Image
                  className=""
                  src="/icons-joda-joda-02.png"
                  alt=" دریافت درگاه پرداخت فوری"
                  width={50}
                  height={50}
                  priority
                />
                <span className="text-center text-gray-800">
                  دریافت درگاه پرداخت فوری

                </span>
              </div>

              <div className="flex flex-col gap-3 rounded-3xl bg-white items-center p-3">

                <Image
                  className=""
                  src="/d4709a.jpg"
                  alt=" اتصال به ایمالز و ترب"
                  width={50}
                  height={50}
                  priority
                />
                <span className="text-center text-gray-800">
                  اتصال به ایمالز و ترب

                </span>
              </div>

              <div className="flex flex-col gap-3 rounded-3xl bg-white items-center p-3">

                <Image
                  className=""
                  src="/icons-joda-joda-04.png"
                  alt=" امنیت بالای وبسایت شما"
                  width={50}
                  height={50}
                  priority
                />
                <span className="text-center text-gray-800">
                  امنیت بالای وبسایت شما

                </span>
              </div>



            </div>

          </div>
        </section>



        <section>

          <div className="lg:flex justify-between py-14">

            <div className="lg:w-5/12 ">

              <div className="flex flex-col gap-4">
                <h3 className="text-2xl text-gray-800 font-bold">
                  داشتن یک وبسایت حرفه ای به کسب و کار شما اعتبار میدهد
                </h3>
                <p className="text-gray-500">
                  یکی از مولفه های مهم در اعتماد مشتریان و جایگاه و اعتبار یک کسب و کار در سال 2022 داشتن یک وبسایت حرفه ای است که هیچ محدودیتی برای معرفی شما و فروش محصولات شما را ندارد و مدیریت آن آسان است.

                </p>
              </div>


              <div className="website-sequrity w-96 h-96 m-auto my-10 overflow-y-clip bg-white relative shadow-2xl p-4 rounded-2xl flex flex-col gap-4 items-center">

                <Image
                  className="text-center"
                  src="/auth.png"
                  alt=""
                  width={80}
                  height={80}
                  priority
                />
                <Image
                  className="object-cover object-top border border-gray-300 rounded-lg"
                  src="/slider-1-min.png"
                  alt=""
                  width={400}
                  height={300}
                  priority
                />

                <div className="absolute bottom-20 -left-15 shadow-2xl rounded-4xl bg-white p-4 ">
                  <span className="flex gap-2 p-2 items-center">


                    <div className="text-gray-800 cursor-pointer">
                      <span className="text-green-600">https://</span>
                      brandeshoma.ir
                    </div>
                    <span className=" fill-green-50 bg-green-600 p-1.5 rounded-lg">
                      <svg className="w-5 h-5 ">
                        <use href="#lock" />
                      </svg>
                    </span>
                  </span>
                  <p className="text-xs text-green-600 py-1">
                    این وبسایت دارای گواهی معتبر SSL می باشد.


                  </p>
                </div>

              </div>

            </div>

            <div className="lg:w-2/12 w-0 flex justify-center items-center">

              <span className="w-px h-full bg-gray-200"></span>

            </div>

            <div className="lg:w-5/12 ">

              <div className="flex flex-col gap-4">
                <h3 className="text-2xl text-gray-800 font-bold">
                  بهینه سازی و سئوی رایگان وبسایت شما

                </h3>
                <p className="text-gray-500">

                  تمام وبسایت های ساخته شده توسط وبیتو دارای سئوی پیشرفته و بهینه ترین نسخه برای موتورهای جستوگر هستند ، تمام ابزارهای لازم و مشاوره تیم حرفه ای ما برای سئو بصورت رایگان در اختیار شما هستند.
                </p>
              </div>


              <div className="google-webito w-96 h-96 m-auto my-10 bg-white relative shadow-2xl p-4 rounded-2xl flex flex-col gap-4 items-center">

                <Image
                  className="text-center"
                  src="/google.svg"
                  alt=""
                  width={120}
                  height={80}
                  priority
                />

                <div className="flex flex-col gap-3 w-[120%] absolute -right-10 -left-10 bg-white  shadow-2xl p-4 rounded-3xl top-28">
                  <span className="text-blue-600">
                    فروشگاه اینترنتی ساخته شده با کدینکس
                  </span>
                  <span className="text-green-600">
                    https://site.codinex.ir
                  </span>
                  <hr />
                  <p className="text-gray-500">
                    سایتی که شما ساختید می تواند با محتوای مناسب به دلیل ساختار اصولی و سئو شده در رتبه اول گوگل قرار بگیرد


                  </p>

                </div>
                <div className="absolute flex items-center justify-center -bottom-10 left-0 right-0">
                  <span className="flex flex-col gap-2 w-fit items-center shadow-2xl rounded-2xl bg-white p-6 px-8 ">


                    <div className="text-gray-800 cursor-pointer">
                      5 ستاره گوگل باشید

                    </div>
                    <span className=" fill-yellow-500 text-yellow-500 flex gap-2">
                      <svg className="w-5 h-5 ">
                        <use href="#star" />
                      </svg>
                      <svg className="w-5 h-5 ">
                        <use href="#star" />
                      </svg>

                      <svg className="w-5 h-5 ">
                        <use href="#star" />
                      </svg>

                      <svg className="w-5 h-5 ">
                        <use href="#star" />
                      </svg>

                      <svg className="w-5 h-5 ">
                        <use href="#star" />
                      </svg>
                    </span>
                  </span>


                </div>

              </div>

            </div>

          </div>

        </section>


        <section className="w-full">
          <div className="flex items-center justify-between py-4 text-gray-800">
            <h2 className="text-2xl font-bold mb-4">مطالب آموزشی  </h2>
            <Link href={'/blog'}>
            همه مطالب
            </Link>
          </div>
          <Slider items={posts} type="post" />
        </section>






      </main>
    </div>
  );
}
