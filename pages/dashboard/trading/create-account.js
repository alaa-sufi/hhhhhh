import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Add, ArrowLeft, Flag, Cup, Crown1 } from 'iconsax-react';
import Link from "next/link"
import ButtonTheme from "@/ui/ButtonTheme"
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Lock, Eye, EyeSlash } from 'iconsax-react';
import { Input, InputIcon, CustumnCheckbox, SelectWIthHead } from "@/form"
import { Trider4 ,Correct } from "public/svg"
import { useRouter } from 'next/router';
import {DepositModal} from "@/modals"
export default function CreateTrading() {
  const router = useRouter;

  const { t } = useTranslation("dashboard")
  const [startDeposit, setStartDeposit] = useState(false)
  const [data, setData] = useState({
    platform: "",
    trading: "",
    current_leverage: "",
    account_type: "2",
    password: "",
    color: ""
  });
  const [currentStep, setCurrentStep] = useState(0);
  const makeRequest = (formData) => {
    console.log("Form Submitted", formData);
    router.push("/account-information")
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
    <>
    <div className="p-8 bg-white rounded-lg md:rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mb-8 ">
          <div className=" icon-container">
            <Add size="25" className="text-primary-400" />
          </div>
          <h1 className="block text-3xl font-bold text-black">{t("create_a_real_trading_account")}</h1>
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
        <div className={`mb-8 flex justify-center items-center text-center gap-12 text-black relative after:top-[calc(50%-1rem)] after:right-1/2 after:w-[5.5rem] after:transform after:translate-x-1/2 after:-translate-y-1/2  ${currentStep === 0 ? "after:bg-gray-200" : "after:bg-primary"} after:h-1 after:absolute`}>
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
      <button onClick={()=>setStartDeposit(true)}>startDeposit</button>
    </div>
      <DepositModal open={startDeposit} onClose={()=>setStartDeposit(false)}/>
    </>
  )
}

const StepOne = (props) => {
  const { t, lang } = useTranslation()
  const [passwordType, setPasswordType] = useState(true)

  const handleSubmit = (values) => {
    props.next(values);
  };
  const stepOneValidationSchema = Yup.object({
    platform: Yup.number().required(t("please_choose_the_platform_type")).label(),
    trading: Yup.string().required(t("please_choose_the_trading_currency")).label(),
    current_leverage: Yup.string().required(t("please_choose_the_leverage")).label(),
    password: Yup.string().required(t("please_write_the_password")).min(8, t("the_password_should_not_be_less_than_eight_letters"))
          .max(12, t("the_password_should_not_exceed_twelve_letters")).matches(/[a-z]/, t("the_password_must_contain_letters") ).matches(/[1-9]/,t("the_password_must_contain_numbers") ).label(),
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
            <div className="flex items-center justify-between gap-4 mb-4">
              <CustumnCheckbox name="platform" value="4" text={<div className="flex items-center gap-1"><span className="text-xs grow w-max ">ميتة تريدر4</span><Trider4 /></div>} type="radio" />
              <CustumnCheckbox name="platform" value="5" text={<div className="flex items-center gap-1"><span className="text-xs grow w-max ">ميتة تريدر5</span><Trider4 /></div>} type="radio" />
              <CustumnCheckbox name="platform" value="6" text={<div className="flex items-center gap-1"><span className="text-xs grow w-max ">ميتة تريدر6</span><Trider4 /></div>} type="radio" />
            </div>
            <ErrorMessage name="platform" component="span" className="text-danger" />

            <SelectWIthHead name="trading" head={t("the_trading_currency")} options={<option value="usd">دولار امريكي (USD)</option>} />

            <SelectWIthHead name="current_leverage" head={t("current_leverage")} options={<option value="200">1:200</option>} />

            <InputIcon icon={<Lock className="text-primary" />}>
              <span role="button" className="absolute transform top-4 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 " onClick={() => setPasswordType(!passwordType)}>
                {passwordType ? <Eye /> : <EyeSlash />}
              </span>
              <Input name="password" type={passwordType ? "password" : "text"} placeholder={t('password')} dir={lang === "ar" ? "rtl" : "ltr"} />
            </InputIcon>

            <h2 className="mb-2 text-lg text-gray-500">{t("choose_the_account_color")}</h2>
            <div className="grid items-center justify-between grid-cols-6 gap-4 mb-4">
              <CustumnCheckbox name="color" value="#3498DB" color="#3498DB" type="radio" />
              <CustumnCheckbox name="color" value="#8E44AD" color="#8E44AD" type="radio" />
              <CustumnCheckbox name="color" value="#2980B9" color="#2980B9" type="radio" />
              <CustumnCheckbox name="color" value="#2ECC71" color="#2ECC71" type="radio" />
              <CustumnCheckbox name="color" value="#F1C40F" color="#F1C40F" type="radio" />
              <CustumnCheckbox name="color" value="#290009" color="#290009" type="radio" />
            </div>
            <span className="bg-[#3498DB] bg-[#8E44AD] bg-[#2980B9] bg-[#2ECC71] bg-[#F1C40F] bg-[#290009] hidden"></span>
            <ErrorMessage name="color" component="span" className="text-danger" />

            <ButtonTheme type="submit" color="primary" block className="px-4 py-2"><span className="flex items-center justify-center gap-2">{t("next")} <ArrowLeft className="text-white" size="15" /></span></ButtonTheme>

          </Form>
        </div>
      )}
    </Formik>
  );
};

const StepTwo = (props) => {
  const { t, lang } = useTranslation()
  const plans = [
    { icon: <Flag className="text-white" size="30" />, title: t("essential"), pips: "1.5", lowest: "$100", ea: t("no"), volume: "0.01", islamic: t("yes"), value: "1" },
    { icon: <Cup className="text-white" size="30" />, title: t("classic"), pips: "1.2", lowest: "$100", ea: t("no"), volume: "0.01", islamic: t("yes"), value: "2" },
    { icon: <Crown1 className="text-white" size="30" />, title: t("professionalism"), pips: "0.1", lowest: "$200", ea: t("no"), volume: "0.01", islamic: t("yes"), value: "3" }
  ]
  const handleSubmit = (values) => {
    props.next(values, true);
  };

  return (
    <Formik
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <div className="mx-auto  w-[900px] max-w-full">
          <Form>
            <h2 className="mb-0 text-lg text-gray-600 ">{t("account_type")}</h2>
            <div className="grid grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div key={index} className="px-8 py-6 my-4 bg-secondary rounded-xl">
                  <div className="flex gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 p-1 rounded-full bg-primary ">
                      {plan.icon}
                    </div>
                    <h3 className="mt-1 text-3xl text-black">{plan.title}<br /><span className="block text-xs text-center text-gray-400 ">{t("starting_from")}</span></h3>
                  </div>
                  <div className="mb-10 text-center">
                    <bdi><span className="text-3xl font-black text-black">{plan.pips}</span>&nbsp;pips</bdi><br />
                    <span className="text-gray-500">{t("there_is_no_commission")}</span>
                  </div>
                  <ul className="mb-8 rtl:mr-4 ltr:ml-4 ">
                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                      <span>{t("the_lowest_deposit_amount")}</span>
                      <span className="font-bold text-black">{plan.lowest}</span>
                    </li>
                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                      <span>EA</span>
                      <span className="font-bold text-black">{plan.ea}</span>
                    </li>
                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                      <span>{t("less_trading_volume")}</span>
                      <span className="font-bold text-black">{plan.volume}</span>
                    </li>
                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                      <span>{t("islamic_account")}</span>
                      <span className="font-bold text-black">{plan.islamic}</span>
                    </li>

                  </ul>
                  <div className={`relative`}>
                    <Field name="account_type" type="radio" value={plan.value} className="absolute top-0 right-0 w-full h-full opacity-0 peer" />
                    <Correct size="15" className="absolute top-1/2 right-1/2 peer-checked:block hidden transform translate-x-1/2 -translate-y-1/2"/>
                    <div className={`bg-secondary py-3  rounded-xl flex items-center justify-center  border peer-checked:border-2 peer-checked:border-primary text-primary peer-checked:bg-primary  border-primary  `}>
                    {t("choose_the_account")}
                    
                    </div>
                  </div >

                </div>
              ))}

            </div>

            <ErrorMessage name="the_first_deposit_amount" component="span" className="text-danger" />

            <div className="mx-auto  w-[500px] max-w-full">
              <ButtonTheme type="submit" color="primary" block className="px-4 py-2" >{t("create_an_account")}</ButtonTheme>
            </div>

          </Form>
        </div>
      )}
    </Formik>
  );
};


