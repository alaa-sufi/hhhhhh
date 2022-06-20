import React, { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ProfileContainer } from "@/container"
import { UploadImage, InputIcon, Input, InputCity, InputDate, SelectWIthHead, InputPhone } from "@/form"
import { ButtonTheme, Error, Loading } from "@/ui"
import { Formik } from "formik";
import { Sms, Lock, Eye, EyeSlash, Profile, Star1, Location, Courthouse, MedalStar, Call, Whatsapp, CallAdd } from 'iconsax-react';
import { profilePersonalUserContactInformation, profilePersonalCompanyContactInformation,userPersonalProfile,  companyPersonalProfile  } from "apiHandle"
import useSWR from 'swr'


export default function ContactInformation() {
  const { t, lang } = useTranslation("profile");
  const role = "admin"
  const [loadingButton, setLoadingButton] = useState(false)
  const [change, setChange] = useState(false)
  const onSubmitUser = (values) => {
    setLoadingButton(true);
    profilePersonalUserContactInformation({
      values: values,
      success: () => { setLoadingButton(false); },
      error: () => setLoadingButton(false)
    })
  }
  const onSubmitCompany = (values) => {
    setLoadingButton(true);
    profilePersonalCompanyContactInformation({
      values: values,
      success: () => { setLoadingButton(false); },
      error: () => setLoadingButton(false)
    })
  }
  const { data, error } = useSWR(role === "user" ? userPersonalProfile() : companyPersonalProfile())
  if (error) return <Error />
  if (!data) return <Loading />
  return (
    <ProfileContainer tab={"personal"} >
      <div className="w-[500px] mx-auto">
        <Formik initialValues=
          {role === "user" ?
            data.user_info ?
              { user_id: process.env.userId,  email: data.user_info.email, phone: data.user_info.phone, whatsapp_number: data.user_info.whatsapp_number , second_phone:data.user_info.second_phone } :
              { user_id: process.env.userId, email: "", phone: "", whatsapp_number: "" ,second_phone:"" }
            :
            data.company_info ? 
            { company_id: process.env.company_id,  email: data.company_info.email, phone: data.company_info.phone, whatsapp_number: data.company_info.whatsapp_number , second_phone:data.company_info.second_phone } :
            { company_id: process.env.company_id, email: "", phone: "", whatsapp_number: "" ,second_phone:"" }
          }
          onSubmit={role === "user" ? onSubmitUser : onSubmitCompany} >
          {(props) => {
            props.dirty && setChange(true)
            return (
              <form onSubmit={props.handleSubmit}>
                <InputIcon icon={<Sms className="text-primary" />} className="mb-12 mt-8">
                  <Input name="email" type="email" placeholder={t('email')} />
                </InputIcon>
                <InputIcon icon={<Call className="text-primary" />}>
                  <InputPhone name="phone" type="tel" placeholder={t('phone_number')} defaultValue={props.values.phone} />
                </InputIcon>
                <InputIcon icon={<Whatsapp className="text-primary" />}>
                  <InputPhone name="whatsapp_number" type="tel" placeholder={t('whats_app_number')}  defaultValue={props.values.whatsapp_number}/>
                </InputIcon>
                <InputIcon icon={<CallAdd className="text-primary" />}>
                  <InputPhone name="second_phone" type="tel" placeholder={t('add_another_number')}  defaultValue={props.values.second_phone}/>
                </InputIcon>

                <ButtonTheme color="primary" as="button" type="submit" size="md" block className="my-12 text-center xs:my-4" loading={loadingButton} disabled={!change}>
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
