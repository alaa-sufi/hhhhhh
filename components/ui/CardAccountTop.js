import React, { useState } from 'react'
import { Menu, Pin } from "public/svg"
import { MoneyRecive, Add, ArrowSwapVertical, Trash, Setting4, Refresh2 ,MoneySend ,Lock1} from 'iconsax-react';
import useTranslation from 'next-translate/useTranslation'
import Link from "next/link"

export default function CardAccountTop({data , type}) {
    const { t } = useTranslation("dashboard")
    const { balance, currency, color, leverage, login  } = data

  return (
    <div className={`  py-5 px-6 rounded-xl text-white relative bg-color`} style={{ "--color": color }}>
    <h5>{t("balance")}</h5>
    <span className="block mb-1 text-4xl ">${balance}</span>
    <span className="block mb-10 tracking-widest3 text-slate-300">{type === "real" ? data.account_type_name : 'STANDARD'}</span>
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
            <span className="text-base">1:{leverage}</span>
        </li>
        <li>
            <h6 className="text-sm leading-none text-slate-300">{t("account_number")}</h6>
            <span className="text-base tracking-widest2">{login}</span>
        </li>
    </ul>
</div>
  )
}
