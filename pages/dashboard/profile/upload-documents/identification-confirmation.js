import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ProfileContainer } from "@/container"
import { ID, Passport, DrivingCard } from "public/svg"
import { Verify } from 'iconsax-react'
export default function IdentificationConfirmation() {
  const { t, lang } = useTranslation("profile")
  const [choose, setChoose] = useState()
  const options = [
    { title: t("passport"), icon: <Passport /> },
    { title: t("id"), icon: <ID /> },
    { title: t("driving_card"), icon: <DrivingCard /> },
  ]
  const roles = [
    , t("your_personal_picture")
    , t("your_full_name")
    , t("date_of_birth")
    , t("expiration_date")
    , t("card_number")
    , t("your_birthplace")
  ]
  const done = false;
  return (
    <ProfileContainer tab={"uploadDocuments"}>
      {!done ?
        <>
        {!choose ? <>
          <h1 className="text-center text-2xl mb-8">{t("choose_how_to_confirm_your_personal_identity")}</h1>
          <ul className="flex justify-between gap-6 mb-10">
            {options.map((option, index) => (
              <li key={index} className="bg-secondary rounded-xl w-full text-center flex justify-center items-center">
                <button className=" py-6 px-8" onClick={()=>{setChoose(index)}}>
                  <div className="mb-4 text-primary">{option.icon}</div>
                  <div className="text-xl">{option.title} </div>
                </button>
              </li>
            ))}
          </ul>
        </>
        :
        <>
          <h1 className="text-center text-2xl mb-8">{t("we_need_to_confirm_your_identity")}</h1>
          
        </>
         }
         
          <h2 className="text-lg mb-6">{t("make_sure_the_following_information_is_clearly_showing")}</h2>
          <div className="mb-10">
            <ul className="grid grid-cols-5">
              {roles.slice(0, 4).map((role, index) => (
                <li key={index} className="mx-4 mb-6  text-xs  relative before:bg-primary before:rounded-full before:w-3 before:h-3 before:absolute  rtl:before:-right-5 ltr:before:-left-5 before:top-1/2 before:transform before:-translate-y-1/2">{role}</li>
              ))}
            </ul>
            <ul className="grid grid-cols-5  ">
              {roles.slice(-3).map((role, index) => (
                <li key={index} className="mx-4 mb-6  text-xs  relative before:bg-primary before:rounded-full before:w-3 before:h-3 before:absolute  rtl:before:-right-5 ltr:before:-left-5 before:top-1/2 before:transform before:-translate-y-1/2">{role}</li>
              ))}
            </ul>
          </div>
        </>
        :
  <div>
    <Verify size="170" className="mx-auto mb-10 text-success more-linear" />
    <p className='text-center mb-8 text-lg font-bold w-[380px] mx-auto'>{t("fabulous_the_files_will_be_reviewed_by_our_team_and_we_inform_you_in_the_event_of_approval_or_re_upload_a_document")}</p>
  </div>
}
    </ProfileContainer >
  )
}
