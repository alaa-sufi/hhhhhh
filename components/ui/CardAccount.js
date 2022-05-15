import React, { useState } from 'react'
import { Menu, Pin } from "public/svg"
import { MoneyRecive, Add, ArrowSwapVertical, Trash, Setting4, Refresh2 ,MoneySend ,Lock1} from 'iconsax-react';
import useTranslation from 'next-translate/useTranslation'
import Link from "next/link"
export default function CardAccount({type}) {
    const { t, lang } = useTranslation()

    const [openMenu, setOpenMenu] = useState(false)
    const [fix, setFixed] = useState(false)
const handleFix =()=>{
    setFixed(!fix)
}
    return (
        <div className={`col-span1 relative ${false &&  '[filter:drop-shadow(0px_0px_5px_rgba(255,0,0,0.6))]'}`} >
            {fix && <span className="w-8 h-8 absolute top-0 right-1/2 transform translate-x-1/2 bg-white rounded-br-lg rounded-bl-lg z-1 flex items-center justify-center"><Pin fill="black"/></span>}
            <div className="bg-[#F1F0F0]  rounded-xl  ">
                <div className={`${type === "trading" ? "bg-[#2980B9]" : "bg-[#6ab929]" }  py-5 px-6 rounded-xl text-white relative`}>
                    <h5>{t("dashboard:balance")}</h5>
                    <span className="block mb-1 text-4xl ">$2,056</span>
                    <span className="block mb-10 tracking-widest3 text-slate-300">STANDARD</span>
                    <button className="absolute flex p-1 bg-white rounded-lg top-4 rtl:left-4 ltr:right-4" onClick={() => setOpenMenu(true)}>
                            <Menu />
                    </button>
                    {openMenu && <div className="absolute text-black bg-white rounded-xl top-4 rtl:left-4 ltr:right-4 z-2">
                        <button onClick={() => setOpenMenu(false)}>
                            <Add className="absolute flex text-red-500 transform rotate-45 bg-white text-red top-2 rtl:left-2 ltr:right-2 rounded-xl" size="25 " />
                        </button>
                        <Link href={`/dashboard/${type}/deposit`}>
                        <a className="flex items-center gap-2 px-3 py-1 mb-1 cursor-pointer hover:bg-primary-200/10"><MoneyRecive className="w-5 text-black" size="25" />{t("dashboard:deposit")}</a>
                        </Link>
                        {type === "trading" && <li className="flex items-center gap-2 px-3 py-1 mb-1 cursor-pointer hover:bg-primary-200/10"> <MoneySend className="w-5 text-black" size="25" />{t("dashboard:drag")}</li>}
                        <li className="flex items-center gap-2 px-3 py-1 mb-1 cursor-pointer hover:bg-primary-200/10"> <Refresh2 className="w-5 text-black" size="25" />{t("dashboard:record")}</li>
                        <li className="flex items-center gap-2 px-3 py-1 mb-1 cursor-pointer hover:bg-primary-200/10"><Setting4 className="w-5 text-black" size="25" />{t("dashboard:account_information")}</li>
                        {type === "trading" && <li className="flex items-center gap-2 px-3 py-1 mb-1 cursor-pointer hover:bg-primary-200/10"> <Lock1 className="w-5 text-black" size="25" />{t("dashboard:change_password")}</li>}
                        <button className="w-full flex items-center gap-2 px-3 py-1 mb-1 cursor-pointer hover:bg-primary-200/10" onClick={handleFix}><Pin className="w-5 text-black" />{fix ? t("dashboard:cancel_account_installation") :t("dashboard:account_installation")}</button>
                        <li className="flex items-center gap-2 px-3 py-1 mb-1 cursor-pointer hover:bg-red-200"><Trash className="w-5 text-black" size="25" />{t("dashboard:delete_account")}</li>
                    </div>}
                    <ul className="flex justify-between">
                        <li>
                            <div className="flex items-center gap-2">
                                <span className="p-1 rounded-lg bg-white/10">
                                    <ArrowSwapVertical size="20" />
                                </span>
                                <span>
                                    <h6 className="text-sm leading-none text-slate-300">MT5</h6>
                                    <span className="text-base">USD</span>
                                </span>
                            </div>
                        </li>
                        <li>
                            <h6 className="text-sm leading-none text-slate-300">{t("dashboard:leverage")}</h6>
                            <span className="text-base">1:300</span>
                        </li>
                        <li>
                            <h6 className="text-sm leading-none text-slate-300">{t("dashboard:account_number")}</h6>
                            <span className="text-base tracking-widest2">101316</span>
                        </li>
                    </ul>
                </div>
                <div className="p-4 border-gray-300">
                    <ul className="flex justify-between py-4 border-b border-gray-300">
                        <li>
                            <h6 className="text-sm">{t("dashboard:liquidity")}</h6>
                            <span className="text-sm font-bold text-black">500$</span>
                        </li>
                        <li>
                            <h6 className="text-sm">{t("dashboard:margins")}</h6>
                            <span className="text-sm font-bold text-black">200$</span>
                        </li>
                        <li>
                            <h6 className="text-sm">{t("dashboard:capital")}</h6>
                            <span className="text-sm font-bold text-black">1200$</span>
                        </li>
                    </ul>
                    <div className="py-4">
                        <h6 className="mb-2 text-xs">{t("dashboard:the_last_account_movements")}</h6>
                        <ul>
                            {Array.from({ length: Number.parseInt(3) }, (item, index) => (
                                <li key={index} className="relative mb-4 after:rounded-xl after:bg-primary after:absolute after:w-1 after:h-7 after:top-1 rtl:after:right-0 ltr:after:left-0 rtl:pr-2 ltr:pl-2 ">
                                    <p className="text-base font-bold leading-none text-black">تعديل الرافعة المالية لـ 1:300</p>
                                    <small>منذ 2 يوم</small>
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
