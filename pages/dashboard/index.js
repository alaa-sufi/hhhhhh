import React, { useState } from 'react'
import { Wallet3, MoneyRecive, MoneySend, Login, Add } from 'iconsax-react';
import useTranslation from 'next-translate/useTranslation'
import ButtonTheme from '@/ui/ButtonTheme';
import Link from "next/link"

export default function Dashboard() {
  const { t, lang } = useTranslation()
  const [tab, setTab] = useState(1)
  return (
    <div className="grid gap-4 grid-cols-3 ">
      <div className=" col-span-2 ">
        {/* start main */}
        <section className="bg-white rounded-lg md:rounded-xl p-2  ">
          <div className="flex justify-between relative mb-10 ">
            <span className={`absolute bg-primary text-white h-full  w-2/5  rounded-xl transition-all duration-150  ease-linear	 ${tab === 1 ? "rtl:right-0 ltr:left-0" : "ltr:right-0 rtl:left-0"}`}></span>
            <button className={` rounded-xl p-6 z-1 text-center w-2/5 ${tab === 1 && "text-white"}`} onClick={() => setTab(1)}>{t("dashboard:my_experimental_accounts")}</button>
            <button className={` rounded-xl p-6 z-1 text-center w-2/5 ${tab === 2 && "text-white"}`} onClick={() => setTab(2)}>{t("dashboard:my_trading_accounts")}</button>
          </div>
          {/* start create_an_experimental_account */}
          <div className="relative mb-10">
            <svg xmlns="http://www.w3.org/2000/svg" width={760} height={157} viewBox="0 0 760 157" fill="none" className="w-full absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2" >
              <rect x={1} y={1} width={758} height={155} rx={19} style={{ stroke: 'var(--primary-color)' }} strokeWidth={2} strokeDasharray="15 15" />
            </svg>
            <Link href="/">
              <a className="w-full p-4 rounded-xl flex flex-col  items-center text-xl text-primary">
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
            <div className="col-span1" key={index}>
              <div className="bg-[#F1F0F0]  rounded-xl  ">
                <div className="bg-[#2980B9] p-4 rounded-xl text-white">
                  card
                </div>
                <div className=" p-4">body</div>
              </div>
            </div>
          ))}
          </div>
        </section>
        {/* end main */}
      </div>
      <div>
        {/* start wallet */}
        <section className="bg-white rounded-lg md:rounded-xl p-8 mb-6">
          <div className="flex gap-1 items-center">
            <div className="icon-container">
              <Wallet3 size="18" className="text-primary" />
            </div>
            <h2 className="text-sm text-gray-500 m-0">{t('dashboard:current_balance')}</h2>
          </div>
          <strong className="text-4xl mb-6 text-black block mt-4"><bdi>$</bdi>5,860,00</strong>
          <ButtonTheme color="primary" block className="mb-4 flex gap-1 justify-center items-center p-4 rounded-2xl" as="link" href="/"><MoneyRecive size="20" className="text-white" />{t('dashboard:deposit_a_new_amountmount')}</ButtonTheme>
          <ButtonTheme outline color="primary" block className="mb-4 flex gap-1 justify-center items-center p-4 rounded-2xl" as="link" href="/"><MoneySend size="20" className="text-primary" />{t('dashboard:drag')}</ButtonTheme>
        </section>
        {/* end wallet */}
        {/* start  5 steps  */}
        <section className=" bg-gradient-to-bl from-primary  to-rose-500 rounded-lg md:rounded-xl p-8 mb-6 text-white">
          <h2 className="text-4xl font-normal mb-6">{t("dashboard:with_5_simple_steps_start_trading")}</h2>
          <Link href="/"><a className="flex gap-1 justify-end text-white">{t("dashboard:start_now")} <Login className="text-white transform  rotate-180" size="20" /></a></Link>
        </section>
        {/* end  5 steps  */}
        {/* start your_last_activity */}
        <section className="bg-white rounded-lg md:rounded-xl p-8 mb-6">
          <h2 className="text-sm text-gray-500 mb-6">{t('dashboard:your_last_activity')}</h2>
          <ul className="m-0 p-0">
            {Array.from({ length: Number.parseInt(3) }, (item, index) => (
              <li className="flex gap-1 items-start " key={index}>
                <div className="icon-container mb-2">
                  <Wallet3 size="18" className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm mb-0 leading-none">ايداع مبلغ 320$ في حسابك</h3>
                  <span className="text-gray-400 text-xs">منذ 2 ساعة</span>
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
