import React, { useState ,useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Setting4, ArrowLeft, Apple, GooglePlay, EyeSlash, Eye, ArrowLeft2, ArrowRight2, Flag, Cup, Crown1 } from 'iconsax-react';
import { WarningModal, DoneModal, ChangeLeverageModal } from "@/modals"
import Link from "next/link"
import { ButtonTheme, CopyToClip, Slider,Error, Loading , NoData  } from "@/ui"
import { Input, InputIcon, CustumnCheckbox, SelectWIthHead, CustomnCheckColors } from "@/form"
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { changeRealAccountSetting ,userRealAccountWithoutPagination } from "apiHandle"
import useSWR from 'swr'
import Image from "next/image"
import Head from 'next/head'
import { useRouter } from "next/router"

export default function AccountInformation() {
  const { t } = useTranslation("dashboard", "auth")
  const [passwordType, setPasswordType] = useState(true)
  const router = useRouter();
  const [changeLeverage, setChangeLeverage] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)
  const [change, setChange] = useState(false)
  const [currentAccount , setCurrentAccount] = useState()
  const [currentId , setCurrentId] = useState(router.query.account ?  router.query.account : router.query.id)
  const [allAccounts , setAllAccounts] = useState()
  const { data, error } = useSWR(userRealAccountWithoutPagination())
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
    changeRealAccountSetting({
      values: values,
      success: (response) => { 
        setLoadingButton(false);
        setAllAccounts(allAccounts.map((account)=>account.id === currentId ? response.data.accountInfo : account));
        if(values.leverage != currentAccount.leverage){
          setChangeLeverage(true)
        }
       },
      error: () => setLoadingButton(false)
    })
  }
  const handleChooseIndexSlide=(i)=>{
    router.push({
      pathname: router.asPath.split("?")[0],
      query: { account: data.demo_accounts_Informations[i].id },
     
    }, undefined, { scroll: false })
    setCurrentAccount(data.demo_accounts_Informations[i])
    setCurrentId(data.demo_accounts_Informations[i].id)
  }

  return (
    <>
     <Head>
        <title>{t("account_settings_information")} | {t("common:website_name")}</title>
      </Head>
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
            <Slider   data={allAccounts}  currentAccount={currentAccount} type="demo" chooseSlide={allAccounts.indexOf(currentAccount)} handleChooseIndexSlide={handleChooseIndexSlide}/>
              <Formik
                validationSchema={() => Yup.object().shape({
                  leverage: Yup.string().required(t('please_choose_the_leverage')),
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
                      <span className="flex items-center gap-2 text-base font-bold text-gray-400 tracking-widest2">
                        <span>{currentAccount.login}</span>
                        <CopyToClip text={currentAccount.login} />
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

                    <ButtonTheme color="primary" type="submit" block loading={loadingButton} disabled={!change} className="p-4">{t("saving_changes")}</ButtonTheme>
                  </form>
                )}}
              </Formik>
            </div>
            <div className="col-span-3">
              <h2 className="mb-2 text-lg text-gray-500">{t("the_joint_package_in_it")}</h2>
                <div className="px-8 py-6 my-4 bg-secondary dark:bg-dark-secondary  rounded-xl">
                <div className="py-8 flex justify-center gap-2">
                    <div className="flex items-center justify-center w-12 h-12 p-1 rounded-full bg-primary aspect-square">
                        <Image alt={currentAccount.account_name} src={`${process.env.hostImage}/${currentAccount.account_type_image}`} width="30" height="30"  />
                    </div>
                    <h3 className="mt-1 text-3xl text-black dark:text-white capitalize text-center">{currentAccount.account_type_name}<br /><span className="block text-xs text-center text-gray-400 ">{currentAccount.account_type_commission  ==="yes"? t("there_is_a_commission") : t("there_is_no_commission")}</span></h3>
                </div>
               
                  <ul className="mb-12 rtl:mr-4 ltr:ml-4 text-gray-500">
                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                      <span>{t("starting_from")}</span>
                      <span className="font-bold text-black dark:text-white"><bdi><span>{currentAccount.account_type_pips}</span>&nbsp;pips</bdi></span>
                    </li>
                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                      <span>{t("the_lowest_deposit_amount")}</span>
                      <span className="font-bold text-black dark:text-white">{currentAccount.account_type_min_deposit}</span>
                    </li>
                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                      <span>EA</span>
                      <span className="font-bold text-black dark:text-white">{currentAccount.account_type_EA === "yes" ? t("yes") : t("no")}</span>
                    </li>
                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                      <span>{t("less_trading_volume")}</span>
                      <span className="font-bold text-black dark:text-white">{currentAccount.account_type_Min_trading_volume}</span>
                    </li>
                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                      <span>{t("islamic_account")}</span>
                      <span className="font-bold text-black dark:text-white">{currentAccount.account_type_Islamic_account === "yes" ? t("yes") : t("no")}</span>
                    </li>

                  </ul>
                  <div className={`relative`}>
                    <ButtonTheme color="primary" block size="md" as="link" href={`/dashboard/real/${currentAccount.id}/change-type-account`}>
                      {t("change_the_account_type")}
                    </ButtonTheme>
                  </div >

                </div>
            </div>
          </div>
        </div>
      </div >
      <ChangeLeverageModal open={changeLeverage} onClose={() => setChangeLeverage(false)} />

    </>
  )
}

