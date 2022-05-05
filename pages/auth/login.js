
import { useState } from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon ,InputCity , InputPhone} from "@/form"
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse , Sms, Lock,Eye, EyeSlash , Flag , Call } from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import { Formik } from "formik";
import * as Yup from "yup";
export default function LoginPage() {
  const [passwordType ,setPasswordType] = useState(true)
  const { t, lang } = useTranslation()

  const onSubmit = (values) => {
    console.log(values)
  }
  return (
    <Login slider>
      <span className="mb-3 text-gray-400 text-md">{t('auth:Welcom_to_us')}</span>
      <h1 className="mb-8 font-bold text-h2 leading-none">{t('auth:welcome_back_again')}</h1>
      <Formik initialValues={{ email: "", password:"" }} onSubmit={onSubmit} validationSchema={() => Yup.object().shape({
        email: Yup.string().email().required(t('auth:Please_enter_the_email')),
        password: Yup.string().required(t('auth:Please_enter_the_password'))
      })}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputIcon icon={<Sms className="text-primary"/>}>
              <Input name="email" type="text" placeholder={t('auth:E_mail')}  />
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
      <ButtonTheme color="primary" outline as="link" href="/login" block className="my-6 text-center xs:my-4">
        {t('auth:You_do_not_have_an_account_create_an_account')}
      </ButtonTheme>
    </Login>
  )
}
LoginPage.getLayout = function PageLayout(page) {
  return <>
    {page}
  </>
}

