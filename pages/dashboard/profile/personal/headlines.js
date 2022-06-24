import React, { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ProfileContainer } from "@/container"
import { UploadImage, InputIcon, Input, InputCity, InputDate, SelectWIthHead } from "@/form"
import { ButtonTheme, Error, Loading } from "@/ui"
import { Formik } from "formik";
import { Sms, Lock, Eye, EyeSlash, Profile, Star1, Location, Courthouse, MedalStar } from 'iconsax-react';
import { profilePersonalProfileUserHeadLines, profilePersonalProfileCompanyHeadLines  } from "apiHandle"
import {useProfilePersonal} from "hooks/use-with-swr"
export default function Headlines() {
  const { t, lang } = useTranslation("profile");
  const role = "user"
  const [loadingButton, setLoadingButton] = useState(false)
  const [change, setChange] = useState(false)
  const onSubmitUser = (values) => {
    setLoadingButton(true);
    profilePersonalProfileUserHeadLines({
      values: values,
      success: () => { setLoadingButton(false); },
      error: () => setLoadingButton(false)
    })
  }
  const onSubmitCompany = (values) => {
    setLoadingButton(true);
    profilePersonalProfileCompanyHeadLines({
      values: values,
      success: () => { setLoadingButton(false); },
      error: () => setLoadingButton(false)
    })
  }

    const { data, error } = useProfilePersonal(role);
  if (error) return <Error />
  if (!data) return <Loading />
  return (
    <ProfileContainer tab={"personal"} >
      <div className="w-[500px] mx-auto">
        <Formik initialValues={
          role === "user" ?
            data.user_info ?
              { user_id: process.env.userId, citizenship: data.user_info.citizenship, city: data.user_info.city, state: data.user_info.state, adders: data.user_info.adders , zip_code: data.user_info.zip_code } :
              { user_id: process.env.userId, citizenship: "", city: "", state: "", adders: "" ,zip_code:"" }
            :
            data.company_info ?
              { company_id: process.env.company_id, citizenship: data.company_info.citizenship, city: data.company_info.city, state: data.company_info.state, adders: data.company_info.adders ,zip_code: data.company_info.zip_code } :
              { company_id: process.env.company_id, citizenship: "", city: "", state: "", adders: "" ,zip_code:""}

        } onSubmit={role === "user" ?onSubmitUser : onSubmitCompany}>
          {(props) => {
            props.dirty && setChange(true)
            return (
              <form onSubmit={props.handleSubmit}>
                <InputIcon icon={<Location className="text-primary"  />} className="mb-12 mt-8">
                  <InputCity name="citizenship" type="text" placeholder={t('residence')} defaultValue={props.values.citizenship} />
                </InputIcon>
                <div className="grid-cols-2 grid gap-4">
                  <Input name="city" type="text" placeholder={t('city')} />
                  <Input name="state" type="text" placeholder={t('neighborhood')} />
                  <Input name="adders" type="text" placeholder={t('street_number')} />
                  <Input name="zip_code" type="text" placeholder={t('postal_code')} />
                </div>
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
