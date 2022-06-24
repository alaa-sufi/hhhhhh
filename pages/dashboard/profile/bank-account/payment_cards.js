import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ProfileContainer } from "@/container"
import { Location, ClipboardText, Lock1, Call, Add } from 'iconsax-react'
import { CardAccountTop } from "@/ui"
import Link from "next/link"

import { VisaIcon } from "public/svg"


export default function ConfirmTheAddress() {
    const { t, lang } = useTranslation("profile")

    return (
        <ProfileContainer tab={"bankAccount"}>
            <div className=" mx-auto">
                <h1 className="text-gray-600 text-xl mb-4 mt-8">{t("your_payment_card")}</h1>
                <div className="grid grid-cols-2 gap-10">
                    <CreateBankAccount text={t("add_a_new_card")} href="/" />
                    <CardAccountVisa color="bg-[#505BBD]" />
                    <CardAccountVisa color="bg-[#DD4A90]" />
                    <CardAccountVisa color="bg-[#C58448]" />
                </div>
            </div>
        </ProfileContainer>
    )
}
const CreateBankAccount = ({ text, href }) => {
    return (
        <div className="relative flex items-center justify-center border-4 border-dashed border-primary bg-primary-300 rounded-xl ">

            <Link href={href}>
                <a className="relative flex flex-col items-center w-full p-4 text-xl rounded-xl text-primary">
                    <Add
                        size="60"
                        className="text-primary mb-4"
                    />
                    <span className="text-xl"> 
                        {text}
                    </span>
                </a>
            </Link>
        </div>
    )
}
const CardAccountVisa = ({ color }) => {
    const { t, lang } = useTranslation("profile")
    return (
        <div className={`text-white relative select-none`}>
            <div className={`${color} py-5 px-6 rounded-t-xl`}>
                <div className="mb-8 flex justify-between items-center">
                    <VisaIcon />
                    <button className="bg-white dark:bg-dark-white text-[#E30000] rounded-xl px-2 py-4 text-5xl leading-1">&times;</button>
                </div>
                <span className="block   text-gray-400">{t("card_number")}</span>
                <bdi className="block  text-4xl ">5468   7912   ***   ****</bdi>
            </div>
            <ul className={`${color} opacity-75 flex justify-between py-5 px-6 rounded-b-xl`}>
                <li>
                    <h6 className="text-sm  text-slate-300">cvv</h6>
                    <span className="text-base ">195</span>
                </li>

                <li>
                    <h6 className="text-sm  text-slate-300">{t("date")}</h6>
                    <span className="text-base ">8 /2018</span>
                </li>
            </ul>
        </div>
    )
}