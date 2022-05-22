
import { useState } from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon ,InputCity , InputPhone , InputCheck} from "@/form"
import useTranslation from 'next-translate/useTranslation'
import {  Sms, Lock,Eye, EyeSlash  } from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import { Formik } from "formik";
import Link from "next/link"
import {login} from "apiHandle"
import * as Yup from "yup";
import { useRouter } from 'next/router'

export default function LoginCompany() {
  const [passwordType ,setPasswordType] = useState(true)
  const { t, lang } = useTranslation()
  const [loadingButton, setLoadingButton] = useState(false)
  const router = useRouter()

  const onSubmit = (values) => {
    setLoadingButton(true);
    login({
      values : values,
      success : ()=>{setLoadingButton(false); router.push("/dashboard");},
      error : ()=>setLoadingButton(false),
      t:t})
  }
  return (
    <Login slider>
      <span className="mb-2 text-gray-400 text-md mt-8 block">{t('auth:welcom_to_us')}</span>
      <h1 className="mb-8 font-bold text-h2 leading-none">{t('auth:welcome_back_again')}</h1>
      <Formik initialValues={{ email: "", password:"" ,remember:false }} onSubmit={onSubmit} validationSchema={() => Yup.object().shape({
        email: Yup.string().email().required(t('auth:please_enter_the_email')),
        password: Yup.string().required(t('auth:please_enter_the_password'))
      })}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputIcon icon={<Sms className="text-primary"/>}>
              <Input name="email" type="email" placeholder={t('auth:e_mail')}  />
            </InputIcon>
            <InputIcon icon={<Lock className="text-primary"/>}>
            <span  role="button" className="absolute transform top-4 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 " onClick={()=>setPasswordType(!passwordType)}>
                {passwordType ? <Eye /> : <EyeSlash />}
              </span>
              <Input name="password" type={passwordType ? "password" : "text"} placeholder={t('auth:password')}  />
            </InputIcon>  
            <Link href="/auth/forget-password"> 
            <a className="text-primary flex flex-row-reverse -mt-2" >{t('auth:i_forgot_the_password?')}</a>
           </Link>
           <InputCheck name="remember" text={t('auth:remember_me')} >
           </InputCheck>
            <ButtonTheme color="primary" as="button" type="submit" big  block className="my-6 text-center xs:my-4 px-4 py-2" loading={loadingButton}>
              {t('auth:sign_in')}
            </ButtonTheme>
          </form>
        )}
      </Formik>
      <ButtonTheme color="primary" outline as="link" href="/auth/register-company" block className="my-6 text-center xs:my-4 px-4 py-2" >
        {t('auth:you_do_not_have_an_account_create_an_account')}
      </ButtonTheme>
    </Login>
  )
}
LoginCompany.getLayout = function PageLayout(page) {
  return <>
    {page}
  </>
}

