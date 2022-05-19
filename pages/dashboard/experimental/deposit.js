import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { MoneyRecive, ArrowLeft } from 'iconsax-react';
import Link from "next/link"
import ButtonTheme from "@/ui/ButtonTheme"
import CardAccountTop from "@/ui/CardAccountTop"
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { CustumnCheckbox } from "@/form"
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
const handleSubmit = (values) => {
  console.log(values);
};
export default function Deposit() {
  const { t, lang } = useTranslation()

  return (
    <div className="p-8 bg-white rounded-lg md:rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <div className=" icon-container">
            <MoneyRecive size="25" className="text-primary" />
          </div>
          <h1 className="block text-3xl font-bold text-black">{t("dashboard:deposit")}</h1>
        </div>
        <Link href="/dashboard" >
          <a className="p-2 border border-primary rounded-xl">
            <ArrowLeft size="25" className="text-primary " />
          </a>
        </Link>
      </div>
      <div className="py-4 mx-auto w-[700px] max-w-full ">
        <div className="mb-4 ">
          <h2 className="mb-4 text-lg text-gray-500">{t("dashboard:the_deposit_for_calculating")}&nbsp;&nbsp;<span className="text-red-500 ">({t("dashboard:experimental_account")})</span></h2>
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
        <div className=" w-[500px] max-w-full ml-auto">
          <h2 className="mb-4 text-lg text-gray-500 ">{t("dashboard:fast_deposit")}</h2>
          <Formik
           validationSchema={() => Yup.object().shape({
            fast_deposit: Yup.number().required(t('dashboard:please_choose_a_fast_deposit_value')),
           })}
            initialValues={{fast_deposit:""}}
          onSubmit={handleSubmit}
          >
          {({ values }) => (
            <Form>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <CustumnCheckbox name="fast_deposit" value="1000" type="radio" number />
                <CustumnCheckbox name="fast_deposit" value="3000" type="radio" number />
                <CustumnCheckbox name="fast_deposit" value="5000" type="radio" number />
              </div>
              <ErrorMessage name="fast_deposit" component="span" className="mb-4 text-red-500" />
              <ButtonTheme color="primary" block  className="px-4 py-2">{t("dashboard:deposit_now")}</ButtonTheme>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </div >
  )
}
