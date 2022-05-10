
import { useState } from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon ,InputCity , InputPhone ,InputCheck } from "form"
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse , Sms, Lock,Eye, EyeSlash , Flag , Call,Facebook , Google } from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link"
export default function LoginUser() {
  const [passwordType ,setPasswordType] = useState(true)
  const { t, lang } = useTranslation()

  const onSubmit = (values) => {
    console.log(values)
  }
  return (
    <Login slider>
      <span className="mb-3 text-gray-400 text-md block mt-8">{t('auth:glad_you_are_back')}</span>
      <h1 className="mb-8 font-bold leading-none text-h2">{t('auth:welcome_again')}</h1>
      <div className="flex justify-between gap-4 my-2 md:my-4">
        <div className="flex items-center w-1/2 gap-2 p-2 text-blue-400 border rounded md:rounded-lg md:p-4"><Facebook size="20" className="text-blue-400"/>{t('auth:register_via_facebook')} </div>
        <div className="flex items-center w-1/2 gap-2 p-2 border rounded md:rounded-lg md:p-4"><Google size="20" /> {t('auth:register_via_google')} </div>
      </div>
      <Formik initialValues={{ name: "", password:"" }} onSubmit={onSubmit} validationSchema={() => Yup.object().shape({
        name: Yup.string().required(t('auth:please_enter_the_name')),
        password: Yup.string().required(t('auth:please_enter_the_password'))
      })}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputIcon icon={<Profile className="text-primary"/>}>
              <Input name="name" type="text" placeholder={t('auth:full_name')}  />
            </InputIcon>
            <InputIcon icon={<Lock className="text-primary"/>}>
            <span  role="button" className="absolute transform top-4 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 " onClick={()=>setPasswordType(!passwordType)}>
                {passwordType ? <Eye /> : <EyeSlash />}
              </span>
              <Input name="password" type={passwordType ? "password" : "text"} placeholder={t('auth:password')}  />
            </InputIcon>  
           <Link href="/auth/forget-password"> 
            <a className="flex flex-row-reverse -mt-2 text-primary" >{t('auth:i_forgot_the_password?')}</a>
           </Link>
           <InputCheck name="remember" text={t('auth:remember_me')} >
           </InputCheck>
            <ButtonTheme color="primary" as="button" type="submit" big  block className="my-6 text-center xs:my-4">
              {t('auth:sign_in')}
            </ButtonTheme>
          </form>
        )}
      </Formik>
      <ButtonTheme color="primary" outline as="link" href="/auth/register-user" block className="my-6 text-center xs:my-4">
        {t('auth:you_do_not_have_an_account_create_an_account')}
      </ButtonTheme>
    </Login>
  )
}
LoginUser.getLayout = function PageLayout(page) {
  return <>
    {page}
  </>
}

