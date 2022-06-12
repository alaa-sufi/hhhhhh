import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ProfileContainer } from "@/container"
import {BankAccountStatement, Bill ,Otherthing } from "public/svg"
export default function FinancialInformation() {
  const { t, lang } = useTranslation("profile")
  const options = [
    { title:  t("bank_account_statement"), icon: <BankAccountStatement/> },
    { title:  t("bill"), icon: <Bill/> },
    { title:  t("another_thing"), icon: <Otherthing/> },
  ]
  const roles = [
    , t("date")
    , t("your_full_name")
    , t("home_adress")
    , t("the_name_issued_by_the_document")
  ]
  return (
    <ProfileContainer tab={"uploadDocuments"}>
      <h1 className="text-center text-2xl mb-8">{t("choose_how_to_confirm_your_personal_identity")}</h1>
      <ul className="flex justify-between gap-6 mb-10">
        {options.map((option, index) => (
          <li key={index} className="bg-secondary rounded-xl w-full text-center flex justify-center items-center">
            <button className=" py-6 px-8">
            <div className="mb-4 text-primary">{option.icon}</div>
            <div className="text-xl">{option.title} </div>
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-lg mb-6">{t("make_sure_the_following_information_is_clearly_showing")}</h2>
      <div className="mb-10">
      <ul className="grid grid-cols-5">
        {roles.slice(0,3).map((role, index) => (
          <li key={index} className="mx-4 mb-6  text-xs  relative before:bg-primary before:rounded-full before:w-3 before:h-3 before:absolute  rtl:before:-right-5 ltr:before:-left-5 before:top-1/2 before:transform before:-translate-y-1/2">{role}</li>
        ))}
        </ul>
        <ul className="grid grid-cols-5  ">
        {roles.slice(-2).map((role, index) => (
          <li key={index} className="mx-4 mb-6  text-xs  relative before:bg-primary before:rounded-full before:w-3 before:h-3 before:absolute  rtl:before:-right-5 ltr:before:-left-5 before:top-1/2 before:transform before:-translate-y-1/2">{role}</li>
        ))}
      </ul>
      </div>
    </ProfileContainer>
  )
}
