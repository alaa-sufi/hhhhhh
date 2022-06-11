import React, { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ProfileContainer } from "@/container"
import { UploadImage, InputIcon, Input, InputCity, InputDate, SelectWIthHead, InputPhone } from "@/form"
import { ButtonTheme, Error, Loading } from "@/ui"
import { Formik } from "formik";
import { Sms, Lock1, Eye, EyeSlash, Profile, Star1, Location, Courthouse, MedalStar, Call, Whatsapp, CallAdd } from 'iconsax-react';
import { profilePersonalCompanyContactInformation } from "apiHandle"


export default function SafetyAndPassword() {
  const { t, lang } = useTranslation("profile");
  const [loadingButton, setLoadingButton] = useState(false)
  const [passwordType, setPasswordType] = useState(true)
  const role = "admin"
  const onSubmit = (values) => {
    setLoadingButton(true);
    profilePersonalProfileChangePass({
      values: values,
      success: () => { setLoadingButton(false); },
      error: () => setLoadingButton(false)
    })
  }

  return (
    <ProfileContainer tab={"personal"} >
      <div className="w-[500px] mx-auto">
        <Formik initialValues=
          {
            role === "user" ?
              { user_id: process.env.user_id, current_password: "", new_password: "", new_password_confirmation: "", second_new_password: "" } :
              { user_id: process.env.company_id, current_password: "", new_password: "", new_password_confirmation: "", second_new_password: "" }
          }
          validationSchema={() => Yup.object().shape({
            current_password: Yup.string().required(t('please_enter_the_old_password')),
            new_password: Yup.string().required(t("please_enter_the_new_password")).min(8, t("auth:the_password_should_not_be_less_than_eight_letters"))
        .max(12, t("auth:the_password_should_not_exceed_twelve_letters")).matches(/[a-z]/, t("auth:the_password_must_contain_letters") ).matches(/[1-9]/,t("auth:the_password_must_contain_numbers") ),
    
            new_password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], t('please_repeat_the_password')),
          })}
          onSubmit={onSubmit} >
          {(props) => {
           
            return (
              <form onSubmit={props.handleSubmit}>
                <InputIcon icon={<Lock1 className="text-primary" />} className="mb-12 mt-8">
                  <Input name="password" type={passwordType ? "password" : "text"} placeholder={t('old_password')} dir={lang === "ar" ? "rtl" : "ltr"} />
                </InputIcon>
                <InputIcon icon={<Lock1 className="text-primary" />}>
                  <span role="button" className="absolute transform top-4 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 " onClick={() => setPasswordType(!passwordType)}>
                    {passwordType ? <Eye /> : <EyeSlash />}
                  </span>
                  <Input name="password" type={passwordType ? "password" : "text"} placeholder={t('new_password')} dir={lang === "ar" ? "rtl" : "ltr"} />
                </InputIcon>
                <InputIcon icon={<Lock1 className="text-primary" />}>
                  <Input name="password" type={passwordType ? "password" : "text"} placeholder={t('repeat_the_new_password')} dir={lang === "ar" ? "rtl" : "ltr"} />
                </InputIcon>

                <ButtonTheme color="primary" as="button" type="submit" size="md" bLock1 className="my-12 text-center xs:my-4" loading={loadingButton}  block>
                  {t('save')}
                </ButtonTheme>
              </form>
            )
          }}
        </Formik>
      </div>
    </ProfileContainer>
  )
}
