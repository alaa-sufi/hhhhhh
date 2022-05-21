
import { useState } from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon, InputCity, InputPhone, InputCheck } from "@/form"
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse, Sms, Lock, Eye, EyeSlash, Flag, Call, Google, Facebook } from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/router'
import { register } from "apiHandle"
export default function RegisterUser() {
  const { t, lang } = useTranslation()
  const router = useRouter()
  const [passwordType, setPasswordType] = useState(true)
  const [loadingButton, setLoadingButton] = useState(false)
  const onSubmit = (values) => {
    setLoadingButton(true)
    register({
      values : values,
      success : ()=>{setLoadingButton(false); router.push("/auth/login-user");},
      error : ()=>setLoadingButton(false),
      t:t
    })
      
  }

  return (
    <Login slider>
      <span className="block mt-8 mb-2 text-gray-400 text-md">{t('auth:start_now_for_free')}</span>
      <h1 className="mb-8 font-bold leading-none text-h2">{t('auth:create_your_account_now')}</h1>
      <div className="flex justify-between gap-4 my-2 md:my-4">
        <div className="flex items-center w-1/2 gap-2 p-2 text-blue-400 border rounded md:rounded-lg md:p-4"><Facebook size="20" className="text-blue-400" />{t('auth:register_via_facebook')} </div>
        <div className="flex items-center w-1/2 gap-2 p-2 border rounded md:rounded-lg md:p-4"><Google size="20" /> {t('auth:register_via_google')} </div>
      </div>
      <Formik initialValues={{ name: "", email: "", phone: "", country: "", password: "", agree: false, type: "user", email: "" }} onSubmit={onSubmit} validationSchema={() => Yup.object().shape({
        name: Yup.string().required(t('auth:please_enter_the_name')),
        email: Yup.string().email().required(t('auth:please_enter_the_email')),
        phone: Yup.number().required(t('auth:please_enter_the_phone')),
        country: Yup.string().required(t('auth:please_enter_the_city')),
        password: Yup.string().required(t('auth:please_enter_the_password')),
        agree: Yup.bool().required().oneOf([true], t('auth:please_agree'))
      })}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputIcon icon={<Profile className="text-primary" />}>
              <Input name="name" type="text" placeholder={t('auth:full_name')} />
            </InputIcon>
            <InputIcon icon={<Sms className="text-primary" />}>
              <Input name="email" type="text" placeholder={t('auth:e_mail')} />
            </InputIcon>
            <InputIcon icon={<Flag className="text-primary" />}>
              <InputCity name="country" type="text" placeholder={t('auth:residence')} />
            </InputIcon>
            <InputIcon icon={<Call className="text-primary" />}>
              <InputPhone name="phone" type="tel" placeholder={t('auth:phone_number')} />
            </InputIcon>
            <InputIcon icon={<Lock className="text-primary" />}>
              <span role="button" className="absolute transform top-4 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 " onClick={() => setPasswordType(!passwordType)}>
                {passwordType ? <Eye /> : <EyeSlash />}
              </span>
              <Input name="password" type={passwordType ? "password" : "text"} placeholder={t('auth:password')} />
            </InputIcon>
            <InputCheck name="agree" text={t('auth:by_clicking_on_the_box_i_acknowledge_that_i_read_the_work_agreement_the_privacy_policy_and_the_conditions_of_the_company_and_i_agree_with_it_and_this_is_considered_an_electronic_signature_by_me')} >
            </InputCheck>
            <ButtonTheme color="primary" as="button" type="submit" big block className="my-6 text-center xs:my-4 px-4 py-2"  loading={loadingButton}>
              {t('auth:create_account')}
            </ButtonTheme>
          </form>
        )}
      </Formik>
      <ButtonTheme color="primary" outline as="link" href="/auth/login-user" block className="my-6 text-center xs:my-4 px-4 py-2">
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


