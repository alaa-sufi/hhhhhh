import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Wallet3, MoneyRecive, MoneySend, Login, Add, ArrowLeft } from 'iconsax-react';
import Link from "next/link"
import ButtonTheme from "@/ui/ButtonTheme"
import CardAccountTop from "@/ui/CardAccountTop"
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Deposit() {
  const { t, lang } = useTranslation()

  return (
    <div className="p-8 bg-white rounded-lg md:rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <div className=" icon-container">
            <MoneyRecive size="25" className="text-primary" />
          </div>
          <h1 className="font-bold text-black text-3xl block">{t("dashboard:deposit")}</h1>
        </div>
        <Link href="/dashboard" >
          <a className="border border-primary rounded-xl p-2">
            <ArrowLeft size="25" className="text-primary " />
          </a>
        </Link>
      </div>
      <div className="mx-auto py-4 w-[700px] max-w-full">
        <div className="mb-4">
          <h2 className="text-lg text-gray-500  mb-4">{t("dashboard:the_deposit_for_calculating")}&nbsp;&nbsp;<span className="text-red-500 ">({t("dashboard:experimental_account")})</span></h2>
          <Swiper
           
            dir={lang === 'ar' ? "rtl" : "ltr"}
            loop="true"
            slidesPerView={2}
            spaceBetween={30}
            navigation={true}
           
            modules={[Autoplay, Navigation]}
            className="mySwiper deposit-slider"
          >
            {Array.from({ length: Number.parseInt(4) }, (item, i) => (
              <SwiperSlide key={i}>
                <CardAccountTop />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <h2 className="text-lg mb-4 text-gray-500 ">{t("dashboard:fast_deposit")}</h2>
        <div className="w-max">
          <ul className="flex gap-4 mb-8">
            <li><button className="border-2 border-primary px-8 py-1 rounded-lg text-primary text-lg font-bold ">$1,000</button></li>
            <li><button className="border-2 border-primary px-8 py-1 rounded-lg text-primary text-lg font-bold ">$3,000</button></li>
            <li><button className="border-2 border-primary px-8 py-1 rounded-lg text-primary text-lg font-bold ">$5,000</button></li>
          </ul>
          <ButtonTheme color="primary" block>{t("dashboard:deposit_now")}</ButtonTheme>
        </div>
      </div>
    </div>
  )
}
