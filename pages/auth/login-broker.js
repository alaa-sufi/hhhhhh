
import { useState } from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon ,InputCity , InputPhone} from "@/form"
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse , Sms, Lock,Eye, EyeSlash , Flag , Call } from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import { Formik } from "formik";
import * as Yup from "yup";
import Head from 'next/head'

export default function LoginBroker() {
  const [passwordType ,setPasswordType] = useState(true)
  const { t , lang} = useTranslation("auth")
  const onSubmit = (values) => {
    console.log(values)
  }
  return (
    <>
       <Head>
        <title>{t("sign_in")} | {t("common:website_name")}</title>
      </Head>
    <Login slider noRiskWarning>
      <span className="block mt-20 mb-2 text-gray-400 text-md">{t('welcome_with_us')}</span>
      <h1 className="mb-8 font-bold leading-none text-h2">{t('welcome')}</h1>
      <Formik initialValues={{ email: "", password:"" }} onSubmit={onSubmit} validationSchema={() => Yup.object().shape({
        email: Yup.string().email().required(t('please_enter_the_email')),
        password: Yup.string().required(t("please_write_the_password")).min(8, t("the_password_should_not_be_less_than_eight_letters"))
        .max(12, t("the_password_should_not_exceed_twelve_letters")).matches(/[a-z]/, t("the_password_must_contain_letters") ).matches(/[1-9]/,t("the_password_must_contain_numbers") )
      })}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputIcon icon={<Sms className="text-primary"/>}>
              <Input name="email" type="text" placeholder={t('e_mail')}  />
            </InputIcon>
            <InputIcon icon={<Lock className="text-primary"/>}>
            <span  role="button" className="absolute transform top-4 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 " onClick={()=>setPasswordType(!passwordType)}>
                {passwordType ? <Eye className="text-black dark:text-white"/> : <EyeSlash className="text-black dark:text-white"/>}
              </span>
              <Input name="password" type={passwordType ? "password" : "text"} placeholder={t('password')} dir={lang === "ar" ? "rtl" : "ltr"} className="password" />
            </InputIcon>  
           
         
            <ButtonTheme color="primary" as="button" type="submit"  size="md" block className="my-6 text-center xs:my-4 ">
              {t('sign_in')}
            </ButtonTheme>
          </form>
        )}
      </Formik>
      <ButtonTheme color="primary" as="link"  href="/" outline size="xs" className="block px-4 py-2 mx-auto mt-10 text-center xs:my-8 w-max">
                {t('back_to_the_home_page')}
            </ButtonTheme>
    </Login>
    </>
  )
}
LoginBroker.getLayout = function PageLayout(page) {
  return <>
    {page}
  </>
}

