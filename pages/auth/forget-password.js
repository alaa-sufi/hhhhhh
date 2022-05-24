import { useState } from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon, InputCity, InputPhone } from "@/form"
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse, Sms, Lock, Eye, EyeSlash, Flag, Call, ArrowLeft, ArrowRight } from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/router'
import {forgetPasswordByEmail ,forgetPasswordByPhone} from "apiHandle"

export default function ForgetPassword() {
  const { t, lang } = useTranslation()
  const [isEmail, setIsEmail] = useState(true)
  const [loadingButton, setLoadingButton] = useState(false)

  const router = useRouter()
  const onSubmit = (values) => {
    setLoadingButton(true);
    if(isEmail){
      forgetPasswordByEmail({
        values : values,
        success : ()=>{setLoadingButton(false);router.push(`/auth/enter-email-code?email=${values.email}`)},
        error : ()=>setLoadingButton(false),
        t:t})
      }else{
        // ! complete it and pass number
        forgetPasswordByPhone({
        values : values,
        success : ()=>{setLoadingButton(false); router.push(`/enter-phone-code?phone=${values.phone}`);},
        error : ()=>setLoadingButton(false),
        t:t})

    }
  }

  return (

    <Login noLinksButton contactUs >
      <h1 className="block mb-0 font-bold text-h2 mt-14">{t('auth:i_forgot_the_password')}</h1>
      <span className="block mb-8 text-gray-400 text-md">{t('auth:please_enter_your_account_password_to_send_a_code_to_reset_a_new_password')}</span>
      <Formik initialValues={isEmail ? { email: "" } : { phone: "" }} onSubmit={onSubmit} validationSchema={() => Yup.object().shape(isEmail ? {
        email: Yup.string().email().required(t('auth:please_enter_the_email')),
      } : {
        phone: Yup.number().required(t('auth:please_enter_the_phone')),
      })}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>

            <InputIcon icon={isEmail ? <Sms className="text-primary" /> : <Call className="text-primary" />}>
              {isEmail ?

                <Input name="email" type="email" placeholder={t('auth:e_mail')} />
                :

                <InputPhone name="phone" type="tel" placeholder={t('auth:phone_number')} />
              }
            </InputIcon>


            <ButtonTheme color="primary" as="button" type="submit"  block className="my-4 text-center xs:my-2 p-4" loading={loadingButton}>
              {t('auth:send_the_password_recovery_link')}
            </ButtonTheme>
          </form>
        )}
      </Formik>
      <button className="block w-full text-xs text-center text-primary" 
      // onClick={() => setIsEmail(!isEmail)}
      >{isEmail ? t('auth:send_the_code_to_the_phone') : t('auth:send_the_code_to_the_email')}</button>

      <ButtonTheme color="primary" onClick={() => router.back()} outline className="flex items-center gap-2 mx-auto my-4 text-center  xs:my-2 w-max px-4 py-2" >
        {t('auth:back')}{lang == "ar" ? <ArrowLeft size="15" className="text-primary" /> : <ArrowRight size="15" className="text-primary" />}
      </ButtonTheme>

    </Login>
  )
}
ForgetPassword.getLayout = function PageLayout(page) {
  return <>
    {page}
  </>
}

