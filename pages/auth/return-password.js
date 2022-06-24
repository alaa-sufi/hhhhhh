
import { useState , useEffect} from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon ,InputCity , InputPhone} from "@/form"
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse , Sms, Lock,Eye, EyeSlash , Flag , Call } from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import { Formik } from "formik";
import * as Yup from "yup";
import {returnPassword} from "apiHandle"
import { useRouter } from 'next/router'

export default function ReturnPassword() {
  const { t , lang} = useTranslation("auth")
  const [passwordType ,setPasswordType] = useState(true)
  const [loadingButton, setLoadingButton] = useState(false)
  const router = useRouter()
  const [token , setToken] = useState("")
  useEffect(()=>{
    setToken(router.query.token);
    console.log(router.query.token)
  },[token,router])
  const onSubmit = (values) => {
    setLoadingButton(true);
    returnPassword({
      values : {...values , token:token},
      success : ()=>{setLoadingButton(false); router.push("/auth/register-all");},
      error : ()=>setLoadingButton(false),
     })
  }
 
  return (
    <Login noLinksButton className="mb-16"> 
      <h1 className="block mt-10 mb-0 font-bold text-h2">{t('reset_a_new_password')}</h1>
      <span className="block mb-8 text-gray-400 text-md ">{t('make_the_password_consist_of_letters_and_numbers_and_be_easy_to_remember')}</span>
      <Formik initialValues={{ email:"", password_confirmation: "", password:"" }} onSubmit={onSubmit} validationSchema={() => Yup.object().shape({
          password: Yup.string().required(t("please_write_the_password")).min(8, t("the_password_should_not_be_less_than_eight_letters"))
          .max(12, t("the_password_should_not_exceed_twelve_letters")).matches(/[a-z]/, t("the_password_must_contain_letters") ).matches(/[1-9]/,t("the_password_must_contain_numbers") )
          ,
        email: Yup.string().email().required(t('please_enter_the_email')),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], t('please_repeat_enter_the_password'))
      })}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputIcon icon={<Sms className="text-primary"/>}>
              <Input name="email" type="email" placeholder={t('e_mail')}  />
            </InputIcon>
            <InputIcon icon={<Lock className="text-primary"/>}>
            <span  role="button" className="absolute transform top-4 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 " onClick={()=>setPasswordType(!passwordType)}>
                {passwordType ? <Eye className="text-black dark:text-white"/> : <EyeSlash className="text-black dark:text-white"/>}
              </span>
              <Input name="password" type={passwordType ? "password" : "text"} placeholder={t('new_password')} dir={lang === "ar" ? "rtl" : "ltr"} className="password"/>
            </InputIcon>  
            <InputIcon icon={<Lock className="text-primary"/>}>
              <Input name="password_confirmation" type="password" placeholder={t('repeat_the_new_password')} dir={lang === "ar" ? "rtl" : "ltr"} className="password"/>
            </InputIcon>  
            <ButtonTheme color="primary" as="button" type="submit" size="md"  block className="my-6 text-center xs:my-4" loading={loadingButton}>
              {t('reset')}
            </ButtonTheme>
          </form>
        )}
      </Formik>
    </Login>
  )
}
ReturnPassword.getLayout = function PageLayout(page) {
  return <>
    {page}
  </>
}


