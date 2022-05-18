import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Setting4, ArrowLeft, Apple, GooglePlay, DocumentCopy } from 'iconsax-react';
import { Button, Tooltip, Whisper } from 'rsuite';
import ChangeLeverageModal from "@/modals/ChangeLeverageModal"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import DoneModal from "@/modals/DoneModal"
import DeleteAccountModal from "@/modals/DeleteAccountModal"
import Link from "next/link"
import ButtonTheme from "@/ui/ButtonTheme"
import CardAccountTop from "@/ui/CardAccountTop"
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Input, InputIcon, CustumnCheckbox, SelectWIthHead } from "@/form"
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Windows } from "public/svg"
import { EffectCards } from "swiper";

const handleSubmit = (values) => {
  console.log(values);
};
export default function AccountInformation() {
  const { t, lang } = useTranslation()
  const stepsTraining = [
    { title: t("dashboard:keep_the_trading_account_safety"), slogan: t("dashboard:please_keep_the_trading_account_and_password_to_prevent_any_manipulation"), icon: <></> },
    { title: `${t("dashboard:download")} MT5 / MT4`, slogan: t("dashboard:start_downloading_the_appropriate_meta_trader_platform_for_you_from_the_bottom_section"), icon: <></> },
    { title: t("dashboard:mister_training"), slogan: t("dashboard:after_installing_the_meta_trader_and_creating_an_account_the_training_began_immediately"), icon: <></> }
  ]
  const [changeLeverage, setChangeLeverage] = useState(false)
  const [done, setDone] = useState(false)
  const [deleteAccount, setDeleteAccount] = useState(false)
  const onDelete = () => {
    setDeleteAccount(false)
  }
  return (
    <>
      <div className="p-8 bg-white rounded-lg md:rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 ">
            <div className=" icon-container">
              <Setting4 size="25" className="text-primary" />
            </div>
            <h1 className="block text-3xl font-bold text-black">{t("dashboard:account_settings_information")}</h1>
          </div>
          <Link href="/dashboard" >
            <a className="p-2 border border-primary rounded-xl">
              <ArrowLeft size="25" className="text-primary " />
            </a>
          </Link>
        </div>
        <div className="max-w-full py-4 mx-auto">
          <div className="grid grid-cols-5 gap-12">
            <div className="col-span-3">
              <div className="mb-6">
                <Swiper
                  effect={"cards"}
                  grabCursor={true}
                  dir={lang === 'ar' ? "rtl" : "ltr"}
                  slidesPerView={3}
                  loop={true}
                  spaceBetween={30}
                  navigation={true}
                  modules={[Autoplay, Navigation, EffectCards]}
                  className="mySwiper cards"
                >
                  {Array.from({ length: Number.parseInt(4) }, (item, i) => (
                    <SwiperSlide key={i}>
                      <CardAccountTop />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <Formik
                // validationSchema={stepOneValidationSchema}
                initialValues={{}}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form>
                    <SelectWIthHead name="leverage" head={t("dashboard:leverage")} options={<option value="200">1:200</option>} />
                    <div className="flex justify-between p-4 mb-4 bg-secondary rounded-xl">
                      {t("dashboard:account_number")}
                      <span className="flex items-center gap-2 text-base font-bold text-gray-400 tracking-widest2">
                        <span>1035468</span>
                       <CopyToClip text="1035468"/>
                      </span>
                    </div>
                    <div className="flex justify-between p-4 mb-4 bg-secondary rounded-xl">
                      {t("dashboard:server_name")}
                      <span className="flex items-center gap-2 text-base font-bold text-gray-400 ">
                        <span>hululfx9_demo</span>
                       <CopyToClip text="hululfx9_demo"/>
                      </span>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="col-span-2 p-8 bg-secondary rounded-2xl">
              <h2 className="mb-10 text-3xl font-bold text-black">{t("dashboard:steps_to_start")}<br />{t("dashboard:your_trading")}</h2>
              <ul className="border-b ">
                {stepsTraining.map((step, index) => (
                  <li key={index} className="flex items-center gap-2 mb-6">
                    <span className="w-10 h-10 p-4 rounded-full bg-primary">{step.icon}</span>
                    <div>
                      <h6 className="text-lg font-bold text-black">{step.title}</h6>
                      <p className="text-xs text-gray-500">{step.slogan}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <h2 className="my-4 text-3xl font-bold text-black">{t("dashboard:carrying")} MT4</h2>
              <h4>{t("dashboard:computers")}</h4>
              <div className="flex justify-between gap-4 mb-4 text-white">
                <a className="rounded-lg w-1/2 flex gap-1 items-center justify-center p-4 bg-[#0067B8]">
                  <Windows />
                  {t("dashboard:windows")}
                </a>
                <a className="rounded-lg w-1/2 flex gap-1 items-center justify-center p-4 bg-[#07090A]">
                  <Apple className="text-white" />
                  {t("dashboard:apple")}
                </a>
              </div>
              <h4>{t("dashboard:smart_phones")}</h4>
              <div className="flex justify-between gap-4 text-white">
                <a className="rounded-lg w-1/2 flex gap-1 items-center justify-center p-4 bg-[#A4C639]">
                  <GooglePlay className="text-white" />
                  {t("dashboard:android")}
                </a>
                <a className="rounded-lg w-1/2 flex gap-1 items-center justify-center p-4 bg-[#A2AAAD]">
                  {t("dashboard:iphone")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div >
      <button onClick={() => setChangeLeverage(true)}>ChangeLeverageModal</button>{" "}
      <button onClick={() => setDone(true)}>DoneModal</button>{" "}
      <button onClick={() => setDeleteAccount(true)}>DeleteAccountModal</button>{" "}
      <ChangeLeverageModal open={changeLeverage} onClose={() => setChangeLeverage(false)} />
      <DoneModal open={done} onClose={() => setDone(false)} shiny="$1998" account="103568" />
      <DeleteAccountModal open={deleteAccount} onClose={() => setDeleteAccount(false)} onDelete={onDelete} />

    </>
  )
}

const CopyToClip = ({text})=>{
  const { t, lang } = useTranslation()
return(
  <Whisper
  trigger="click"
  placement="top"
  controlId={`control-id-container`}
  speaker={
    <Tooltip >{t("dashboard:the_copy")}</Tooltip>
  }
>
  <Button>
    <CopyToClipboard text={text}>
      <DocumentCopy className=" text-primary" />
    </CopyToClipboard>
  </Button>
</Whisper>
)}