
import { useState } from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon ,InputCity , InputPhone , InputCheck} from "form"
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
      <span className="mb-2 text-gray-400 text-md mt-4 block">{t('auth:start_now_for_free')}</span>
      <h1 className="mb-8 font-bold text-h2 leading-none">{t('auth:create_your_account_now')}</h1>
      <div className="flex justify-between my-2 md:my-4 gap-4">
        <div className="text-blue-400 flex  gap-2 items-center rounded md:rounded-lg p-2 md:p-4 border w-1/2"><Facebook size="20" className="text-blue-400"/>{t('auth:register_via_facebook')} </div>
        <div className=" flex gap-2 items-center rounded md:rounded-lg p-2 md:p-4 border w-1/2"><Google size="20" /> {t('auth:register_via_google')} </div>
      </div>
      <Formik initialValues={{ name: "", phone: "", city: "", password:"", agree:false }} onSubmit={onSubmit} validationSchema={() => Yup.object().shape({
        name: Yup.string().required(t('auth:please_enter_the_name')),
        phone: Yup.number().required(t('auth:please_enter_the_phone')),
        city: Yup.string().required(t('auth:please_enter_the_city')),
        password: Yup.string().required(t('auth:please_enter_the_password'))
      })}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputIcon icon={<Profile className="text-primary"/>}>
              <Input name="name" type="text" placeholder={t('auth:full_name')}  />
            </InputIcon>
            <InputIcon icon={<Flag className="text-primary"/>}>
              <InputPhone name="city" type="text" placeholder={t('auth:residence')} />         
            </InputIcon> 
            <InputIcon icon={<Call className="text-primary"/>}>
              <InputPhone name="phone" type="tel" placeholder={t('auth:phone_number')} />         
            </InputIcon> 
            <InputIcon icon={<Sms className="text-primary"/>}>
              <Input name="email" type="text" placeholder={t('auth:e_mail')}  />
            </InputIcon>
            <InputIcon icon={<Lock className="text-primary"/>}>
            <span  role="button" className="absolute transform top-4 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 " onClick={()=>setPasswordType(!passwordType)}>
                {passwordType ? <Eye /> : <EyeSlash />}
              </span>
              <Input name="password" type={passwordType ? "password" : "text"} placeholder={t('auth:password')}  />
            </InputIcon>  
            <InputCheck name="agree" text={t('auth:by_clicking_on_the_box_i_acknowledge_that_i_read_the_work_agreement_the_privacy_policy_and_the_conditions_of_the_company_and_i_agree_with_it_and_this_is_considered_an_electronic_signature_by_me')} >
           </InputCheck>
         
            <ButtonTheme color="primary" as="button" type="submit" big  block className="my-6 text-center xs:my-4">
              {t('auth:create_account')}
            </ButtonTheme>
          </form>
        )}
      </Formik>
      <ButtonTheme color="primary" outline as="link" href="/auth/login-user" block className="my-6 text-center xs:my-4">
        {t('auth:i_have_an_account_log_in')}
      </ButtonTheme>
    </Login>
  )
}
RegisterUser.getLayout = function PageLayout(page) {
  return <>
    {page}
  </>
}


