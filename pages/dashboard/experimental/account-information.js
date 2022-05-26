import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Setting4, ArrowLeft, Apple, GooglePlay, DocumentCopy, EyeSlash, Eye, ArrowLeft2, ArrowRight2 } from 'iconsax-react';
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

export default function AccountInformation() {
  const { t, lang } = useTranslation()
  const [passwordType, setPasswordType] = useState(true)
  const stepsTraining = [
    { title: t("dashboard:keep_the_trading_account_safety"), slogan: t("dashboard:please_keep_the_trading_account_and_password_to_prevent_any_manipulation"), icon: <></> },
    { title: `${t("dashboard:download")} MT5 / MT4`, slogan: t("dashboard:start_downloading_the_appropriate_meta_trader_platform_for_you_from_the_bottom_section"), icon: <></> },
    { title: t("dashboard:mister_training"), slogan: t("dashboard:after_installing_the_meta_trader_and_creating_an_account_the_training_began_immediately"), icon: <></> }
  ]
  const prev = "-right-52 z-1 left-0";
  const next = "-left-52 z-1 right-0";
  const active = "opacity-100 z-2 transform scale-100 ";
  const [changeLeverage, setChangeLeverage] = useState(false)
  const [chooseSlide, setChooseSlide] = useState(1)
  const [done, setDone] = useState(false)
  const [deleteAccount, setDeleteAccount] = useState(false)
  const onDelete = () => {
    setDeleteAccount(false)
  }
  const handleSubmit = (values) => {
    console.log(values);
  };
  const handleCLickSlider = (i) => {
    console.log("i", i)
    setChooseSlide(i)
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
          <div className="grid grid-cols-7 gap-16">
            <div className="col-span-4">
              <div className="mb-6 relative h-52">
                <div className=" h-full absolute left-0 right-0 w-full mx-auto t-0">

                  <div className="relative mx-auto w-[320px] top-1/2 -translate-y-1/2 z-3">
                    <div className={`w-8 h-8 bg-primary rounded-full absolute  cursor-pointer flex items-center justify-center top-1/2 text-white -left-8 z-3 pointer-events-none ${chooseSlide === 0 && "opacity-50"}`} >
                      <ArrowLeft2 />
                    </div>
                    <div className={`w-8 h-8 bg-primary rounded-full absolute cursor-pointer flex items-center justify-center top-1/2 text-white -right-8 z-3 pointer-events-none ${chooseSlide === 3 && "opacity-50"}`} >
                      <ArrowRight2 />
                    </div>
                  </div>
                  {Array.from({ length: Number.parseInt(4) }, (item, i) => (
                    <div className={` ${chooseSlide === i ? active : "opacity-70 transform scale-75  "} ${chooseSlide === i + 1 ? next : chooseSlide === i - 1 ? prev : "left-0 right-0 "} absolute 	 mx-auto h-full w-[320px] transition duration-75	  `} onClick={() => handleCLickSlider(i)} key={i}>
                      <CardAccountTop />
                    </div>
                  ))}
                </div>
                {/* <Swiper
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
                  </Swiper> */}
              </div>
              <Formik
                validationSchema={() => Yup.object().shape({
                  leverage: Yup.string().required(t('auth:please_choose_the_leverage')),
                  password: Yup.string().required(t('auth:please_enter_the_password'))
                })}
                initialValues={{ leverage: "", password: "" }}
                onSubmit={handleSubmit}
              >
                {(props) => (
                  <Form>
                    <SelectWIthHead name="leverage" head={t("dashboard:leverage")} options={<option value="200">1:200</option>} />

                    <div className="flex justify-between p-4 mb-4 bg-secondary rounded-xl font-bold">
                      {t("dashboard:account_number")}
                      <span className="flex items-center gap-2 text-base font-bold text-gray-400 tracking-widest2">
                        <span>1035468</span>
                        <CopyToClip text="1035468" />
                      </span>
                    </div>
                    <div className="flex justify-between p-2  mb-4 bg-secondary rounded-xl font-bold items-center gap-4 rtl:pr-4 ltr:pl-4 ">
                      {t("dashboard:the_password_of_the_account")}
                      <div className="flex relative grow">
                        <Field type={passwordType ? "password" : "text"} className={`block w-full  p-2 rounded-md bg-white `} name="password" />
                        <span role="button" className="absolute transform top-2 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 rtl:border-r  ltr:border-l rtl:pr-2 ltr:pl-2" onClick={() => setPasswordType(!passwordType)}>
                          {passwordType ? <Eye className="text-primary" /> : <EyeSlash className="text-primary" />}
                        </span>
                      </div>
                    </div>
                    <ErrorMessage name="password" component="span" className="text-red-500 mb-4 block" />

                    <div className="flex justify-between p-4 mb-4 bg-secondary rounded-xl font-bold">
                      {t("dashboard:server_name")}
                      <span className="text-base font-bold text-gray-400 ">hululfx9_demo</span>
                      <CopyToClip text="hululfx9_demo" />
                    </div>
                    <h2 className="mb-2 text-lg text-gray-500">{t("dashboard:choose_the_account_color")}</h2>
                    <div className="grid items-center justify-between grid-cols-6 gap-4 mb-4">
                      <CustumnCheckbox name="color" value="#3498DB" color="#3498DB" type="radio" />
                      <CustumnCheckbox name="color" value="#8E44AD" color="#8E44AD" type="radio" />
                      <CustumnCheckbox name="color" value="#2980B9" color="#2980B9" type="radio" />
                      <CustumnCheckbox name="color" value="#2ECC71" color="#2ECC71" type="radio" />
                      <CustumnCheckbox name="color" value="#F1C40F" color="#F1C40F" type="radio" />
                      <CustumnCheckbox name="color" value="#290009" color="#290009" type="radio" />
                    </div>
                    <span className="bg-[#3498DB] bg-[#8E44AD] bg-[#2980B9] bg-[#2ECC71] bg-[#F1C40F] bg-[#290009] hidden"></span>
                    <ErrorMessage name="color" component="span" className="text-red-500" />

                    <ButtonTheme color="primary" type="submit" block disabled={!(props.values.password || props.values.leverage)} className="p-4">{t("dashboard:saving_changes")}</ButtonTheme>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="col-span-3 p-8 bg-secondary rounded-2xl">
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

const CopyToClip = ({ text }) => {
  const { t, lang } = useTranslation()
  return (
    <Whisper
      trigger="click"
      placement="top"
      controlId={`control-id-container`}
      speaker={
        <Tooltip >{t("dashboard:the_copy")}</Tooltip>
      }
    >
      <Button className="p-0">
        <CopyToClipboard text={text}>
          <DocumentCopy className=" text-primary" />
        </CopyToClipboard>
      </Button>
    </Whisper>
  )
}