import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Add, ArrowLeft, Flag, Cup, Crown1 } from 'iconsax-react';
import Link from "next/link"
import { ButtonTheme, RealTypesAccounts } from "@/ui"
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Lock, Eye, EyeSlash } from 'iconsax-react';
import { Input, InputIcon, CustumnCheckbox, SelectWIthHead, CustomnCheckColors } from "@/form"
import { Trider4, Correct } from "public/svg"
import { useRouter } from 'next/router';
import { DepositModal, WarningModal } from "@/modals"
import { allAccountsTypes ,createRealAccount } from "apiHandle"
import useSWR from 'swr'
import Head from 'next/head'

export default function CreateTrading() {
  const router = useRouter;
  const [notCompleteModal, setNotCompleteModal] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)

  const { t } = useTranslation("dashboard")
  const [startDeposit, setStartDeposit] = useState(false)
  const [data, setData] = useState({
    user_id: process.env.userId,
    leverage: "",
    password: "",
    currency:"",
    color: ""
  });
  const [currentStep, setCurrentStep] = useState(0);
  const makeRequest = (formData) => {
    console.log("Form Submitted", formData);
    setLoadingButton(true);
    createRealAccount({
     values : formData,
     success : (response)=>{setLoadingButton(false); router.push(`/dashboard/real/1/account-information`);setStartDeposit(true)},
     error : ()=>setLoadingButton(false),
     })
  };
  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (final) {
      makeRequest(data);
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };
  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };
  const steps = [
    <StepOne next={handleNextStep} data={data} key="1" />,
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} key="2" loadingButton={loadingButton} />
  ];
  return (
    <>
    <Head>
        <title>{t("create_a_real_trading_account")} | {t("common:website_name")} </title>
      </Head>
      <div className="p-8 bg-white dark:bg-dark-white rounded-lg md:rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mb-8 ">
            <div className=" icon-container">
              <Add size="25" className="text-primary-400" />
            </div>
            <h1 className="block text-3xl font-bold text-black dark:text-white">{t("create_a_real_trading_account")}</h1>
          </div>
          {currentStep == 0 ?
            <Link href="/dashboard" >
              <a className="p-2 border border-primary rounded-xl">
                <ArrowLeft size="25" className="text-primary " />
              </a>
            </Link>
            :
            <button onClick={() => setCurrentStep(0)} className="p-2 border border-primary rounded-xl" >
              <ArrowLeft size="25" className="text-primary " />
            </button>
          }
        </div>
        <div className="py-4 ">
          {/* start steps numbers*/}
          <div className={`mb-8 flex justify-center items-center text-center gap-12 text-black dark:text-white relative after:top-[calc(50%-1rem)] after:rtl:right-[calc(50%_+_1rem)] after:ltr:right-[calc(50%_-_1rem)] after:w-[5.5rem] after:transform after:translate-x-1/2 after:-translate-y-1/2  ${currentStep === 0 ? "after:bg-gray-200" : "after:bg-primary"} after:h-1 after:absolute`}>
            <button className={`mb-4 z-2 `} onClick={() => setCurrentStep(0)}>
              <span className={`${currentStep === 0 ? "bg-primary" : "bg-primary-400"} bg-primary rounded-full text-white w-16  h-16 text-3xl font-bold flex justify-center items-center mx-auto`}>
                {currentStep === 0 ? "1" : <Correct />}
              </span>
              {t("basic_information")}
            </button>
            <button className={`mb-4 z-2`} onClick={() => { }}>
              <span className={`${currentStep === 1 ? "bg-primary" : "bg-primary-400"}  rounded-full text-white w-16  h-16 text-3xl font-bold flex justify-center items-center mx-auto`}>2</span>
              {t("the_deposit")}
            </button>
          </div>
          {/* end steps numbers*/}
          {steps[currentStep]}
        </div>
      </div>
      <DepositModal open={startDeposit} onClose={() => setStartDeposit(false)} />
      <WarningModal open={notCompleteModal} size="lg" onClose={() => { }} message={
        <>
          <p className="mb-2 font-bold text-black dark:text-white text-xl">{t("excuse_me_you_cannot_create_a_real_account")}</p>
          <p className="mb-2 font-bold text-black dark:text-white text-xl">{t("you_must_complete_your_profile_information")}</p>
          <ButtonTheme as="link" href="/dashboard/profile/personal/profile-personally" color="primary" className=" px-4 py-2 my-8 block mx-auto w-max">{t("profile")}</ButtonTheme>
        </>
      } />
    </>
  )
}

const StepOne = (props) => {
  const { t, lang } = useTranslation("dashboard")
  const [passwordType, setPasswordType] = useState(true)

  const handleSubmit = (values) => {
    props.next(values);
  };
  const stepOneValidationSchema = Yup.object({
    platform: Yup.number().required(t("please_choose_the_platform_type")).label(),
    currency: Yup.string().required(t("please_choose_the_trading_currency")).label(),
    leverage: Yup.string().required(t("please_choose_the_leverage")).label(),
    password: Yup.string().required(t("please_write_the_password")).min(8, t("the_password_should_not_be_less_than_eight_letters"))
      .max(12, t("the_password_should_not_exceed_twelve_letters")).matches(/[a-z]/, t("the_password_must_contain_letters")).matches(/[1-9]/, t("the_password_must_contain_numbers")).label(),
    color: Yup.string().required(t("please_choose_a_color")).label()
  });
  return (
    <Formik
      validationSchema={stepOneValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {() => (
        <div className="mx-auto  w-[500px] max-w-full">
          <Form>
            <h2 className="mb-2 text-lg text-gray-500">{t("platform")}</h2>
            <div className="flex items-center justify-between  mb-4">
              <CustumnCheckbox name="platform" value="4" text={<div className="flex items-center gap-2"><span className="text-xs grow w-max ">ميتة تريدر4</span><Trider4 /></div>} type="radio" />
              <CustumnCheckbox name="platform" value="5" text={<div className="flex items-center gap-2"><span className="text-xs grow w-max ">ميتة تريدر5</span><Trider4 /></div>} type="radio" />
              <CustumnCheckbox name="platform" value="6" text={<div className="flex items-center gap-2"><span className="text-xs grow w-max ">ميتة تريدر6</span><Trider4 /></div>} type="radio" />
            </div>
            <ErrorMessage name="platform" component="span" className="text-danger" />

            <SelectWIthHead name="currency" head={t("the_trading_currency")} options="currency" />

            <SelectWIthHead name="leverage" head={t("current_leverage")} options="leverage" />

            <InputIcon icon={<Lock className="text-primary" />}>
              <span role="button" className="absolute transform top-4 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 " onClick={() => setPasswordType(!passwordType)}>
                {passwordType ? <Eye className="text-black dark:text-white" /> : <EyeSlash className="text-black dark:text-white" />}
              </span>
              <Input name="password" type={passwordType ? "password" : "text"} placeholder={t('password')} dir={lang === "ar" ? "rtl" : "ltr"} className="password" />
            </InputIcon>

            <CustomnCheckColors name="color" />
            <ButtonTheme type="submit" size="xs" color="primary" block className="px-4 py-2"><span className="flex items-center justify-center gap-2">{t("next")} <ArrowLeft className="text-white" size="15" /></span></ButtonTheme>

          </Form>
        </div>
      )}
    </Formik>
  );
};

const StepTwo = (props) => {
  const { t, lang } = useTranslation("dashboard")
  const { data, error } = useSWR(allAccountsTypes())
  const [accountType, setAccountType] = useState()
  const [change, setChange] = useState(1)

  const plans = [
    { icon: <Flag className="text-white" size="30" />, title: t("essential"), pips: "1.5", lowest: "$100", ea: t("no"), volume: "0.01", islamic: t("yes"), value: "1" },
    { icon: <Cup className="text-white" size="30" />, title: t("classic"), pips: "1.2", lowest: "$100", ea: t("no"), volume: "0.01", islamic: t("yes"), value: "2" },
    { icon: <Crown1 className="text-white" size="30" />, title: t("professionalism"), pips: "0.1", lowest: "$200", ea: t("no"), volume: "0.01", islamic: t("yes"), value: "3" }
  ]
  const handleSubmit = (e) => {
    e.preventDefault();
    props.next({
      account_type : accountType
    }, true);
  };
  return (
    <>
      <div className="mx-auto  w-[900px] max-w-full">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-0 text-lg text-gray-600 ">{t("account_type")}</h2>
          <div className="grid grid-cols-3 gap-8">
            <RealTypesAccounts data={data} error={error} accountType={accountType} setAccountType={setAccountType} change={change} setChange={setChange} />
          </div>
          <div className="mx-auto  w-[500px] max-w-full">
            <ButtonTheme  type="submit" color="primary" block className="px-4 py-2" loading={props.loadingButton} disabled={change === 1} >{t("create_an_account")}</ButtonTheme>
          </div>
        </form>
      </div>


    </>
  );
};


