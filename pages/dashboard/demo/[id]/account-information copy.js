import React, { useState , useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Setting4, ArrowLeft, Apple, GooglePlay, EyeSlash, Eye, ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { DoneModal, ChangeLeverageModal } from "@/modals"
import Link from "next/link"
import { ButtonTheme, CopyToClip, Slider,Error, Loading , NoData  } from "@/ui"
import { SelectWIthHead, CustomnCheckColors } from "@/form"
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import { Windows } from "public/svg"
import { changeDemoAccountSetting ,userDemoAccountWithoutPagination } from "apiHandle"
import useSWR from 'swr'


import { useRouter } from "next/router"
export default function AccountInformation() {
  const { t } = useTranslation("dashboard", "auth")
  const [passwordType, setPasswordType] = useState(true)
  const stepsTraining = [
    { title: t("keep_the_trading_account_safety"), slogan: t("please_keep_the_trading_account_and_password_to_prevent_any_manipulation"), icon: <></> },
    { title: `${t("download")} MT5 / MT4`, slogan: t("start_downloading_the_appropriate_meta_trader_platform_for_you_from_the_bottom_section"), icon: <></> },
    { title: t("mister_training"), slogan: t("after_installing_the_meta_trader_and_creating_an_account_the_training_began_immediately"), icon: <></> }
  ]

  const router = useRouter();
  console.log(router)
  const [changeLeverage, setChangeLeverage] = useState(false)
  const [done, setDone] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)
  const [change, setChange] = useState(false)
  const [currentAccount , setCurrentAccount] = useState()
  const [currentId , setCurrentId] = useState(router.query.account ?  router.query.account : router.query.id)
  const [allAccounts , setAllAccounts] = useState()
  const { data, error } = useSWR(userDemoAccountWithoutPagination())
  useEffect(()=>{
    if(data){
      setCurrentAccount(data.demo_accounts_Informations.filter((account)=>+account.id === +currentId)[0] || {error:"there is no account"})
      setAllAccounts(data.demo_accounts_Informations)
    }
  },[data])

  if (error) return <Error />
  if (!data ||!currentAccount ) return <Loading />
  if (currentAccount.error === "there is no account" ) return <NoData text={t("sorry_the_account_is_not_present")} />

  const onSubmit = (values) => {
    setLoadingButton(true);
    changeDemoAccountSetting({
      values: values,
      success: () => { 
        setLoadingButton(false);
        // setAllAccounts(allAccounts.map((account)=>account.id === currentId ? {} : ))
       },
      error: () => setLoadingButton(false)
    })
  }
  const handleChooseIndexSlide=(i)=>{
    router.push({
      pathname: router.asPath.split("?")[0],
      query: { account: data.demo_accounts_Informations[i].id },
    })
    setCurrentAccount(data.demo_accounts_Informations[i])
    setCurrentId(data.demo_accounts_Informations[i].id)
  }
  return (
    <>
      <div className="p-8 bg-white dark:bg-dark-white rounded-lg md:rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mb-8">
            <div className=" icon-container">
              <Setting4 size="25" className="text-primary"  />
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
          <div className="grid grid-cols-9 gap-16">
            <div className="col-span-5">
              <Slider   data={allAccounts}  currentAccount={currentAccount} type="demo" chooseSlide={allAccounts.indexOf(currentAccount)} handleChooseIndexSlide={handleChooseIndexSlide}/>
              <Formik
                validationSchema={() => Yup.object().shape({
                  leverage: Yup.string().required(t('please_choose_the_leverage')),
                  color: Yup.string().required(t('please_choose_a_color')),
                  password: Yup.string().required(t("please_write_the_password")).min(8, t("the_password_should_not_be_less_than_eight_letters"))
                    .max(12, t("the_password_should_not_exceed_twelve_letters")).matches(/[a-z]/, t("the_password_must_contain_letters")).matches(/[1-9]/, t("the_password_must_contain_numbers"))

                })}
                enableReinitialize
                initialValues={
                  {
                    user_id: process.env.userId,
                    leverage: currentAccount.leverage,
                    color: currentAccount.color,
                    account_id: currentId,
                    password: currentAccount.password
                  }
                }
                onSubmit={onSubmit}
              >
                {(props) => {
                  props.dirty && setChange(true)
                  return (
                    <form onSubmit={props.handleSubmit}>
                      <SelectWIthHead name="leverage" head={t("leverage")} options="leverage" defaultValue={props.values.leverage} />

                      <div className="flex justify-between p-4 mb-4 bg-secondary dark:bg-dark-secondary  rounded-xl font-bold text-black dark:text-white">
                        {t("account_number")}
                        <span className="flex items-center gap-2 text-base font-bold text-gray-400 tracking-widest2 ">
                          <span>{currentAccount.login}</span>
                          <CopyToClip text={currentAccount.login}/>
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

                      <ButtonTheme loading={loadingButton} color="primary" type="submit" block disabled={!change} className="p-4">{t("saving_changes")}</ButtonTheme>
                    </form>
                  )
                }}
              </Formik>
            </div>
            <div className="col-span-4 p-8 bg-secondary dark:bg-dark-secondary  rounded-2xl">
              <h2 className="mb-10 text-3xl font-bold text-black dark:text-white">{t("steps_to_start")}<br />{t("your_trading")}</h2>
              <ul className="border-b ">
                {stepsTraining.map((step, index) => (
                  <li key={index} className="flex items-center gap-2 mb-6">
                    <span className="w-10 h-10 p-4 rounded-full bg-primary">{step.icon}</span>
                    <div>
                      <h6 className="text-lg font-bold text-black dark:text-white">{step.title}</h6>
                      <p className="text-xs text-gray-500">{step.slogan}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <h2 className="my-4 text-3xl font-bold text-black dark:text-white">{t("carrying")} MT4</h2>
              <h4 className="text-gray-400">{t("computers")}</h4>
              <div className="flex justify-between gap-4 mb-4 text-white">
                <a className="rounded-lg w-1/2 flex gap-2 items-center justify-center p-4 bg-[#0067B8]">
                  <Windows />
                  {t("windows")}
                </a>
                <a className="rounded-lg w-1/2 flex gap-2 items-center justify-center p-4 bg-[#07090A]">
                  <Apple className="text-white" />
                  {t("apple")}
                </a>
              </div>
              <h4 className="text-gray-400">{t("smart_phones")}</h4>
              <div className="flex justify-between gap-4 text-white">
                <a className="rounded-lg w-1/2 flex gap-2 items-center justify-center p-4 bg-[#A4C639]">
                  <GooglePlay className="text-white" />
                  {t("android")}
                </a>
                <a className="rounded-lg w-1/2 flex gap-2 items-center justify-center p-4 bg-[#A2AAAD]">
                  {t("iphone")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div >
      <button onClick={() => setChangeLeverage(true)}>ChangeLeverageModal</button>{" "}
      <button onClick={() => setDone(true)}>DoneModal</button>{" "}
      <ChangeLeverageModal open={changeLeverage} onClose={() => setChangeLeverage(false)} />
      <DoneModal open={done} onClose={() => setDone(false)} message={
        <>
          <p className="mb-4 font-bold text-black dark:text-white">{t("done")}</p>
          <bdi className="mb-4 font-bold text-black dark:text-white">{`${t("successfully_an_amount_has_been_deposited")} ${'$1998'} ${t("from_account")} ${"103568"} ${t("to_account")}`}</bdi>
        </>} />
     

    </>
  )
}
