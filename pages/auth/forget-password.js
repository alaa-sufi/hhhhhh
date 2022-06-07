import { useState } from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon, InputCity, InputPhone } from "@/form"
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse, Sms, Lock, Eye, EyeSlash, Flag, Call, ArrowLeft, ArrowRight } from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/router'
import { forgetPasswordByEmail, forgetPasswordByPhone } from "apiHandle"
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const { t, lang } = useTranslation("auth")
  const [isEmail, setIsEmail] = useState(true)
  const [loadingButton1, setLoadingButton1] = useState(false)
  const [loadingButton2, setLoadingButton2] = useState(false)

  const router = useRouter()
  const onSubmitEmail = (values) => {
    setLoadingButton1(true);

    forgetPasswordByEmail({
      values: values,
      success: () => { setLoadingButton1(false); router.push(`/auth/enter-email-code?email=${values.email}`) },
      error: () => { setLoadingButton1(false); toast.error(t("errToast:sorry_a_problem_occurred")) }
    })
  }
  const onSubmitPhone = (values) => {
    setLoadingButton2(true);
    forgetPasswordByPhone({
      values: values,
      success: () => { setLoadingButton2(false); router.push(`/auth/enter-phone-code?phone=${values.phone}&forget=true`) },
      error: () => { setLoadingButton2(false); toast.error(t("errToast:sorry_a_problem_occurred")) },
      phone: values.phone
    })
  }

  return (

    <Login noLinksButton contactUs >
      <h1 className="block mb-0 font-bold text-h2 mt-14">{t('i_forgot_the_password')}</h1>
      <span className="block mb-8 text-gray-400 text-md">{isEmail ? t('please_enter_your_email_your_account_to_send_a_code_to_reset_a_new_password') : t("please_enter_your_account_phone_number_to_send_a_icon_to_reset_a_new_password")}</span>
      {
        isEmail ?
          <Formik initialValues={{ email: "" }} onSubmit={onSubmitEmail} validationSchema={() => Yup.object().shape({
            email: Yup.string().email().required(t('please_enter_the_email')),
          })}>
            {(props) => (
              <form onSubmit={props.handleSubmit}>

                <InputIcon icon={<Sms className="text-primary" />}>
                  <Input name="email" type="email" placeholder={t('e_mail')} />
                </InputIcon>
                <ButtonTheme color="primary" as="button" type="submit" block className="my-4 text-center xs:my-2" loading={loadingButton1}>
                  {t('send_the_password_recovery_link')}
                </ButtonTheme>
              </form>
            )}
          </Formik>
          :
          <Formik initialValues={{ phone: "" }} onSubmit={onSubmitPhone} validationSchema={() => Yup.object().shape({
            phone: Yup.number().required(t('please_enter_the_phone')),
          })}>
            {(props) => (
              <form onSubmit={props.handleSubmit}>

                <InputIcon icon={<Call className="text-primary" />}>
                  <InputPhone name="phone" type="tel" placeholder={t('phone_number')} />
                </InputIcon>
                <ButtonTheme color="primary" as="button" type="submit" block className="my-4 text-center xs:my-2" loading={loadingButton2}>
                  {t("send_code")}
                </ButtonTheme>
              </form>
            )}
          </Formik>
      }
      <button className="block w-full mb-10 text-center text-primary"
        onClick={() => setIsEmail(!isEmail)}
      >{isEmail ? t('send_the_code_to_the_phone') : t('send_the_code_to_the_email')}</button>

      <ButtonTheme as="button" color="primary" onClick={() => router.back()} outline size="xs" className="flex items-center gap-2 mx-auto my-4 text-center xs:my-2 w-max" >
        {t('back')}{lang === "ar" ? <ArrowLeft size="15" className="text-inherit" /> : <ArrowRight size="15" className="text-inherit" />}
      </ButtonTheme>

    </Login>
  )
}
ForgetPassword.getLayout = function PageLayout(page) {
  return <>
    {page}
  </>
}

