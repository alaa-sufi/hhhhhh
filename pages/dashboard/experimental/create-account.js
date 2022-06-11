import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Add, ArrowLeft } from 'iconsax-react';
import Link from "next/link"
import ButtonTheme from "@/ui/ButtonTheme"
import { Correct } from "public/svg"
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Lock, Eye, EyeSlash } from 'iconsax-react';
import { Input, InputIcon, CustumnCheckbox, SelectWIthHead, CustomnCheckColors ,CustomnBalance} from "@/form"
import { Trider4 } from "public/svg"
import { useRouter } from 'next/router';
import {createDemoAccount} from "apiHandle"

export default function CreateDemo() {
  const router = useRouter();
  const { t, lang } = useTranslation("dashboard")
  const [loadingButton, setLoadingButton] = useState(false)
  const [data, setData] = useState({
    // platform: "",
    //! change it
    user_id:process.env.userId,
    currency: "USD",
    leverage: "100",
    Balance: "",
    password: "",
    color: ""
  });
  const [currentStep, setCurrentStep] = useState(0);
  const makeRequest = (formData) => {
    
    setLoadingButton(true);
    createDemoAccount({
     values : formData,
     success : ()=>{setLoadingButton(false); router.push("/dashboard/experimental/account-information");},
     error : ()=>setLoadingButton(false),
     })
    
  };
  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (final) {
      makeRequest(newData);
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
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} key="2" loadingButton={loadingButton}/>
  ];
  return (
    <div className="p-8 bg-white rounded-lg md:rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mb-8">
          <div className=" icon-container">
            <Add size="35" className="text-primary-400" />
          </div>
          <h1 className="block text-3xl font-bold text-black ">{t("create_an_experimental_account")}</h1>
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
      <div className="mx-auto py-4 w-[500px] max-w-full">
        {/* start steps numbers*/}
        <div className={`mb-8 flex justify-center items-center text-center gap-12 text-black relative after:top-[calc(50%-1rem)] after:right-[calc(50%_+_1rem)] after:w-[5.5rem] after:transform after:translate-x-1/2 after:-translate-y-1/2  ${currentStep === 0 ? "after:bg-gray-200" : "after:bg-primary"} after:h-1 after:absolute`}>
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
  )
}

const StepOne = (props) => {
  const { t, lang } = useTranslation("dashboard")
  const [passwordType, setPasswordType] = useState(true)

  const handleSubmit = (values) => {
    props.next(values);
  };
  const stepOneValidationSchema = Yup.object({
    // platform: Yup.number().required(t("please_choose_the_platform_type")).label(),
    currency: Yup.string().required(t("please_choose_the_trading_currency")).label(),
    leverage: Yup.string().required(t("please_choose_the_leverage")).label(),
    password: Yup.string().required(t("please_write_the_password")).min(8, t("the_password_should_not_be_less_than_eight_letters")).max(12, t("the_password_should_not_exceed_twelve_letters")).matches(/[a-z]/, t("the_password_must_contain_letters") ).matches(/[1-9]/,t("the_password_must_contain_numbers") )
    .label(),
    color: Yup.string().required(t("please_choose_a_color")).label()
  });
  return (
    <Formik
      validationSchema={stepOneValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <h2 className="mb-2 text-lg text-gray-500">{t("platform")}</h2>
          <div className="flex items-center justify-between gap-4 mb-4">
            <CustumnCheckbox name="platform" value="4" text={<div className="flex items-center gap-1"><span className="text-xs grow w-max ">ميتة تريدر4</span><Trider4 /></div>} type="radio" />
            <CustumnCheckbox name="platform" value="5" text={<div className="flex items-center gap-1"><span className="text-xs grow w-max ">ميتة تريدر5</span><Trider4 /></div>} type="radio" />
            <CustumnCheckbox name="platform" value="6" text={<div className="flex items-center gap-1"><span className="text-xs grow w-max ">ميتة تريدر6</span><Trider4 /></div>} type="radio" />
          </div>
          <ErrorMessage name="platform" component="span" className="text-danger" />
          
          <SelectWIthHead name="currency" head={t("the_trading_currency")} options="currency" value={props.values.currency}/>
          <SelectWIthHead name="leverage" head={t("current_leverage")} options="leverage" value={props.values.leverage}/>

          <InputIcon icon={<Lock className="text-primary" />}>
            <span role="button" className="absolute transform top-4 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 " onClick={() => setPasswordType(!passwordType)}>
              {passwordType ? <Eye /> : <EyeSlash />}
            </span>
            <Input name="password" type={passwordType ? "password" : "text"} placeholder={t('password')} dir={lang === "ar" ? "rtl" : "ltr"} />
          </InputIcon>

          <CustomnCheckColors name="color" />
          <ButtonTheme type="submit" color="primary" block size="xs" className="my-8"><span className="flex items-center justify-center gap-2">{t("next")} <ArrowLeft className="text-white" size="15" /></span></ButtonTheme>

        </Form>
      )}
    </Formik>
  );
};

const StepTwo = (props) => {
  const { t, lang } = useTranslation("dashboard")

  const handleSubmit = (values) => {
    props.next(values, true);
  };
  const stepTwoValidationSchema = Yup.object({
    Balance: Yup.number().min('100',t("the_amount_should_not_be_less_than_100")).max('1000000',t("the_amount_should_not_exceed_1000000")).required(t("please_choose_the_initial_deposit_amount")).label()
  });
  return (
    <Formik
      validationSchema={stepTwoValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <h2 className="mb-2 text-lg text-black">{t("the_first_deposit_amount")} <span className="text-gray-400">{t("usd_usd")}</span></h2>
         <CustomnBalance name="Balance"/>
          <ButtonTheme type="submit" color="primary" block size="xs" className="my-8" loading={props.loadingButton} >{t("create_now")}</ButtonTheme>

        </Form>
      )}
    </Formik>
  );
};


