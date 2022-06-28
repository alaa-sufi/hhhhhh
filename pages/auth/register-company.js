
import { useState } from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon ,InputCity , InputPhone ,InputCheck} from "@/form"
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse , Sms, Lock,Eye, EyeSlash , Flag , Call } from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import { Formik } from "formik";
import * as Yup from "yup";
import {register} from "apiHandle"
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function RegisterCompany() {
  const { t , lang } = useTranslation("auth")
  const [passwordType ,setPasswordType] = useState(true)
  const [loadingButton, setLoadingButton] = useState(false)
  const router = useRouter()

    const onSubmit = (values) => {
      setLoadingButton(true);
      register({
       values : values,
       success : ()=>{setLoadingButton(false); router.push("/auth/login-company");},
       error : ()=>setLoadingButton(false),
       })
    }
 
  return (
    <>
       <Head>
        <title>{t("create_a_account")} | {t("common:website_name")}</title>
      </Head>
    <Login slider>
      <span className="block mt-10 mb-2 text-gray-400 text-md">{t('welcom_to_us')}</span>
      <h1 className="mb-8 font-bold leading-none text-h2">{t('register_company_title')}</h1>
      <Formik initialValues={{ name: "", email: "", country: "", password:"" , agree:false , type:"company"}} onSubmit={onSubmit} validationSchema={() => Yup.object().shape({
        name: Yup.string().required(t('please_enter_the_name')),
        email: Yup.string().email().required(t('please_enter_the_email')),
        country: Yup.string().required(t('please_enter_the_city')),
        password: Yup.string().required(t("please_write_the_password")).min(8, t("the_password_should_not_be_less_than_eight_letters"))
    .max(12, t("the_password_should_not_exceed_twelve_letters")).matches(/[a-z]/, t("the_password_must_contain_letters") ).matches(/[1-9]/,t("the_password_must_contain_numbers") ),
        agree: Yup.bool().required().oneOf([true],t('please_agree'))

      })}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputIcon icon={<Courthouse className="text-primary"/>}>
              <Input name="name" type="text" placeholder={t('the_legal_name_of_the_company')}  />
            </InputIcon>
            <InputIcon icon={<Sms className="text-primary"/>}>
              <Input name="email" type="text" placeholder={t('e_mail')}  />
            </InputIcon>
            <InputIcon icon={<Flag className="text-primary"/>}>
              <InputCity name="country" type="text" placeholder={t('residence')} />         
            </InputIcon> 
            <InputIcon icon={<Lock className="text-primary"/>}>
            <span  role="button" className="absolute transform top-4 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 " onClick={()=>setPasswordType(!passwordType)}>
                {passwordType ? <Eye className="text-black dark:text-white"/> : <EyeSlash className="text-black dark:text-white"/>}
              </span>
              <Input name="password" type={passwordType ? "password" : "text"} placeholder={t('password')} dir={lang === "ar" ? "rtl" : "ltr"} className="password"/>
            </InputIcon>  
            <InputCheck name="agree" text={<span className="text-xs">{t('by_clicking_on_the_box_i_acknowledge_that_i_read_the_work_agreement_the_privacy_policy_and_the_conditions_of_the_company_and_i_agree_with_it_and_this_is_considered_an_electronic_signature_by_me')}</span>} >
           </InputCheck>
         
            <ButtonTheme color="primary" as="button" type="submit"  size="md" block className="my-6 text-center xs:my-4" loading={loadingButton}>
              {t('create_account')}
            </ButtonTheme>
          </form>
        )}
      </Formik>
      <ButtonTheme color="primary" outline as="link" href="/auth/login-company" size="xs" block className="mt-6 text-center xs:my-4">
        {t('i_have_an_account_log_in')}
      </ButtonTheme>
    </Login>
    </>
  )
}
RegisterCompany.getLayout = function PageLayout(page) {
  return <>
    {page}
  </>
}


