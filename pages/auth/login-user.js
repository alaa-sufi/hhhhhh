
import { useState } from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon, InputCity, InputPhone, InputCheck } from "@/form"
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse, Sms, Lock, Eye, EyeSlash, Flag, Call, Facebook, Google } from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import axios from "axios";
import toast from "react-hot-toast";
import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link"
import { login } from "apiHandle"
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function LoginUser() {
  const [passwordType, setPasswordType] = useState(true)
  const { t , lang } = useTranslation("auth")
  const [loadingButton, setLoadingButton] = useState(false)
  const router = useRouter()

  const onSubmit = (values) => {
    setLoadingButton(true);
    login({
      values: values,
      success: (response) => { setLoadingButton(false); router.push("/dashboard"); localStorage.setItem("userId", response.data.user_ifo.id);localStorage.setItem("userType", response.data.user_ifo.type)},
      error: () => setLoadingButton(false)
     
    })
  }
  return (
    <>
       <Head>
        <title>{t("sign_in")} | {t("common:website_name")}</title>
      </Head>
    <Login slider>
      <span className="block mt-12 mb-3 text-gray-400 text-md">{t('glad_you_are_back')}</span>
      <h1 className="mb-8 font-bold leading-none text-h2">{t('welcome_again')}</h1>
      <div className="flex justify-between gap-4 my-2 md:mb-4 mt:mt-10">
        <div className="flex items-center w-1/2 gap-2 p-2 text-blue-400 border rounded md:rounded-lg md:p-4"><Facebook size="20" className="text-blue-400" />{t('register_via_facebook')} </div>
        <div className="flex items-center w-1/2 gap-2 p-2 border rounded md:rounded-lg md:p-4"><Google size="20" /> {t('register_via_google')} </div>
      </div>
      <Formik initialValues={{ name: "", password: "" }} onSubmit={onSubmit} validationSchema={() => Yup.object().shape({
        email: Yup.string().required(t('please_enter_the_email')),
        password: Yup.string().required(t("please_write_the_password")).min(8, t("the_password_should_not_be_less_than_eight_letters"))
        .max(12, t("the_password_should_not_exceed_twelve_letters")).matches(/[a-z]/, t("the_password_must_contain_letters") ).matches(/[1-9]/,t("the_password_must_contain_numbers") )
        
      })}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputIcon icon={<Sms className="text-primary" />}>
              <Input name="email" type="email" placeholder={t('e_mail')} />
            </InputIcon>
            <InputIcon icon={<Lock className="text-primary" />} className="password">
              <span role="button" className="absolute transform top-4 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 " onClick={() => setPasswordType(!passwordType)}>
                {passwordType ? <Eye className="text-black dark:text-white"/> : <EyeSlash className="text-black dark:text-white"/>}
              </span>
              <Input name="password" type={passwordType ? "password" : "text"} placeholder={t('password')} dir={lang === "ar" ? "rtl" : "ltr"} className="password"/>
            </InputIcon>
            <div className="flex items-center justify-between -mt-4">
              <InputCheck name="remember" text={t('remember_me')} >
              </InputCheck>
              <Link href="/auth/forget-password">
                <a className="flex flex-row-reverse -mt-2 text-primary" >{t('i_forgot_the_password?')}</a>
              </Link>
            </div>
            <ButtonTheme color="primary" as="button" type="submit"  block size="md" className="my-6 text-center xs:my-4" loading={loadingButton}>
              {t('sign_in')}
            </ButtonTheme>
          </form>
        )}
      </Formik>
      <ButtonTheme color="primary" outline as="link" href="/auth/register-user" block size="xs" className="mt-6 text-center xs:my-4" >
        {t('you_do_not_have_an_account_create_an_account')}
      </ButtonTheme>
    </Login>
    </>
  )
}
LoginUser.getLayout = function PageLayout(page) {
  return <>
    {page}
  </>
}

