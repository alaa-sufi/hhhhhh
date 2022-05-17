import React , { useState}  from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Setting4, ArrowLeft } from 'iconsax-react';
import ChangeLeverageModal from "@/modals/ChangeLeverageModal"
import DoneModal from "@/modals/DoneModal"
import DeleteAccountModal from "@/modals/DeleteAccountModal"
import Link from "next/link"
import ButtonTheme from "@/ui/ButtonTheme"
import CardAccountTop from "@/ui/CardAccountTop"
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Input, InputIcon, CustumnCheckbox } from "@/form"
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
const handleSubmit = (values) => {
  console.log(values);
};
export default function AccountInformation() {
  const { t, lang } = useTranslation()
  const [changeLeverage ,setChangeLeverage] = useState(false)
  const [done ,setDone] = useState(false)
  const [deleteAccount ,setDeleteAccount] = useState(false)
  return (
      <>
    <div className="p-8 bg-white rounded-lg md:rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <div className=" icon-container">
            <Setting4 size="25" className="text-primary" />
          </div>
          <h1 className="block text-3xl font-bold text-black">{t("dashboard:account_settings_information")}</h1>
        </div>
        <Link href="/dashboard" >
          <a className="p-2 border border-primary rounded-xl">
            <ArrowLeft size="25" className="text-primary " />
          </a>
        </Link>
      </div>
    </div >
    <button onClick={()=>setChangeLeverage(true)}>ChangeLeverageModal</button>{" "}
    <button onClick={()=>setDone(true)}>DoneModal</button>{" "}
    <button onClick={()=>setDeleteAccount(true)}>DeleteAccountModal</button>{" "}
    <ChangeLeverageModal open={changeLeverage} onClose={()=>setChangeLeverage(false)}/>
    <DoneModal open={done} onClose={()=>setDone(false)}  shiny="$1998" account="103568"/>
    <DeleteAccountModal open={deleteAccount} onClose={()=>setDeleteAccount(false)}  onDelete={()=>{}}/>
    
      </>
  )
}
