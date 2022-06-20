import React, { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ProfileContainer } from "@/container"
import { UploadImage, InputIcon, Input, InputCity, InputDate, SelectWIthHead } from "@/form"
import { ButtonTheme , Error , Loading} from "@/ui"
import { Formik } from "formik";
import { Sms, Lock, Eye, EyeSlash, Profile, Star1, Location, Courthouse, MedalStar } from 'iconsax-react';
import { profilePersonalProfileUserPersonly, profilePersonalProfileCompanyPersonly,userPersonalProfile,companyPersonalProfile } from "apiHandle"
import useSWR from 'swr'

export default function ProfilePersonly() {
  const { t, lang } = useTranslation("profile");
  const role = "admin"
  const [loadingButton, setLoadingButton] = useState(false)
  const [change, setChange] = useState(false)
  const onSubmitUser = (values) => {
    setLoadingButton(true);
    profilePersonalProfileUserPersonly({
      values: values,
      success: () => { setLoadingButton(false); },
      error: () => setLoadingButton(false)
    })
  }
  const onSubmitCompany = (values) => {
    setLoadingButton(true);
    profilePersonalProfileCompanyPersonly({
      values: values,
      success: () => { setLoadingButton(false); },
      error: () => setLoadingButton(false)
    })
  }
  
  const { data, error } = useSWR(role === "user" ? userPersonalProfile() : companyPersonalProfile())
  if (error) return <Error/>
  if (!data) return <Loading/>
  return (
    <ProfileContainer tab={"personal"} >
      <div className="w-[500px] mx-auto">
        {role === "user" ?
          <Formik initialValues={data.user_info ? { user_id: process.env.userId, user_img: "", full_name: data.user_info.full_name, Birth_date: data.user_info.Birth_date, Birth_location: data.user_info.Birth_location } :
            { user_id: process.env.userId, user_img: "", full_name: "", Birth_date: "", Birth_location: "" }} onSubmit={onSubmitUser} >
            {(props) => {
              props.dirty && setChange(true)
              return (
                <form onSubmit={props.handleSubmit}>
                  <UploadImage name="user_img" defaultImg={data.user_info.user_img} />
                  <InputIcon icon={<Profile className="text-primary" />}>
                    <Input name="full_name" type="text" placeholder={t('full_name')} />
                  </InputIcon>
                  <InputIcon icon={<Star1 className="text-primary" />}>
                    <InputDate name="Birth_date" type="text" placeholder={t('date_of_birth')} defaultValue={data.user_info && new Date(data.user_info.Birth_date)} />
                  </InputIcon>
                  <InputIcon icon={<Location className="text-primary" />}>
                    <InputCity name="Birth_location" type="text" placeholder={t('christmas_state')} defaultValue={props.values.Birth_location} />
                  </InputIcon>
                  <ButtonTheme color="primary" as="button" type="submit" size="md" block className="my-12 text-center xs:my-4" loading={loadingButton} disabled={!change}>
                    {t('save')}
                  </ButtonTheme>
                </form>
              )
            }}
          </Formik>
          :
          <Formik initialValues={data.company_info ? { company_id: process.env.company_id, company_img: "", company_name: data.company_info.company_name, representative_name: data.company_info.representative_name, representative_position: data.company_info.representative_position, Created_date: data.company_info.Created_date } :
            { company_id: process.env.company_id, company_img: "", company_name: "", representative_name: "", representative_position: "", Created_date: "" }} onSubmit={onSubmitCompany}>
            {(props) => {
              props.dirty && setChange(true)
              return (
                <form onSubmit={props.handleSubmit}>
                  <UploadImage name="company_img" defaultImg={data.company_info && data.company_info.company_img} />
                  <InputIcon icon={<Courthouse className="text-primary" />}>
                    <Input name="company_name" type="text" placeholder={t('the_company_name')} />
                  </InputIcon>
                  <InputIcon icon={<Profile className="text-primary" />}>
                    <Input name="representative_name" type="text" placeholder={t('the_name_of_the_company_representative')} />
                  </InputIcon>
                  <SelectWIthHead name="representative_position" head={<MedalStar className="text-primary" />} options="representative_position" defaultValue={props.values.representative_position} />
                  <InputIcon icon={<Location className="text-primary" />}>
                    <InputDate name="Created_date" type="text" placeholder={t('the_date_of_the_establishment_of_the_company')} defaultValue={data.company_info && new Date(data.company_info.Created_date)} />
                  </InputIcon>
                  <ButtonTheme color="primary" as="button" type="submit" size="md" block className="my-12 text-center xs:my-4" loading={loadingButton} disabled={!change}>
                    {t('save')}
                  </ButtonTheme>
                </form>
              )
            }}
          </Formik>
        }
      </div>
    </ProfileContainer>
  )
}
