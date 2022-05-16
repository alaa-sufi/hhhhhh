import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Add, ArrowLeft } from 'iconsax-react';
import Link from "next/link"
import ButtonTheme from "@/ui/ButtonTheme"
import { Correct } from "public/svg"
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Profile, Courthouse, Sms, Lock, Eye, EyeSlash, Flag, Call, Facebook, Google } from 'iconsax-react';
import {Input, InputIcon, CustumnCheckbox} from "@/form"
import {Trider4 } from "public/svg"
export default function CreateDemo() {
  const { t, lang } = useTranslation()
  const [data, setData] = useState({
    platform: "",
    trading: "",
    current_leverage: "",
    the_first_deposit_amount: "",
    password: "",
    color: ""
  });
  const [currentStep, setCurrentStep] = useState(0);
  const makeRequest = (formData) => {
    console.log("Form Submitted", formData);
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
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} key="2" />
  ];
  return (
    <div className="p-8 bg-white rounded-lg md:rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <div className=" icon-container">
            <Add size="25" className="text-primary-400" />
          </div>
          <h1 className="font-bold text-black text-3xl block">{t("dashboard:create_an_experimental_account")}</h1>
        </div>
        <Link href="/dashboard" >
          <a className="border border-primary rounded-xl p-2">
            <ArrowLeft size="25" className="text-primary " />
          </a>
        </Link>
      </div>
      <div className="mx-auto py-4 w-[700px] max-w-full">
        {/* start steps numbers*/}
        <div className={`mb-8 flex justify-center items-center text-center gap-12 text-black relative after:top-[calc(50%-1rem)] after:right-1/2 after:w-[5.5rem] after:transform after:translate-x-1/2 after:-translate-y-1/2  ${currentStep === 0 ? "after:bg-gray-200" : "after:bg-primary"} after:h-1 after:absolute`}>
          <button className={`mb-4 z-2 `} onClick={() => setCurrentStep(0)}>
            <span className={`${currentStep === 0 ? "bg-primary" : "bg-primary-400"} bg-primary rounded-full text-white w-16  h-16 text-3xl font-bold flex justify-center items-center mx-auto`}>
              {currentStep === 0 ? "1" : <Correct />}
            </span>
            {t("dashboard:basic_information")}
          </button>
          <button className={`mb-4 z-2`} onClick={() => { }}>
            <span className={`${currentStep === 1 ? "bg-primary" : "bg-primary-400"}  rounded-full text-white w-16  h-16 text-3xl font-bold flex justify-center items-center mx-auto`}>2</span>
            {t("dashboard:safety_and_appearance")}
          </button>
        </div>
        {/* end steps numbers*/}
        {steps[currentStep]}
      </div>
    </div>
  )
}

const StepOne = (props) => {
  const { t, lang } = useTranslation()

  const handleSubmit = (values) => {
    props.next(values);
  };
  const stepOneValidationSchema = Yup.object({
    platform: Yup.number().required(t("dashboard:please_choose_the_platform_type")).label(),
    trading: Yup.string().required(t("dashboard:please_choose_the_trading_currency")).label(),
    current_leverage: Yup.string().required(t("dashboard:please_choose_the_leverage")).label(),
    the_first_deposit_amount: Yup.string().required(t("dashboard:please_choose_the_initial_deposit_amountit_amount")).label()
  });
  return (
    <Formik
      validationSchema={stepOneValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <h2 className="text-lg text-gray-500  mb-2">{t("dashboard:platform")}</h2>
          <div className="flex justify-between items-center">
            <CustumnCheckbox name="platform" value="4" text={ <><span>ميتة تريدر 4</span>&nbsp;&nbsp;<Trider4/></> } type="radio" />
            <CustumnCheckbox name="platform" value="5" text={ <><span>ميتة تريدر 5</span>&nbsp;&nbsp;<Trider4/></> } type="radio" />
            <CustumnCheckbox name="platform" value="6" text={ <><span>ميتة تريدر 6</span>&nbsp;&nbsp;<Trider4/></> } type="radio" />
          </div>
          <ErrorMessage name="platform" component="span" className="text-red-500" />

          <p>trading</p>
          <Field name="trading" />
          <ErrorMessage name="trading" component="span" className="text-red-500" />

          <p>current_leverage</p>
          <Field name="current_leverage" />
          <ErrorMessage name="current_leverage" component="span" className="text-red-500" />

          <p>the_first_deposit_amount</p>
          <Field name="the_first_deposit_amount" />
          <ErrorMessage name="the_first_deposit_amount" component="span" className="text-red-500" />
          <ButtonTheme type="submit" color="primary" block ><span className="flex gap-2 items-center justify-center">{t("dashboard:next")} <ArrowLeft className="text-white" size="15" /></span></ButtonTheme>
        </Form>
      )}
    </Formik>
  );
};

const StepTwo = (props) => {
  const { t, lang } = useTranslation()
  const [passwordType, setPasswordType] = useState(true)

  const handleSubmit = (values) => {
    props.next(values, true);
  };
  const stepTwoValidationSchema = Yup.object({
    password: Yup.string().required(t("dashboard:please_write_the_password")).label(),
    color: Yup.string().required(t("dashboard:please_choose_a_color")).label()


  });
  return (
    <Formik
      validationSchema={stepTwoValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <InputIcon icon={<Lock className="text-primary" />}>
            <span role="button" className="absolute transform top-4 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 " onClick={() => setPasswordType(!passwordType)}>
              {passwordType ? <Eye /> : <EyeSlash />}
            </span>
            <Input name="password" type={passwordType ? "password" : "text"} placeholder={t('dashboard:password')} />
          </InputIcon>

          <h2 className="text-lg text-gray-500  mb-2">{t("dashboard:choose_the_account_color")}</h2>
          <div className="flex justify-between items-center">
            <CustumnCheckbox name="color" value="#3498DB" color="#3498DB" type="radio" />
            <CustumnCheckbox name="color" value="#8E44AD" color="#8E44AD" type="radio" />
            <CustumnCheckbox name="color" value="#2980B9" color="#2980B9" type="radio" />
            <CustumnCheckbox name="color" value="#2ECC71" color="#2ECC71" type="radio" />
            <CustumnCheckbox name="color" value="#F1C40F" color="#F1C40F" type="radio" />
            <CustumnCheckbox name="color" value="#290009" color="#290009" type="radio" />
          </div>
          <span className="bg-[#3498DB] bg-[#8E44AD] bg-[#2980B9] bg-[#2ECC71] bg-[#F1C40F] bg-[#290009] hidden"></span>
          <ErrorMessage name="color" component="span" className="text-red-500" />

          <ButtonTheme color="primary" onClick={() => props.prev(values)} block >{t("dashboard:back")}</ButtonTheme>
          <ButtonTheme type="submit" color="primary" block >{t("dashboard:create_now")}</ButtonTheme>

        </Form>
      )}
    </Formik>
  );
};


