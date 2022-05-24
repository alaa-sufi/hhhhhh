
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
  const { t, lang } = useTranslation()
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
      t:t})
  }
 
  return (
    <Login noLinksButton className="mb-16"> 
      <h1 className="mb-0 font-bold text-h2 block mt-10">{t('auth:reset_a_new_password')}</h1>
      <span className="mb-8 block text-gray-400 text-md ">{t('auth:make_the_password_consist_of_letters_and_numbers_and_be_easy_to_remember')}</span>
      <Formik initialValues={{ email:"", password_confirmation: "", password:"" }} onSubmit={onSubmit} validationSchema={() => Yup.object().shape({
        password: Yup.string().required(t('auth:please_enter_the_password')),
        email: Yup.string().email().required(t('auth:please_enter_the_email')),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], t('auth:please_repeat_enter_the_password'))
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
              <Input name="password" type={passwordType ? "password" : "text"} placeholder={t('auth:new_password')}  />
            </InputIcon>  
            <InputIcon icon={<Lock className="text-primary"/>}>
              <Input name="password_confirmation" type="password" placeholder={t('auth:repeat_the_new_password')}  />
            </InputIcon>  
            <ButtonTheme color="primary" as="button" type="submit" big  block className="my-6 text-center xs:my-4 px-4 py-2" loading={loadingButton}>
              {t('auth:reset')}
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


