
import { useState } from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon, InputCity, InputPhone, InputCheck } from "@/form"
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse, Sms, Lock, Eye, EyeSlash, Flag, Call, Google, Facebook } from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/router'
import { register ,getPhoneCode } from "apiHandle"
import toast from "react-hot-toast";

export default function RegisterUser() {
  const { t , lang } = useTranslation("auth")
  const router = useRouter()
  const [passwordType, setPasswordType] = useState(true)
  const [loadingButton, setLoadingButton] = useState(false)
  const onSubmit = (values) => {
    setLoadingButton(true);
    register({
      values : values,
      success : ()=>{setLoadingButton(false); router.push(`/auth/enter-phone-code?phone=${values.phone}&verify=true`);},
      error : ()=>setLoadingButton(false)
    
    })
    getPhoneCode({
      success: () => { },
      error: () => { () => toast.error(t("errToast:sorry_there_was_an_error_in_sending_the_code_please_return_later")) },
      phone: `${values.phone}`
    })
      
  }

  return (
    <Login slider>
      <span className="block mt-8 mb-2 text-gray-400 text-md">{t('start_now_for_free')}</span>
      <h1 className="mb-8 font-bold leading-none text-h2">{t('create_your_account_now')}</h1>
      <div className="flex justify-between gap-4 my-2 md:mb-4 md:mt-10">
        <div className="flex items-center w-1/2 gap-2 p-2 text-blue-400 border rounded md:rounded-lg md:p-4"><Facebook size="20" className="text-blue-400" />{t('register_via_facebook')} </div>
        <div className="flex items-center w-1/2 gap-2 p-2 border rounded md:rounded-lg md:p-4"><Google size="20" /> {t('register_via_google')} </div>
      </div>
      <Formik initialValues={{ name: "", email: "", phone: "", country: "", password: "", agree: false, type: "user", email: "" }} onSubmit={onSubmit} validationSchema={() => Yup.object().shape({
        name: Yup.string().required(t('please_enter_the_name')),
        email: Yup.string().email().required(t('please_enter_the_email')),
        phone: Yup.number().required(t('please_enter_the_phone')),
        country: Yup.string().required(t('please_enter_the_city')),
        password: Yup.string().required(t("please_write_the_password")).min(8, t("the_password_should_not_be_less_than_eight_letters"))
    .max(12, t("the_password_should_not_exceed_twelve_letters")).matches(/[a-z]/, t("the_password_must_contain_letters") ).matches(/[1-9]/,t("the_password_must_contain_numbers") ),
        agree: Yup.bool().required().oneOf([true], t('please_agree'))
      })}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputIcon icon={<Profile className="text-primary" />}>
              <Input name="name" type="text" placeholder={t('full_name')} />
            </InputIcon>
            <InputIcon icon={<Sms className="text-primary" />}>
              <Input name="email" type="email" placeholder={t('e_mail')} />
            </InputIcon>
            <InputIcon icon={<Flag className="text-primary" />}>
              <InputCity name="country" type="text" placeholder={t('residence')} />
            </InputIcon>
            <InputIcon icon={<Call className="text-primary" />}>
              <InputPhone name="phone" type="tel" placeholder={t('phone_number')} />
            </InputIcon>
            <InputIcon icon={<Lock className="text-primary" />}>
              <span role="button" className="absolute transform top-4 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 " onClick={() => setPasswordType(!passwordType)}>
                {passwordType ? <Eye className="text-black dark:text-white"/> : <EyeSlash className="text-black dark:text-white"/>}
              </span>
              <Input name="password" type={passwordType ? "password" : "text"} placeholder={t('password')} dir={lang === "ar" ? "rtl" : "ltr"} className="password"/>
            </InputIcon>
            <InputCheck name="agree" text={<span className="text-xs">{t('by_clicking_on_the_box_i_acknowledge_that_i_read_the_work_agreement_the_privacy_policy_and_the_conditions_of_the_company_and_i_agree_with_it_and_this_is_considered_an_electronic_signature_by_me')}</span>} >
            </InputCheck>
            <ButtonTheme color="primary" as="button" type="submit" size="md" block className="my-6 text-center xs:my-4"  loading={loadingButton}>
              {t('create_account')}
            </ButtonTheme>
          </form>
        )}
      </Formik>
      <ButtonTheme color="primary" outline as="link" href="/auth/login-user" block size="xs" className="mt-6 text-center xs:my-4">
        {t('i_have_an_account_log_in')}
      </ButtonTheme>
    </Login>

  )
}
RegisterUser.getLayout = function PageLayout(page) {
  return <>
    {page}
  </>
}


