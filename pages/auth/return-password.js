
import { useState } from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon ,InputCity , InputPhone} from "@/form"
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse , Sms, Lock,Eye, EyeSlash , Flag , Call } from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import { Formik } from "formik";
import * as Yup from "yup";

export default function ReturnPassword() {
  const { t, lang } = useTranslation()
  const [passwordType ,setPasswordType] = useState(true)

  const onSubmit = (values) => {
    console.log(values)
  }
 
  return (
    <Login noLinksButton>
      <h1 className="mb-0 font-bold text-h2 leading-none">{t('auth:Reset_a_new_password')}</h1>
      <span className="mb-8 block text-gray-400 text-md">{t('auth:Make_the_password_consist_of_letters_and_numbers_and_be_easy_to_remember')}</span>
      <Formik initialValues={{  conpassword: "", password:"" }} onSubmit={onSubmit} validationSchema={() => Yup.object().shape({
        password: Yup.string().required(t('auth:Please_enter_the_password')),
        conpassword: Yup.string().oneOf([Yup.ref('password'), null], t('auth:Please_repeat_enter_the_password'))
      })}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
          
            <InputIcon icon={<Lock className="text-primary"/>}>
            <span  role="button" className="absolute transform top-4 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 " onClick={()=>setPasswordType(!passwordType)}>
                {passwordType ? <Eye /> : <EyeSlash />}
              </span>
              <Input name="password" type={passwordType ? "password" : "text"} placeholder={t('auth:new_password')}  />
            </InputIcon>  
            <InputIcon icon={<Lock className="text-primary"/>}>
              <Input name="conpassword" type="password" placeholder={t('auth:Repeat_the_new_password')}  />
            </InputIcon>  
           
         
            <ButtonTheme color="primary" as="button" type="submit" big  block className="my-6 text-center xs:my-4">
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


