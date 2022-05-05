
import { useState } from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon ,InputCity , InputPhone } from "@/form"
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse , Sms, Lock,Eye, EyeSlash , Flag , Call,Facebook , Google } from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link"
export default function LoginPageTwo() {
  const [passwordType ,setPasswordType] = useState(true)
  const { t, lang } = useTranslation()

  const onSubmit = (values) => {
    console.log(values)
  }
  return (
    <Login slider>
      <span className="mb-3 text-gray-400 text-md">{t('auth:Glad_you_are_back')}</span>
      <h1 className="mb-8 font-bold text-h2 leading-none">{t('auth:welcome_again')}</h1>
      <div className="flex justify-between my-2 md:my-4 gap-4">
        <div className="text-blue-400 flex  gap-2 items-center rounded md:rounded-lg p-2 md:p-4 border w-1/2"><Facebook size="20" className="text-blue-400"/>{t('auth:Register_via_Facebook')} </div>
        <div className=" flex gap-2 items-center rounded md:rounded-lg p-2 md:p-4 border w-1/2"><Google size="20" /> {t('auth:Register_via_Google')} </div>
      </div>
      <Formik initialValues={{ name: "", password:"" }} onSubmit={onSubmit} validationSchema={() => Yup.object().shape({
        name: Yup.string().required(t('auth:Please_enter_the_name')),
        password: Yup.string().required(t('auth:Please_enter_the_password'))
      })}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputIcon icon={<Profile className="text-primary"/>}>
              <Input name="name" type="text" placeholder={t('auth:Full_name')}  />
            </InputIcon>
            <InputIcon icon={<Lock className="text-primary"/>}>
            <span  role="button" className="absolute transform top-4 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 " onClick={()=>setPasswordType(!passwordType)}>
                {passwordType ? <Eye /> : <EyeSlash />}
              </span>
              <Input name="password" type={passwordType ? "password" : "text"} placeholder={t('auth:password')}  />
            </InputIcon>  
           <Link href="/"> 
            <a className="text-primary flex flex-row-reverse -mt-2" >{t('auth:I_forgot_the_password?')}</a>
           </Link>
         
            <ButtonTheme color="primary" as="button" type="submit" big  block className="my-6 text-center xs:my-4">
              {t('auth:sign_in')}
            </ButtonTheme>
          </form>
        )}
      </Formik>
      <ButtonTheme color="primary" outline as="link" href="/login" block className="my-6 text-center xs:my-4">
        {t('auth:You_do_not_have_an_account_create_an_account')}
      </ButtonTheme>
    </Login>
  )
}
LoginPageTwo.getLayout = function PageLayout(page) {
  return <>
    {page}
  </>
}

