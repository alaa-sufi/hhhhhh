
import {useState} from "react"
import Login from "@/ui/short/auth";
// import { Input, InputIcon } from "@/form"
// import { ShowPassword, HidePassword, User } from "public/svg"
import useTranslation from 'next-translate/useTranslation'

import { Formik } from "formik";
import * as Yup from "yup";
export default function LoginPage() {
  const [passwordType ,setPasswordType] = useState(true)
  const { t, lang } = useTranslation()

  const onSubmit = (values) => {
    console.log(values)
  }
  return (
    <Login slider>
      <span>{t('auth:welcome')}</span>
      <h1>{t('auth:register-company-title')}</h1>
      {/* <Formik initialValues={{ name: "", password: "" }} onSubmit={onSubmit} validationSchema={() => Yup.object().shape({
        name: Yup.string().required("يرجى ادخال الاسم"), password: Yup.string().required('يرجى كتابة كلمة المرور.')
      })}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputIcon icon="user">
              <Input name="name" type="text" placeholder="اسم المستخدم"  />
            </InputIcon>
            <InputIcon icon="password">
              <span  role="button" className="absolute transform top-4 rtl:left-4 ltr:right-4 rtl:md:left-3 ltr:md:right-3 " onClick={()=>setPasswordType(!passwordType)}>
                {passwordType ? <ShowPassword width="20"/> : <HidePassword width="20"/>}
              </span>
              <Input name="password" type={passwordType ? "password" : "text"} placeholder="كلمة المرور"  />
            </InputIcon>
            <button type="submit" className="block mx-auto mt-16 md:mt-24 button big">متابعة</button>
          </form>
        )}
      </Formik> */}
    </Login>
  )
}
LoginPage.getLayout = function PageLayout(page) {
  return <>
    {page}
  </>
}

