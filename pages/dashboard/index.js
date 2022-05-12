import React, { useState } from 'react'
import { Wallet3, MoneyRecive, MoneySend, Login, Add} from 'iconsax-react';
import useTranslation from 'next-translate/useTranslation'
import ButtonTheme from '@/ui/ButtonTheme';
import Link from "next/link"
import {DashedBorder } from "public/svg"
import CardAccount from "@/ui/CardAccount"
export default function Dashboard() {
  const { t, lang } = useTranslation()
  const [tab, setTab] = useState(1)
  return (
    <div className="grid grid-cols-3 gap-4 ">
      <div className="col-span-2 ">
        {/* start main */}
        <section className="p-2 bg-white rounded-lg md:rounded-xl ">
          <div className="relative flex justify-between mb-10 ">
            <span className={`absolute bg-primary text-white h-full  w-2/5  rounded-xl transition-all duration-150  ease-linear	 ${tab === 1 ? "rtl:right-0 ltr:left-0" : "ltr:right-0 rtl:left-0"}`}></span>
            <button className={` rounded-xl p-6 z-1 text-center w-2/5 ${tab === 1 && "text-white"}`} onClick={() => setTab(1)}>{t("dashboard:my_experimental_accounts")}</button>
            <button className={` rounded-xl p-6 z-1 text-center w-2/5 ${tab === 2 && "text-white"}`} onClick={() => setTab(2)}>{t("dashboard:my_trading_accounts")}</button>
          </div>
          {/* start create_an_experimental_account */}
          <div className="relative mb-10">
           <DashedBorder/>
            <Link href="/">
              <a className="flex flex-col items-center w-full p-4 text-xl rounded-xl text-primary">
                <Add
                  size="50"
                  className="text-primary"
                />

                <span>
                  {t("dashboard:create_an_experimental_account")}
                </span>
              </a>
            </Link>
          </div>
          {/* end create_an_experimental_account */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            {Array.from({ length: Number.parseInt(4) }, (item, index) => (
              <CardAccount/>
            ))}
          </div>
        </section>
        {/* end main */}
      </div>
      <div>
        {/* start wallet */}
        <section className="p-8 mb-6 bg-white rounded-lg md:rounded-xl">
          <div className="flex items-center gap-1">
            <div className="icon-container">
              <Wallet3 size="18" className="text-primary" />
            </div>
            <h2 className="m-0 text-sm text-gray-500">{t('dashboard:current_balance')}</h2>
          </div>
          <strong className="block mt-4 mb-6 text-4xl text-black"><bdi>$</bdi>5,860,00</strong>
          <ButtonTheme color="primary" block className="flex items-center justify-center gap-1 p-4 mb-4 rounded-2xl" as="link" href="/"><MoneyRecive size="20" className="text-white" />{t('dashboard:deposit_a_new_amount')}</ButtonTheme>
          <ButtonTheme outline color="primary" block className="flex items-center justify-center gap-1 p-4 mb-4 rounded-2xl" as="link" href="/"><MoneySend size="20" className="text-primary" />{t('dashboard:drag')}</ButtonTheme>
        </section>
        {/* end wallet */}
        {/* start  5 steps  */}
        <section className="p-8 mb-6 text-white rounded-lg bg-gradient-to-bl from-primary to-rose-500 md:rounded-xl">
          <h2 className="mb-6 text-3xl font-normal">{t("dashboard:with_5_simple_steps_start_trading")}</h2>
          <Link href="/"><a className="flex justify-end gap-1 text-white">{t("dashboard:start_now")} <Login className="text-white transform rotate-180" size="20" /></a></Link>
        </section>
        {/* end  5 steps  */}
        {/* start your_last_activity */}
        <section className="p-8 mb-6 bg-white rounded-lg md:rounded-xl">
          <h2 className="mb-6 text-sm text-gray-500">{t('dashboard:your_last_activity')}</h2>
          <ul className="p-0 m-0">
            {Array.from({ length: Number.parseInt(3) }, (item, index) => (
              <li className="flex items-start gap-1 " key={index}>
                <div className="mb-2 icon-container">
                  <Wallet3 size="18" className="text-primary" />
                </div>
                <div>
                  <h3 className="mb-0 text-sm leading-none">ايداع مبلغ 320$ في حسابك</h3>
                  <span className="text-xs text-gray-400">منذ 2 ساعة</span>
                </div>
              </li>
            ))}

          </ul>

        </section>
        {/* end your_last_activity */}

      </div>
    </div>
  )
}
