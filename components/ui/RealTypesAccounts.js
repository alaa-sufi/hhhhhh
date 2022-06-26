import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Correct } from "public/svg"
import Image from "next/image"
import {  Error, Loading } from "@/ui"


export default function RealTypesAccounts({ data, error, accountType, setAccountType, change, setChange }) {
    const { t } = useTranslation("dashboard")

    if (error) return <Error />
    if (!data) return <Loading />
    return (
        data.accountsTypes.length && data.accountsTypes.map((plan, index) => (
            <div key={index} className="px-8 py-6 my-4 bg-secondary dark:bg-dark-secondary  rounded-xl">
                <div className="flex gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 p-1 rounded-full bg-primary aspect-square">
                        <Image alt={plan.account_name} src={`${process.env.hostImage}/${plan.image}`} width="30" height="30"  />
                    </div>
                    <h3 className="mt-1 text-3xl text-black dark:text-white capitalize">{plan.account_name}<br /><span className="block text-xs text-center text-gray-400 ">{t("starting_from")}</span></h3>
                </div>
                <div className="mb-10 text-center">
                    <bdi><span className="text-3xl font-black text-black dark:text-white">{plan.pips}</span>&nbsp;pips</bdi><br />
                    <span className="text-gray-500">{plan.commission ? t("there_is_a_commission") : t("there_is_no_commission")}</span>
                </div>
                <ul className="mb-8 rtl:mr-4 ltr:ml-4 text-gray-500 ">
                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                        <span>{t("the_lowest_deposit_amount")}</span>
                        <span className="font-bold text-black dark:text-white">{plan.min_deposit}</span>
                    </li>
                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                        <span>EA</span>
                        <span className="font-bold text-black dark:text-white">{plan.EA === "yes" ? t("yes") : t("no")}</span>
                    </li>
                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                        <span>{t("less_trading_volume")}</span>
                        <span className="font-bold text-black dark:text-white">{plan.Min_trading_volume}</span>
                    </li>
                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                        <span>{t("islamic_account")}</span>
                        <span className="font-bold text-black dark:text-white">{plan.Islamic_account === "yes" ? t("yes") : t("no")}</span>
                    </li>

                </ul>
                <div className={`relative`}>
                    <input name="account_type" type="radio" value={plan.id} className="absolute top-0 right-0 w-full h-full opacity-0 peer" onChange={(event) => { setAccountType(event.target.value), setChange(change + 1) }} checked={+accountType === plan.id} />
                    <Correct size="15" className="absolute top-1/2 right-1/2 peer-checked:block hidden transform translate-x-1/2 -translate-y-1/2" />
                    <div className={`bg-secondary dark:bg-dark-secondary  py-3  rounded-xl flex items-center justify-center  border peer-checked:border-2 peer-checked:border-primary text-primary peer-checked:bg-primary  border-primary  `}>
                        {t("choose_the_account")}

                    </div>
                </div >

            </div>
        )))
}

