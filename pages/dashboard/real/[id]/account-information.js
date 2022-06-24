import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Setting4, ArrowLeft, Apple, GooglePlay, EyeSlash, Eye, ArrowLeft2, ArrowRight2, Flag, Cup, Crown1 } from 'iconsax-react';
import { WarningModal, DoneModal, ChangeLeverageModal } from "@/modals"
import Link from "next/link"
import { ButtonTheme, CopyToClip, Slider, CardAccountTop } from "@/ui"
import { Input, InputIcon, CustumnCheckbox, SelectWIthHead, CustomnCheckColors } from "@/form"
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Trider4, Correct } from "public/svg"

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
  const plans = [
    // { icon: <Flag className="text-white" size="30" />, title: t("essential"), pips: "1.5", lowest: "$100", ea: t("no"), volume: "0.01", islamic: t("yes"), value: "1" },
    // { icon: <Cup className="text-white" size="30" />, title: t("classic"), pips: "1.2", lowest: "$100", ea: t("no"), volume: "0.01", islamic: t("yes"), value: "2" },
    { icon: <Crown1 className="text-white" size="30" />, title: t("professionalism"), pips: "0.1", lowest: "$200", ea: t("no"), volume: "0.01", islamic: t("yes"), value: "3" }
  ]
  return (
    <>
      <div className="p-8 bg-white dark:bg-dark-white rounded-lg md:rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mb-8">
            <div className=" icon-container">
              <Setting4 size="25" className="text-primary" />
            </div>
            <h1 className="block text-3xl font-bold text-black dark:text-white">{t("account_settings_information")}</h1>
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

                    <div className="flex justify-between p-4 mb-4 bg-secondary dark:bg-dark-secondary  rounded-xl font-bold text-black dark:text-white">
                      {t("account_number")}
                      <span className="flex items-center gap-2 text-base font-bold text-gray-400 tracking-widest2">
                        <span>1035468</span>
                        <CopyToClip text="1035468" />
                      </span>
                    </div>
                    <div className="flex justify-between p-2  mb-4 bg-secondary dark:bg-dark-secondary  rounded-xl font-bold items-center gap-4 rtl:pr-4 ltr:pl-4 text-black dark:text-white">
                      {t("the_password_of_the_account")}
                      <div className="flex relative grow">
                        <Field type={passwordType ? "password" : "text"} className={`block w-full  p-2 rounded-md bg-white dark:bg-dark-white `} name="password" />
                        <span role="button" className="absolute transform top-2 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 rtl:border-r  ltr:border-l rtl:pr-2 ltr:pl-2" onClick={() => setPasswordType(!passwordType)}>
                          {passwordType ? <Eye className="text-primary" /> : <EyeSlash className="text-primary" />}
                        </span>
                      </div>
                    </div>
                    <ErrorMessage name="password" component="span" className="text-danger mb-4 block" />

                    <div className="flex justify-between p-4 mb-4 bg-secondary dark:bg-dark-secondary  rounded-xl font-bold text-black dark:text-white">
                      {t("server_name")}
                      <span className="text-base font-bold text-gray-400 ">hululfx9_demo</span>
                      <CopyToClip text="hululfx9_demo" />
                    </div>
                    <CustomnCheckColors name="color" />

                    <ButtonTheme color="primary" type="submit" size="md" block disabled={!(props.values.password || props.values.leverage)} className="p-4">{t("saving_changes")}</ButtonTheme>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="col-span-3">
              <h2 className="mb-2 text-lg text-gray-500">{t("the_joint_package_in_it")}</h2>
              {plans.map((plan, index) => (
                <div key={index} className="px-8 py-6 my-4 bg-secondary dark:bg-dark-secondary  rounded-xl">
                  <div className="flex gap-4 mb-10 justify-center">
                    <div className="flex items-center justify-center w-12 h-12 p-1 rounded-full bg-primary ">
                      {plan.icon}
                    </div>
                    <h3 className="mt-1 text-3xl text-black dark:text-white">{plan.title}<br /><span className="block text-xs text-center text-gray-400 ">{t("there_is_no_commission")}</span></h3>
                  </div>
               
                  <ul className="mb-8 rtl:mr-4 ltr:ml-4 text-gray-500">
                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                      <span>{t("starting_from")}</span>
                      <span className="font-bold text-black dark:text-white"><bdi><span>{plan.pips}</span>&nbsp;pips</bdi></span>
                    </li>
                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                      <span>{t("the_lowest_deposit_amount")}</span>
                      <span className="font-bold text-black dark:text-white">{plan.lowest}</span>
                    </li>
                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                      <span>EA</span>
                      <span className="font-bold text-black dark:text-white">{plan.ea}</span>
                    </li>
                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                      <span>{t("less_trading_volume")}</span>
                      <span className="font-bold text-black dark:text-white">{plan.volume}</span>
                    </li>
                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                      <span>{t("islamic_account")}</span>
                      <span className="font-bold text-black dark:text-white">{plan.islamic}</span>
                    </li>

                  </ul>
                  <div className={`relative`}>
                    <ButtonTheme color="primary" block size="md" as="link" href="/dashboard/trading/change-type-account">
                      {t("change_the_account_type")}
                    </ButtonTheme>
                  </div >

                </div>
              ))}
            </div>
          </div>
        </div>
      </div >
      <button onClick={() => setChangeLeverage(true)}>ChangeLeverageModal</button>{" "}
      <button onClick={() => setDone(true)}>DoneModal</button>{" "}
      <button onClick={() => setDeleteAccount(true)}>WarningModal</button>{" "}
      <ChangeLeverageModal open={changeLeverage} onClose={() => setChangeLeverage(false)} />
      <DoneModal open={done} onClose={() => setDone(false)} shiny="$1998" account="103568" />
      <WarningModal open={deleteAccount} size="sm" onClose={() => setDeleteAccount(false)} message={
        <>
         <p className="mb-4 font-bold text-black dark:text-white text-xl">{t("do_you_want_to_delete_the_account")}</p>
        <div className="flex my-8 justify-between p-1 gap-4">
          <ButtonTheme color="primary" onClick={onDelete} className="w-1/2 px-4 py-2">{t("yes_delete_now")}</ButtonTheme>   
          <ButtonTheme color="primary" outline onClick={() => setDeleteAccount(false)}  className="w-1/2 px-4 py-2">{t("no_cancel_the_deletion")}</ButtonTheme>   
        </div>
        </>
      } />

    </>
  )
}

