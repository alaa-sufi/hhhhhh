import React, { useState, useEffect } from 'react'
import { Wallet3, MoneyRecive, MoneySend } from 'iconsax-react';
import useTranslation from 'next-translate/useTranslation'
import { CardAccount, FiveSteps, ButtonTheme, LastActivity, CreateAccount, Error, Loading , NoData} from "@/ui"
import useSWR, { useSWRConfig } from 'swr'
import { userDemoAccount, userRealAccount } from "apiHandle"
import { WarningModal } from "@/modals"
import { Pagination } from 'rsuite';
import { useRouter } from 'next/router';
export default function Dashboard() {
  const { t, lang } = useTranslation("dashboard")
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const [allTrue, setAllTrue] = useState(false)
  const perPage = 8;
  const [paginationDemoPage, setPaginationDemoPage] = useState()
  const [paginationRealPage, setPaginationRealPage] = useState()
  const [tab, setTab] = useState()
  const [notCompleteModal, setNotCompleteModal] = useState(false)
  useEffect(() => {
    if(router){
      setPaginationDemoPage(+router.query.demoPage || 1)
      setPaginationRealPage(+router.query.realPage || 1)
      setTab(+router.query.tab===2 ? 2 : 1)
    }
  }, [router])
  const handleDeleteDone = (type) => {
    mutate(type === "real" ? userRealAccount() : userDemoAccount())
  }
  const { data: demo, error: errorDemo } = useSWR(userDemoAccount({ perPage: perPage, page: paginationDemoPage }))
  const { data: real, error: errorReal } = useSWR(userRealAccount({ perPage: perPage, page: paginationRealPage }))
  const handleDemoPagination = (page) => {
    router.push(`?demoPage=${page}`)
    setPaginationDemoPage(page);
    mutate(userDemoAccount({ perPage: perPage, page: page }))
  }
  const handleRealPagination = (page) => {
    router.push(`?realPage=${page}`)
    setPaginationRealPage(page);
    mutate(userRealAccount({ perPage: perPage, page: paginationRealPage }))
  }
  const handleRealFixed = () => {
    mutate(userRealAccount({ perPage: perPage, page: paginationRealPage }))
  }
  const handleDemoFixed = () => {
    mutate(userDemoAccount({ perPage: perPage, page: paginationDemoPage }))
  }


  return (
    <>
      <div className="grid grid-cols-3 gap-4 ">
        <div className="col-span-2 ">
          <h1 className="hidden">{t("dashboard")}</h1>
          {/* start main */}
          <section className="p-2 bg-white dark:bg-dark-white rounded-lg md:rounded-xl ">
            <div className="relative flex justify-between mb-10 ">
              <span className={`absolute bg-primary text-white h-full  w-2/5  rounded-xl transition-all duration-150  ease-linear	 ${tab === 1 ? "rtl:right-0 ltr:left-0" : "ltr:right-0 rtl:left-0"}`}></span>
              <button className={` rounded-xl p-6 z-1 text-center w-2/5 ${tab === 1 ? "text-white dark:text-white/100" : "text-balck dark:text-white/70"}`} onClick={() => { setTab(1); router.push(`?tab=1`) }}>{t("my_demo_accounts")}</button>
              <button className={` rounded-xl p-6 z-1 text-center w-2/5 ${tab === 2 ? "text-white dark:text-white/100" : "text-balck dark:text-white/70"}`} onClick={() => { setTab(2); router.push(`?tab=2`) }}>{t("my_trading_accounts")}</button>
            </div>

            {/* start cards */}
            {tab === 1 ? <>
              <CreateAccount text={t("create_an_demo_account")} href="/dashboard/demo/create-account" type="demo" />
              {/* demo */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {errorDemo ? <Error /> :
                  !demo ? <Loading /> :
                    demo.demo_accounts_Informations.data.length ? demo.demo_accounts_Informations.data.map((data, index) => (
                      <CardAccount type="demo" data={data} key={index} handleDeleteDone={handleDeleteDone} handelFixed={handleDemoFixed}/>
                    ))
                      :
                      <NoData text={t("there_are_no_demo_accounts_yet")} />
                }
              </div>
              {(demo && !errorDemo && (demo.demo_accounts_Informations.total > perPage)) && <Pagination
                prev
                next
                maxButtons={4}
                size="lg"
                total={+demo.demo_accounts_Informations.total}
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
                  {errorReal ? <Error /> :
                    !real ? <Loading /> :
                      real.real_accounts_Informations.data.length ? real.real_accounts_Informations.data.map((data, index) => (
                        <CardAccount type="real" data={data} key={index} handleDeleteDone={handleDeleteDone}  handelFixed={handleRealFixed}/>
                      ))
                        :
                        <NoData text={t("there_are_no_trading_accounts_yet")} />
                  }
                </div>
                 {(real && !errorReal && (real.real_accounts_Informations.total > perPage)) && <Pagination
                prev
                next
                maxButtons={4}
                size="lg"
                total={+real.real_accounts_Informations.total }
                ellipsis={true}
                activePage={paginationRealPage}
                limit={perPage}
                onChangePage={handleRealPagination}
              />}

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


