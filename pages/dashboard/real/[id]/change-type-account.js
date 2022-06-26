import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Add, ArrowLeft, Flag, Cup, Crown1 } from 'iconsax-react';
import Link from "next/link"
import { ButtonTheme, RealTypesAccounts} from "@/ui"
import { allAccountsTypes } from "apiHandle"
import useSWR from 'swr'
import { useRouter } from 'next/router';
import { changeRealAccountSetting } from "apiHandle"

export default function ChangeTypeAccount() {
    const router = useRouter();
    const { t } = useTranslation("dashboard")
    const [accountType, setAccountType] = useState(router.query.account_type)
    const [loadingButton, setLoadingButton] = useState(false)

    const [change, setChange] = useState(1)
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
                user_id: process.env.userId,
                account_id: router.query.id,
                account_type: accountType
            },
            success: () => { setLoadingButton(false); },
            error: () => setLoadingButton(false)
        })
    };
    const { data, error } = useSWR(allAccountsTypes())
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
                                <RealTypesAccounts error={error} data={data} accountType={accountType} setAccountType={setAccountType} change={change} setChange={setChange} />
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

