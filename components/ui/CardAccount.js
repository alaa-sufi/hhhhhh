import React, { useState } from 'react'
import { Menu, Pin } from "public/svg"
import { MoneyRecive, Add, ArrowSwapVertical, Trash, Setting4, Refresh2, MoneySend, Lock1 } from 'iconsax-react';
import useTranslation from 'next-translate/useTranslation'
import Link from "next/link"
import { Loader } from 'rsuite';
import { ButtonTheme } from "@/ui"
import { WarningModal } from "@/modals";
import { convertAccountToFixed ,deleteDemoAccount} from "apiHandle"

export default function CardAccount({ type, data, handelFixed, handleDeleteDone }) {
    const { balance, currency, color, leverage, login, freeMargin, equity, id, fixed } = data
    const { t } = useTranslation("dashboard")
    const [deleteAccount, setDeleteAccount] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [loadingDeleteButton, setLoadingDeleteButton] = useState(false)
    const [loadingFixedButton, setLoadingFixedButton] = useState(false)
    const handleFix = () => {
        setLoadingFixedButton(true);
        convertAccountToFixed({
            id: id,
            success: () => { setLoadingFixedButton(false); setOpenMenu(false); handelFixed(); },
            error: () => setLoadingFixedButton(false)
        })


    }
    const handleDelete = () => {
        setLoadingDeleteButton(true);
        deleteDemoAccount({
            login: login,
            success: () => { handleDeleteDone(type);setLoadingDeleteButton(false) ; setOpenMenu(false); setDeleteAccount(false); },
            error: () => {setLoadingDeleteButton(false) ;setOpenMenu(false);setDeleteAccount(false);}
        })
    }
    return (
        <>
            <div className={`col-span1 relative ${false && '[filter:drop-shadow(0px_0px_5px_rgba(255,0,0,0.6))]'}`} >
                {fixed === "1" && <span className="absolute top-0 flex items-center justify-center w-8 h-8 transform translate-x-1/2 bg-white  rounded-bl-lg rounded-br-lg right-1/2 z-1 text-black"><Pin fill="inherit" /></span>}
                <div className="bg-secondary dark:bg-dark-secondary rounded-xl  ">
                    <div className={`  py-5 px-6 rounded-xl text-white relative bg-color`} style={{ "--color": color }}>
                        <h5>{t("balance")}</h5>
                        <span className="block mb-1 text-4xl ">${balance}</span>
                        <span className="block mb-10 tracking-widest3 capitalize text-slate-300">{type === "real" ? data.account_type_name : 'STANDARD'}</span>
                        <button className="absolute flex p-1 bg-white  rounded-lg top-4 rtl:left-4 ltr:right-4" onClick={() => setOpenMenu(true)}>
                            <Menu />
                        </button>
                        {openMenu && <div className="absolute z-3 text-black dark:text-white bg-white dark:bg-dark-white rounded-lg top-4 rtl:left-4 ltr:right-4 z-2 p-3">
                            <button onClick={() => setOpenMenu(false)} className="top-2 rtl:left-2 ltr:right-2 absolute">
                                <Add className=" flex text-[#E30000] transform rotate-45 bg-white dark:bg-dark-white  rounded-xl" size="25 " />
                            </button>
                            <Link href={`/dashboard/${type}/${id}/deposit?account=${id}`}>
                                <a className="flex items-center gap-2 px-3 py-2 mb-1 cursor-pointer hover:bg-primary-200/10"><MoneyRecive className="w-5 text-black dark:text-white" size="25" />{t("deposit")}</a>
                            </Link>
                            {type === "real" && <li className="flex items-center gap-2 px-3 py-2 mb-1 cursor-pointer hover:bg-primary-200/10"> <MoneySend className="w-5 text-black dark:text-white" size="25" />{t("drag")}</li>}
                            <Link href={`/dashboard/record/closed-deals?login=${login}`}>
                                <a className="flex items-center gap-2 px-3 py-2 mb-1 cursor-pointer hover:bg-primary-200/10"> <Refresh2 className="w-5 text-black dark:text-white" size="25" />{t("record")}</a>
                            </Link>
                            <Link href={`/dashboard/${type}/${id}/account-information?account=${id}`}>
                                <a className="flex items-center gap-2 px-3 py-2 mb-1 cursor-pointer hover:bg-primary-200/10"><Setting4 className="w-5 text-black dark:text-white" size="25" />{type === "real" ? t("account_information") : t("account_modification")}</a>
                            </Link>
                            {/* {type === "real" && <li className="flex items-center gap-2 px-3 py-2 mb-1 cursor-pointer hover:bg-primary-200/10"> <Lock1 className="w-5 text-black dark:text-white" size="25" />{t("change_password")}</li>} */}
                            <button disabled={loadingFixedButton} className="flex items-center w-full gap-2 px-3 py-2 mb-1 cursor-pointer hover:bg-primary-200/10" onClick={handleFix}>{loadingFixedButton ? <Loader /> : <Pin className="w-5 text-black dark:text-white" fill="inherit" />}{fixed === "1" ? t("cancel_account_installation") : t("account_installation")}</button>
                            {type != "real" && <button onClick={() => setDeleteAccount(true)} disabled={loadingDeleteButton} className="flex items-center gap-2 px-3 py-2 mb-1 cursor-pointer hover:bg-red-600 hover:text-white"><Trash className="w-5 text-inherit" size="25" />{t("delete_account")}</button>}
                        </div>}
                        <ul className="flex justify-between">
                            <li>
                                <div className="flex items-center gap-2">
                                    <span className="p-1 rounded-lg bg-white/30 dark:bg-dark-white/10">
                                        <ArrowSwapVertical size="20" />
                                    </span>
                                    <span>
                                        <h6 className="text-sm leading-none text-slate-300">MT5</h6>
                                        <span className="text-base">{currency}</span>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <h6 className="text-sm leading-none text-slate-300">{t("leverage")}</h6>
                                <bdi className="text-base">1:{leverage}</bdi>
                            </li>
                            <li>
                                <h6 className="text-sm leading-none text-slate-300">{t("account_number")}</h6>
                                <span className="text-base tracking-widest2">{login}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="p-4 border-gray-300">
                        <ul className="flex justify-between py-4 border-b border-gray-300">
                            <li>
                                <h6 className="text-sm">{t("liquidity")}</h6>
                                <bdi className="text-sm font-bold text-black dark:text-white">{equity}$</bdi>
                            </li>
                            <li>
                                <h6 className="text-sm">{t("margins")}</h6>
                                <bdi className="text-sm font-bold text-black dark:text-white">{freeMargin}$</bdi>
                            </li>
                            <li>
                                <h6 className="text-sm">{t("capital")}</h6>
                                <span className="text-sm font-bold text-black dark:text-white">1200$</span>
                            </li>
                        </ul>
                        <div className="py-4">
                            <h6 className="mb-2 text-xs">{t("the_last_account_movements")}</h6>
                            <ul>
                                {Array.from({ length: Number.parseInt(3) }, (item, index) => (
                                    <li key={index} className="relative mb-4 after:rounded-xl after:bg-primary after:absolute after:w-1 after:h-7 after:top-1 rtl:after:right-0 ltr:after:left-0 rtl:pr-2 ltr:pl-2 ">
                                        <p className="text-base font-bold leading-none text-black dark:text-white">?????????? ?????????????? ?????????????? ???? 1:300</p>
                                        <small>?????? 2 ??????</small>
                                    </li>
                                ))}

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <WarningModal open={deleteAccount}  onClose={() => setDeleteAccount(false)} message={
                <>
                    <p className="mb-4 font-bold text-black dark:text-white text-xl">{t("do_you_want_to_delete_the_account")}</p>
                    <div className="flex my-8 justify-between p-1 gap-4">
                        <ButtonTheme loading={loadingDeleteButton}  color="primary" onClick={handleDelete} className="w-1/2 px-4 py-2">{t("yes_delete_now")}</ButtonTheme>
                        <ButtonTheme color="primary" outline onClick={() => setDeleteAccount(false)} className="w-1/2 px-4 py-2">{t("no_cancel_the_deletion")}</ButtonTheme>
                    </div>
                </>
            } />
            {openMenu && <div className=" z-2 h-full w-full top-0 right-0 fixed" onClick={()=>setOpenMenu(false)}></div>}
        </>
    )
}

