import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import Link from "next/link"
import { Progress } from 'rsuite';
import { useRouter } from 'next/router'
import { SmallAside } from "@/ui"
import { Location, ClipboardText, Lock1, Call, ProfileTick, Profile, LocationTick } from 'iconsax-react'
export default function ProfileContainer({ tab, ...props }) {
  const { t, lang } = useTranslation("profile")
  const router = useRouter()
  const percent = 39;
  const navs = [
    { title: t("personal_information"), href: "/dashboard/profile/personal/profile-personly" },
    { title: t("financial_information"), href: "/dashboard/profile/financial-information" },
    { title: t("upload_documents"), href: "/dashboard/profile/upload-documents/confirm-the-address" },
    { title: t("bank_account_and_cards"), href: "/dashboard/profile/bank-account/details_of_the_bank_account" },
  ]
  const roots = {
    personal: [
      { title: t('profile_personly'), icon: <ClipboardText size="18" className="text-primary" />, href: "/dashboard/profile/personal/profile-personly", },
      { title: t('contact_information'), icon: <Lock1 size="18" className="text-primary" />, href: "/dashboard/profile/personal/contact-information", },
      { title: t('headlines'), icon: <Call size="18" className="text-primary" />, href: "/dashboard/profile/personal/headlines", },
      { title: t('safety_and_password'), icon: <Location size="18" className="text-primary" />, href: "/dashboard/profile/personal/safety-and-password", },
    ],
    uploadDocuments: [
      { title: t('identification_confirmation'), icon: <ProfileTick size="18" className="text-primary" />, href: "/dashboard/profile/upload-documents/identification-confirmation", },
      { title: t('confirm_the_address'), icon: <LocationTick size="18" className="text-primary" />, href: "/dashboard/profile/upload-documents/confirm-the-address", },
    ],
    bankAccount: [
      { title: t('details_of_the_bank_account'), icon: <ProfileTick size="18" className="text-primary" />, href: "/dashboard/profile/bank-account/details_of_the_bank_account", },
      { title: t('payment_cards'), icon: <LocationTick size="18" className="text-primary" />, href: "/dashboard/profile/bank-account/payment_cards", },
    ]
  }
  return (
    <>
      <div className="p-8 bg-white rounded-lg md:rounded-xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 mb-6 ">
            <div className=" icon-container">
              <Profile size="25" className="text-primary" />
            </div>
            <h1 className="block text-3xl font-bold text-black">{t("profile_personly")}</h1>
          </div>
          <div className="max-w-full mx-auto w-120">
            <span className="block mx-4 -my-2 text-xs text-gray-400">{percent < 100 ? t("your_account_information_is_not_completed") : t("your_account_information_is_completed")}</span>
            <Progress.Line percent={percent} status={percent < 100 ? "active" : "success"} strokeColor={percent < 100 ? "var(--primary-color)" : "var(--success-color)"} trailColor="var(--secondary-color)" />
          </div>
        </div>
        <div className="relative flex justify-between mb-0 bg-secondary p-[6px] rounded-xl">
          {navs.map((nav, index) => (
            <Link key={index} href={nav.href}  ><a className={` rounded-xl py-5 z-1 text-center text-lg w-1/4 ${router.pathname.startsWith(nav.href.split("/").splice(0,4).join("/")) ? "text-black bg-white" : "text-gray-400"}`}>{nav.title}</a></Link>
          ))}
        </div>
      </div>
      <div className="bg-white ">
        <div className={`${tab && "grid grid-cols-11"}`}>
          {tab && <SmallAside roots={roots[`${tab}`]} className="col-span-3 rtl:border-l ltr:border-r border-gray-300 rtl:pl-4 ltr:pr-4" />}
          <div className={`${tab && "col-span-8"} px-8`}>
            {props.children}
          </div>
        </div>
      </div>
    </>
  )
}
