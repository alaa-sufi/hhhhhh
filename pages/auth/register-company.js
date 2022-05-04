
import { useState } from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon ,InputCity , InputPhone} from "@/form"
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse , Sms, Lock,Eye, EyeSlash , Flag , Call } from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import { Formik } from "formik";
import * as Yup from "yup";

export default function RegisterCompany() {
  const { t, lang } = useTranslation()
  const [passwordType ,setPasswordType] = useState(true)

  const onSubmit = (values) => {
    console.log(values)
  }
 
  return (
    <Login slider>
      <span className="mb-3 text-gray-400 text-md">{t('auth:Welcom_to_us')}</span>
      <h1 className="mb-8 font-bold text-h2">{t('auth:register_company_title')}</h1>
      <Formik initialValues={{ name: "", email: "", city: "", password:"" }} onSubmit={onSubmit} validationSchema={() => Yup.object().shape({
        name: Yup.string().required("يرجى ادخال الاسم"),
        email: Yup.string().email().required('يرجى كتابة كلمة الايميل.'),
        city: Yup.string().email().required('يرجى اختيار مدينة '),
        password: Yup.string().required('يرجى  ادخال كلمة المرور ')
      })}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputIcon icon={<Courthouse className="text-primary"/>}>
              <Input name="name" type="text" placeholder="الأسم القانوني للشركة"  />
            </InputIcon>
            <InputIcon icon={<Sms className="text-primary"/>}>
              <Input name="email" type="text" placeholder="البريد الألكتروني"  />
            </InputIcon>
            <InputIcon icon={<Call className="text-primary"/>}>
            <InputPhone name="phone" type="text" placeholder="رقم الهاتف"  />

              {/* <InputPhone name="city" type="text" placeholder="اسم المدينة" />          */}
            </InputIcon> 
            <InputIcon icon={<Lock className="text-primary"/>}>
            <span  role="button" className="absolute transform top-4 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 " onClick={()=>setPasswordType(!passwordType)}>
                {passwordType ? <Eye /> : <EyeSlash />}
              </span>
              <Input name="password" type={passwordType ? "password" : "text"} placeholder="كلمة السر"  />
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
RegisterCompany.getLayout = function PageLayout(page) {
  return <>
    {page}
  </>
}


