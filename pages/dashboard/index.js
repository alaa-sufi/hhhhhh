import React, { useState } from 'react'
import { Wallet3, MoneyRecive, MoneySend, CardPos } from 'iconsax-react';
import useTranslation from 'next-translate/useTranslation'
import { CardAccount, FiveSteps, ButtonTheme, LastActivity, CreateAccount, Error, Loading } from "@/ui"
import useSWR, { useSWRConfig } from 'swr'
import { userDemoAccount, userRealAccount } from "apiHandle"
import { WarningModal } from "@/modals"
import { Pagination } from 'rsuite';

export default function Dashboard() {
  const { t, lang } = useTranslation("dashboard")
  const [tab, setTab] = useState(1)
  const [allTrue, setAllTrue] = useState(false)
  const perPage = 8;
  const [paginationDemoPage, setPaginationDemoPage] = useState(1)
  const [paginationRealPage, setPaginationRealPage] = useState(1)
  const [notCompleteModal, setNotCompleteModal] = useState(false)
  const { mutate } = useSWRConfig()
  const handleDeleteDone = (type) => {
    mutate(type === "real" ? userRealAccount() : userDemoAccount())
  }
  const { data: demo, error: errorDemo } = useSWR(userDemoAccount({ perPage: perPage, page: paginationDemoPage }))
  const { data: real, error: errorReal } = useSWR(userRealAccount({ perPage: perPage, page: paginationRealPage }))
  const handleDemoPagination=(page)=>{
    setPaginationDemoPage(page);
    mutate(userDemoAccount({ perPage: perPage, page: page }))
  }
  const handleRealPagination=(page)=>{
    setPaginationRealPage(page);
    mutate(userRealAccount({ perPage: perPage, page: paginationRealPage }))
  }
  if (errorDemo || errorReal) return <Error />
  if (!demo || !real) return <Loading />
  return (
    <>
      <div className="grid grid-cols-3 gap-4 ">
        <div className="col-span-2 ">
          <h1 className="hidden">{t("dashboard")}</h1>
          {/* start main */}
          <section className="p-2 bg-white dark:bg-dark-white rounded-lg md:rounded-xl ">
            <div className="relative flex justify-between mb-10 ">
              <span className={`absolute bg-primary text-white h-full  w-2/5  rounded-xl transition-all duration-150  ease-linear	 ${tab === 1 ? "rtl:right-0 ltr:left-0" : "ltr:right-0 rtl:left-0"}`}></span>
              <button className={` rounded-xl p-6 z-1 text-center w-2/5 ${tab === 1 ? "text-white dark:text-white/100" : "text-balck dark:text-white/70"}`} onClick={() => setTab(1)}>{t("my_demo_accounts")}</button>
              <button className={` rounded-xl p-6 z-1 text-center w-2/5 ${tab === 2 ? "text-white dark:text-white/100" : "text-balck dark:text-white/70"}`} onClick={() => setTab(2)}>{t("my_trading_accounts")}</button>
            </div>

            {/* start cards */}
            {tab === 1 ? <>
              <CreateAccount text={t("create_an_demo_account")} href="/dashboard/demo/create-account" type="demo" />
              {/* demo */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {demo.demo_accounts_Informations.data.length ? demo.demo_accounts_Informations.data.map((data, index) => (
                  <CardAccount type="demo" data={data} key={index} handleDeleteDone={handleDeleteDone} />
                ))
                  :
                  <NoData text={t("there_are_no_demo_accounts_yet")} />
                }
              </div>
             {demo.demo_accounts_Informations.total && <Pagination
                prev
                next
                maxButtons={4}
                size="lg"
                total={4}
                ellipsis={true}
                activePage={paginationDemoPage}
                limit={perPage}
                onChangePage={handleDemoPagination}
              />}
            </>
              :
              <>
                <CreateAccount text={t("create_a_trading_account")} href="/dashboard/real/create-account" type="real" handleOpenModal={() => setNotCompleteModal(true)} allTrue={allTrue} />
                {/* real */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {real.real_accounts_Informations.data.length ? real.real_accounts_Informations.data.map((data, index) => (
                    <CardAccount type="real" data={data} key={index} handleDeleteDone={handleDeleteDone} />
                  ))
                    :
                    <NoData text={t("there_are_no_trading_accounts_yet")} />
                  }
                </div>

              </>
            }
            {/* end cards */}
          </section>
          {/* end main */}
        </div >
        <div>
          {/* start wallet */}
          <section className="p-8 mb-6 bg-white dark:bg-dark-white rounded-lg md:rounded-xl">
            <div className="flex items-center gap-2">
              <div className="icon-container">
                <Wallet3 size="18" className="text-primary" />
              </div>
              <h2 className="m-0 text-sm text-gray-500">{t('current_balance')}</h2>
            </div>
            <strong className="block mt-4 mb-6 text-4xl text-black dark:text-white"><bdi>$</bdi>5,860,00</strong>
            <ButtonTheme color="primary" block size="xs" className="flex items-center justify-center gap-2 mb-4" as="link" href="/dashboard/deposit"><MoneyRecive size="25" className="text-white" /><span>{t('deposit_a_new_amount')}</span></ButtonTheme>
            <ButtonTheme color="primary" block size="xs" className="flex items-center justify-center gap-2 " as="link" href="/dashboard/deposit"><MoneySend size="25" className="text-white" /><span>{t('drag')}</span></ButtonTheme>
          </section>
          {/* end wallet */}
          <FiveSteps />
          <LastActivity />
        </div>
      </div >
      <WarningModal open={notCompleteModal} size="lg" onClose={() => setNotCompleteModal(false)} message={
        <>
          <p className="mb-2 font-bold text-black dark:text-white text-xl">{t("excuse_me_you_cannot_create_a_real_account")}</p>
          <p className="mb-2 font-bold text-black dark:text-white text-xl">{t("you_must_complete_your_profile_information")}</p>
          <ButtonTheme as="link" href="/dashboard/profile/personal/profile-personally" color="primary" className=" px-4 py-2 my-8 block mx-auto w-max">{t("profile")}</ButtonTheme>
        </>
      } />
    </>
  )
}


const NoData = ({ text }) => (
  <div className="text-center py-20 col-span-2">
    <CardPos size="120" className="text-gray-400 mb-4 mx-auto" />
    <p className="font-bold text-3xl text-gray-400">{text}</p>
  </div>
)