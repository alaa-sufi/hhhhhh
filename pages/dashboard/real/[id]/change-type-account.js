import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Add, ArrowLeft, Flag, Cup, Crown1 } from 'iconsax-react';
import Link from "next/link"
import { ButtonTheme, Error, Loading } from "@/ui"
import { allAccountsTypes } from "apiHandle"
import useSWR from 'swr'
import {  Correct } from "public/svg"
import { useRouter } from 'next/router';
import Image from "next/image"
import { changeRealAccountSetting} from "apiHandle"

export default function ChangeTypeAccount() {
    const router = useRouter();
    const { t } = useTranslation("dashboard")
    const [accountType ,setAccountType] = useState(router.query.account_type)
  const [loadingButton, setLoadingButton] = useState(false)

    const [change ,setChange] = useState(1)
    const plans = [
        { icon: <Flag className="text-white" size="30" />, title: t("essential"), pips: "1.5", lowest: "$100", ea: t("no"), volume: "0.01", islamic: t("yes"), value: "1" },
        { icon: <Cup className="text-white" size="30" />, title: t("classic"), pips: "1.2", lowest: "$100", ea: t("no"), volume: "0.01", islamic: t("yes"), value: "2" },
        { icon: <Crown1 className="text-white" size="30" />, title: t("professionalism"), pips: "0.1", lowest: "$200", ea: t("no"), volume: "0.01", islamic: t("yes"), value: "3" }
    ]
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoadingButton(true);
        changeRealAccountSetting({
          values: {
            user_id:process.env.userId,
            account_id:router.query.id,
            account_type:accountType
          },
          success: () => { setLoadingButton(false);},
          error: () => setLoadingButton(false)
        })
    };
    const { data, error } = useSWR(allAccountsTypes())

    if (error) return <Error />
    if (!data) return <Loading />
    return (
        <>
            <div className="p-8 bg-white dark:bg-dark-white rounded-lg md:rounded-xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 mb-8 ">
                        <div className=" icon-container">
                            <Add size="25" className="text-primary-400" />
                        </div>
                        <h1 className="block text-3xl font-bold text-black dark:text-white">{t("modify_the_type_of_account")}</h1>
                    </div>

                    <Link href="/dashboard" >
                        <a className="p-2 border border-primary rounded-xl">
                            <ArrowLeft size="25" className="text-primary " />
                        </a>
                    </Link>

                </div>
                <div className="py-4 ">

                    <form onSubmit={handleSubmit}>
                        <div className="mx-auto  w-[900px] max-w-full">
                            <h2 className="mb-0 text-lg text-gray-600 ">{t("account_type")}</h2>
                            <div className="grid grid-cols-3 gap-8">
                                {data.accountsTypes.length && data.accountsTypes.map((plan, index) => (
                                    <div key={index} className="px-8 py-6 my-4 bg-secondary dark:bg-dark-secondary  rounded-xl">
                                        <div className="flex gap-4 mb-4">
                                            <div className="flex items-center justify-center w-12 h-12 p-1 rounded-full bg-primary ">
                                                <Image alt={plan.account_name} src={`${process.env.hostImage}/${plan.image}`} width="30" height="30" />
                                            </div>
                                            <h3 className="mt-1 text-3xl text-black dark:text-white">{plan.account_name}<br /><span className="block text-xs text-center text-gray-400 ">{t("starting_from")}</span></h3>
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
                                                <span className="font-bold text-black dark:text-white">{plan.EA ==="yes" ? t("yes") : t("no")}</span>
                                            </li>
                                            <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                                                <span>{t("less_trading_volume")}</span>
                                                <span className="font-bold text-black dark:text-white">{plan.Min_trading_volume}</span>
                                            </li>
                                            <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                                                <span>{t("islamic_account")}</span>
                                                <span className="font-bold text-black dark:text-white">{plan.Islamic_account ==="yes" ? t("yes") : t("no")}</span>
                                            </li>

                                        </ul>
                                        <div className={`relative`}>
                                            <input name="account_type" type="radio" value={plan.id} className="absolute top-0 right-0 w-full h-full opacity-0 peer" onChange={(event)=>{setAccountType(event.target.value), setChange(change + 1)}} checked={+accountType === plan.id}/>
                                            <Correct size="15" className="absolute top-1/2 right-1/2 peer-checked:block hidden transform translate-x-1/2 -translate-y-1/2" />
                                            <div className={`bg-secondary dark:bg-dark-secondary  py-3  rounded-xl flex items-center justify-center  border peer-checked:border-2 peer-checked:border-primary text-primary peer-checked:bg-primary  border-primary  `}>
                                                {t("choose_the_account")}

                                            </div>
                                        </div >

                                    </div>
                                ))}

                            </div>


                            <div className="mx-auto  w-[500px] max-w-full">
                            <ButtonTheme type="submit" loading={loadingButton} disabled={change === 1} color="primary" block size="xs" >{t("saving_changes")}</ButtonTheme>
                            </div>

                        </div>
                    </form>

                </div>

            </div>
        </>
    )
}
