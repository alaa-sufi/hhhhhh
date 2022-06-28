import React, { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ProfileContainer } from "@/container"
import { UploadImage, InputIcon, Input, InputCity, InputDate, SelectWIthHead, InputPhone } from "@/form"
import { ButtonTheme, Error, Loading } from "@/ui"
import {DoneModal } from "@/modals"
import { Formik } from "formik";
import { Sms, Lock1, Eye, EyeSlash, Profile, Star1, Location, Courthouse, MedalStar, Call, Whatsapp, CallAdd } from 'iconsax-react';
import { profilePersonalProfileChangePass } from "apiHandle"
import * as Yup from "yup";
import Link from "next/link"
import Head from 'next/head'


export default function SafetyAndPassword() {
  const { t, lang } = useTranslation("profile");
  const [loadingButton, setLoadingButton] = useState(false)
  const [change, setChange] = useState(false)
  const [openSuccessChange, setOpenSuccessChange] = useState(false)
  const [passwordType, setPasswordType] = useState(true)
  const role = "user"
  const onSubmit = (values) => {
    setLoadingButton(true);
    profilePersonalProfileChangePass({
      values: values,
      success: () => { setLoadingButton(false); },
      error: () => {setLoadingButton(false); setOpenSuccessChange(true)}
    })
  }

  return (
    <>
      <Head>
        <title>{t("safety_and_password")} | {t("common:website_name")}</title>
      </Head>
    <ProfileContainer tab={"personal"} >
      <div className="w-[500px] mx-auto">
        <Formik initialValues=
          {
            role === "user" ?
              { user_id: process.env.userId, current_password: "", new_password: "", new_password_confirmation: "" } :
              { user_id: process.env.company_id, current_password: "", new_password: "", new_password_confirmation: ""}
          }
          validationSchema={() => Yup.object().shape({
            current_password: Yup.string().required(t('please_enter_the_old_password')),
            new_password: Yup.string().required(t("please_enter_the_new_password")).min(8, t("the_password_should_not_be_less_than_eight_letters"))
        .max(12, t("the_password_should_not_exceed_twelve_letters")).matches(/[a-z]/, t("the_password_must_contain_letters") ).matches(/[1-9]/,t("the_password_must_contain_numbers") ),
    
            new_password_confirmation: Yup.string().oneOf([Yup.ref('new_password'), null], t('please_repeat_the_password')),
          })}
          onSubmit={onSubmit} >
          {(props) => {
             props.dirty && setChange(true)
             return (
               <form onSubmit={props.handleSubmit}>
                <InputIcon icon={<Lock1 className="text-primary" />} className=" mt-8">
                  <Input name="current_password" type="password" placeholder={t('old_password')} dir={lang === "ar" ? "rtl" : "ltr"} />
                </InputIcon>
                <Link href="/auth/forget-password">
                <a className="flex flex-row-reverse -mt-2 text-primary mb-4" >{t('i_forgot_the_password')}</a>
              </Link>
                <InputIcon icon={<Lock1 className="text-primary" />}>
                  <span role="button" className="absolute transform top-4 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 " onClick={() => setPasswordType(!passwordType)}>
                    {passwordType ? <Eye className="text-black dark:text-white"/> : <EyeSlash className="text-black dark:text-white"/>}
                  </span>
                  <Input name="new_password" type={passwordType ? "password" : "text"} placeholder={t('new_password')} dir={lang === "ar" ? "rtl" : "ltr"} />
                </InputIcon>
                <InputIcon icon={<Lock1 className="text-primary" />}>
                  <Input name="new_password_confirmation" type="password" placeholder={t('repeat_the_new_password')} dir={lang === "ar" ? "rtl" : "ltr"} />
                </InputIcon>

                <ButtonTheme color="primary" as="button" type="submit" size="md" bLock1 className="my-12 text-center xs:my-4" loading={loadingButton}  block disabled={!change}>
                  {t('save')}
                </ButtonTheme>
              </form>
            )
          }}
        </Formik>
      </div>
    </ProfileContainer>
    <DoneModal  open={openSuccessChange} onClose={()=>setOpenSuccessChange(false)} message={<p className="font-bold">{t("the_password_has_been_successfully_changed")}</p>}/>
    </>
  )
}
