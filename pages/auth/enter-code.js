import { useState } from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon, InputCity, InputPhone } from "@/form"
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse, Sms, Lock, Eye, EyeSlash, Flag, Call, ArrowLeft, ArrowRight } from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import { Formik } from "formik";
import * as Yup from "yup";

export default function EnterCode() {
  const { t, lang } = useTranslation()
  const [isEmail, setIsEmail] = useState(false)
  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Login noLinksButton>
      <h1 className="mb-0 font-bold text-h2 ">{t('auth:Enter_the_code')}</h1>
      <span className="mb-8 block text-gray-400 text-md">{t('auth:You_will_receive_an_SMS_containing_5_numbers_enter_them_in_the_field_to_confirm_the_operation')}</span>
      <Formik initialValues={isEmail ? {email:""}:{ phone: "" }} onSubmit={onSubmit} validationSchema={() => Yup.object().shape(isEmail ? {
        email: Yup.email().required(t('auth:Please_enter_the_email')),
      } : {
        phone: Yup.number().required(t('auth:Please_enter_the_phone')),
      })}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>

            <InputIcon icon={isEmail ? <Sms className="text-primary" /> : <Call className="text-primary" />}>
              <InputPhone name={isEmail ? "email" : "phone"} type={isEmail ? "email" : "tel"} placeholder={isEmail ?t('auth:E_mail') :t('auth:phone_number')} />
            </InputIcon>


            <ButtonTheme color="primary" as="button" type="submit" big block className="my-4 text-center xs:my-2">
              {t('auth:Confirm_Code')}
            </ButtonTheme>
          </form>
        )}
      </Formik>
      <button className="text-center block w-full text-primary text-xs">{t('auth:I_havent_received_the_code_yet')}</button>
      <ButtonTheme color="primary" outline as="button"  big block className="my-4 text-center xs:my-2">
              {t('auth:Resend_Code')}
            </ButtonTheme>
     
      <div className="text-center mt-10 ">
        <h6>{t('auth:If_you_face_any_difficulty_contact_us')}</h6>
        <a target="_blank" href="mailto:info@hululfx.com" className="text-primary block">info@hululfx.com</a>
        <a target="_blank" href="tel:0092178945612" className="text-primary block">+92178945612</a>
      </div>
    </Login>
  )
}
EnterCode.getLayout = function PageLayout(page) {
  return <>
    {page}
  </>
}

