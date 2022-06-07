import React, { useState } from 'react'
import { Wallet3, MoneyRecive, MoneySend, Add } from 'iconsax-react';
import useTranslation from 'next-translate/useTranslation'
import Link from "next/link"
import { DashedBorder } from "public/svg"
import {CardAccount ,FiveSteps ,ButtonTheme ,LastActivity} from "@/ui"

export default function Dashboard() {
  const { t, lang } = useTranslation("dashboard")
  const [tab, setTab] = useState(1)
  return (
    <div className="grid grid-cols-3 gap-4 ">
      <div className="col-span-2 ">
        <h1 className="hidden">{t("dashboard")}</h1>
        {/* start main */}
        <section className="p-2 bg-white rounded-lg md:rounded-xl ">
          <div className="relative flex justify-between mb-10 ">
            <span className={`absolute bg-primary text-white h-full  w-2/5  rounded-xl transition-all duration-150  ease-linear	 ${tab === 1 ? "rtl:right-0 ltr:left-0" : "ltr:right-0 rtl:left-0"}`}></span>
            <button className={` rounded-xl p-6 z-1 text-center w-2/5 ${tab === 1 && "text-white"}`} onClick={() => setTab(1)}>{t("my_experimental_accounts")}</button>
            <button className={` rounded-xl p-6 z-1 text-center w-2/5 ${tab === 2 && "text-white"}`} onClick={() => setTab(2)}>{t("my_trading_accounts")}</button>
          </div>

          {/* start cards */}
          {tab === 1 ? <>
          <CreatAccount text={t("create_an_experimental_account")} href="/dashboard/experimental/create-account"/>
            {/* experimental */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {Array.from({ length: Number.parseInt(4) }, (item, index) => (
                <CardAccount  type="experimental" key={index}/>
              ))}
            </div>
          </>
            :
            <>
          <CreatAccount text={t("create_a_trading_account")} href="/dashboard/trading/create-account"/>
              {/* real */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {Array.from({ length: Number.parseInt(4) }, (item, index) => (
                  <CardAccount type="trading" key={index}/>
                ))}
              </div>
            </>
          }
          {/* end cards */}
        </section>
        {/* end main */}
      </div >
      <div>
        {/* start wallet */}
        <section className="p-8 mb-6 bg-white rounded-lg md:rounded-xl">
          <div className="flex items-center gap-1">
            <div className="icon-container">
              <Wallet3 size="18" className="text-primary" />
            </div>
            <h2 className="m-0 text-sm text-gray-500">{t('current_balance')}</h2>
          </div>
          <strong className="block mt-4 mb-6 text-4xl text-black"><bdi>$</bdi>5,860,00</strong>
          <ButtonTheme color="primary" block size="xs" className="flex items-center justify-center gap-2 mb-4" as="link" href="/dashboard/deposit"><MoneyRecive size="25" className="text-white" /><span>{t('deposit_a_new_amount')}</span></ButtonTheme>
          <ButtonTheme color="primary" block size="xs" className="flex items-center justify-center gap-2 " as="link" href="/dashboard/deposit"><MoneySend size="25" className="text-white" /><span>{t('drag')}</span></ButtonTheme>
        </section>
        {/* end wallet */}
        <FiveSteps/>
        <LastActivity/>
      </div>
    </div >
  )
}


 function CreatAccount({text , href}){
  return (
    <div className="relative flex items-center justify-center mb-14">
    <DashedBorder />
    <Link href={href}>
      <a className="relative flex flex-col items-center w-full p-4 text-xl rounded-xl text-primary">
        <Add
          size="50"
          className="text-primary"
        />
        <span>
          {text}
        </span>
      </a>
    </Link>
  </div>
  )
}