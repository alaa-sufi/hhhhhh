
import { useState } from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon ,InputCity , InputPhone} from "@/form"
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse , Sms, Lock,Eye, EyeSlash , Flag , Call ,Google ,Facebook} from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import { Formik } from "formik";
import * as Yup from "yup";

export default function RegisterUser() {
  const { t, lang } = useTranslation()
  const [passwordType ,setPasswordType] = useState(true)

  const onSubmit = (values) => {
    console.log(values)
  }
 
  return (
    <Login slider>
      <span className="mb-3 text-gray-400 text-md mt-4">{t('auth:Start_now_for_free')}</span>
      <h1 className="mb-8 font-bold text-h2 leading-none">{t('auth:Create_your_account_now')}</h1>
      <div className="flex justify-between my-2 md:my-4 gap-4">
        <div className="text-blue-400 flex  gap-2 items-center rounded md:rounded-lg p-2 md:p-4 border w-1/2"><Facebook size="20" className="text-blue-400"/>{t('auth:Register_via_Facebook')} </div>
        <div className=" flex gap-2 items-center rounded md:rounded-lg p-2 md:p-4 border w-1/2"><Google size="20" /> {t('auth:Register_via_Google')} </div>
      </div>
      <Formik initialValues={{ name: "", phone: "", city: "", password:"" }} onSubmit={onSubmit} validationSchema={() => Yup.object().shape({
        name: Yup.string().required(t('auth:Please_enter_the_name')),
        phone: Yup.number().required(t('auth:Please_enter_the_phone')),
        city: Yup.string().required(t('auth:Please_enter_the_city')),
        password: Yup.string().required(t('auth:Please_enter_the_password'))
      })}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputIcon icon={<Profile className="text-primary"/>}>
              <Input name="name" type="text" placeholder={t('auth:Full_name')}  />
            </InputIcon>
            <InputIcon icon={<Flag className="text-primary"/>}>
              <InputPhone name="city" type="text" placeholder={t('auth:residence')} />         
            </InputIcon> 
            <InputIcon icon={<Call className="text-primary"/>}>
              <InputPhone name="phone" type="tel" placeholder={t('auth:phone_number')} />         
            </InputIcon> 
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
              {t('auth:Create_account')}
            </ButtonTheme>
          </form>
        )}
      </Formik>
      <ButtonTheme color="primary" outline as="link" href="/login" block className="my-6 text-center xs:my-4">
        {t('auth:I_have_an_account_log_in')}
      </ButtonTheme>
    </Login>
  )
}
RegisterUser.getLayout = function PageLayout(page) {
  return <>
    {page}
  </>
}


