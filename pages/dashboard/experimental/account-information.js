import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Setting4, ArrowLeft, Apple, GooglePlay, EyeSlash, Eye, ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { DeleteAccountModal, DoneModal, ChangeLeverageModal } from "@/modals"
import Link from "next/link"
import { ButtonTheme, CopyToClip, Slider, CardAccountTop } from "@/ui"
import { Input, InputIcon, CustumnCheckbox, SelectWIthHead, CustomnCheckColors } from "@/form"
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Windows } from "public/svg"

export default function AccountInformation() {
  const { t } = useTranslation("dashboard", "auth")
  const [passwordType, setPasswordType] = useState(true)
  const stepsTraining = [
    { title: t("keep_the_trading_account_safety"), slogan: t("please_keep_the_trading_account_and_password_to_prevent_any_manipulation"), icon: <></> },
    { title: `${t("download")} MT5 / MT4`, slogan: t("start_downloading_the_appropriate_meta_trader_platform_for_you_from_the_bottom_section"), icon: <></> },
    { title: t("mister_training"), slogan: t("after_installing_the_meta_trader_and_creating_an_account_the_training_began_immediately"), icon: <></> }
  ]

  const [changeLeverage, setChangeLeverage] = useState(false)
  const [done, setDone] = useState(false)
  const [deleteAccount, setDeleteAccount] = useState(false)
  const onDelete = () => {
    setDeleteAccount(false)
  }
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <div className="p-8 bg-white rounded-lg md:rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mb-8">
            <div className=" icon-container">
              <Setting4 size="25" className="text-primary" />
            </div>
            <h1 className="block text-3xl font-bold text-black">{t("account_settings_information")}</h1>
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
              <Slider item={<CardAccountTop />} />
              <Formik
                validationSchema={() => Yup.object().shape({
                  leverage: Yup.string().required(t('please_choose_the_leverage')),
                  password: Yup.string().required(t("please_write_the_password")).min(8, t("the_password_should_not_be_less_than_eight_letters"))
                    .max(12, t("the_password_should_not_exceed_twelve_letters")).matches(/[a-z]/, t("the_password_must_contain_letters")).matches(/[1-9]/, t("the_password_must_contain_numbers"))

                })}
                initialValues={{ leverage: "100", password: "" }}
                onSubmit={handleSubmit}
              >
                {(props) => (
                  <Form>
                    <SelectWIthHead name="leverage" head={t("leverage")} options="leverage" value={props.values.leverage} />

                    <div className="flex justify-between p-4 mb-4 bg-secondary rounded-xl font-bold">
                      {t("account_number")}
                      <span className="flex items-center gap-2 text-base font-bold text-gray-400 tracking-widest2">
                        <span>1035468</span>
                        <CopyToClip text="1035468" />
                      </span>
                    </div>
                    <div className="flex justify-between p-2  mb-4 bg-secondary rounded-xl font-bold items-center gap-4 rtl:pr-4 ltr:pl-4 ">
                      {t("the_password_of_the_account")}
                      <div className="flex relative grow">
                        <Field type={passwordType ? "password" : "text"} className={`block w-full  p-2 rounded-md bg-white `} name="password" />
                        <span role="button" className="absolute transform top-2 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 rtl:border-r  ltr:border-l rtl:pr-2 ltr:pl-2" onClick={() => setPasswordType(!passwordType)}>
                          {passwordType ? <Eye className="text-primary" /> : <EyeSlash className="text-primary" />}
                        </span>
                      </div>
                    </div>
                    <ErrorMessage name="password" component="span" className="text-danger mb-4 block" />

                    <div className="flex justify-between p-4 mb-4 bg-secondary rounded-xl font-bold">
                      {t("server_name")}
                      <span className="text-base font-bold text-gray-400 ">hululfx9_demo</span>
                      <CopyToClip text="hululfx9_demo" />
                    </div>
                    <CustomnCheckColors name="color" />

                    <ButtonTheme color="primary" type="submit" block disabled={!(props.values.password || props.values.leverage)} className="p-4">{t("saving_changes")}</ButtonTheme>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="col-span-3 p-8 bg-secondary rounded-2xl">
              <h2 className="mb-10 text-3xl font-bold text-black">{t("steps_to_start")}<br />{t("your_trading")}</h2>
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
              <h2 className="my-4 text-3xl font-bold text-black">{t("carrying")} MT4</h2>
              <h4>{t("computers")}</h4>
              <div className="flex justify-between gap-4 mb-4 text-white">
                <a className="rounded-lg w-1/2 flex gap-1 items-center justify-center p-4 bg-[#0067B8]">
                  <Windows />
                  {t("windows")}
                </a>
                <a className="rounded-lg w-1/2 flex gap-1 items-center justify-center p-4 bg-[#07090A]">
                  <Apple className="text-white" />
                  {t("apple")}
                </a>
              </div>
              <h4>{t("smart_phones")}</h4>
              <div className="flex justify-between gap-4 text-white">
                <a className="rounded-lg w-1/2 flex gap-1 items-center justify-center p-4 bg-[#A4C639]">
                  <GooglePlay className="text-white" />
                  {t("android")}
                </a>
                <a className="rounded-lg w-1/2 flex gap-1 items-center justify-center p-4 bg-[#A2AAAD]">
                  {t("iphone")}
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
      <DoneModal open={done} onClose={() => setDone(false)}  message={
      <>
        <p className="mb-4 font-bold text-black">{t("done")}</p>
        <bdi className="mb-4 font-bold text-black">{`${t("successfully_an_amount_has_been_deposited")} ${'$1998'} ${t("from_account")} ${"103568"} ${t("to_account")}`}</bdi>
      </>}/>
      <DeleteAccountModal open={deleteAccount} onClose={() => setDeleteAccount(false)} onDelete={onDelete} />

    </>
  )
}

