
import { useState } from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon ,InputCity , InputPhone} from "form"
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse , Sms, Lock,Eye, EyeSlash , Flag , Call } from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import { Formik } from "formik";
import * as Yup from "yup";
export default function LoginBroker() {
  const [passwordType ,setPasswordType] = useState(true)
  const { t, lang } = useTranslation()

  const onSubmit = (values) => {
    console.log(values)
  }
  return (
    <Login slider noRiskWarning>
      <span className="mb-2 text-gray-400 text-md mt-12 block">{t('auth:welcome_with_us')}</span>
      <h1 className="mb-8 font-bold text-h2 leading-none">{t('auth:welcome')}</h1>
      <Formik initialValues={{ email: "", password:"" }} onSubmit={onSubmit} validationSchema={() => Yup.object().shape({
        email: Yup.string().email().required(t('auth:please_enter_the_email')),
        password: Yup.string().required(t('auth:please_enter_the_password'))
      })}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputIcon icon={<Sms className="text-primary"/>}>
              <Input name="email" type="text" placeholder={t('auth:e_mail')}  />
            </InputIcon>
            <InputIcon icon={<Lock className="text-primary"/>}>
            <span  role="button" className="absolute transform top-4 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 " onClick={()=>setPasswordType(!passwordType)}>
                {passwordType ? <Eye /> : <EyeSlash />}
              </span>
              <Input name="password" type={passwordType ? "password" : "text"} placeholder={t('auth:password')}  />
            </InputIcon>  
           
         
            <ButtonTheme color="primary" as="button" type="submit" big  block className="my-6 text-center xs:my-4">
              {t('auth:sign_in')}
            </ButtonTheme>
          </form>
        )}
      </Formik>
      <ButtonTheme color="primary" as="link"  href="/" outline className="block mx-auto my-10 text-center xs:my-8 w-max">
                {t('auth:back_to_the_home_page')}
            </ButtonTheme>
    </Login>
  )
}
LoginBroker.getLayout = function PageLayout(page) {
  return <>
    {page}
  </>
}

