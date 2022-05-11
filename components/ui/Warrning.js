import React , {useState} from 'react'
import { Warning2, Add } from 'iconsax-react';
import useTranslation from 'next-translate/useTranslation'

import Link from "next/link"
export default function Warrning() {
    const [hide , setHide] = useState(false)
    const { t, lang } = useTranslation();

    return (
        !hide &&
        <div className="bg-primary-200 p-4 flex gap-2 mb-4 rounded-xl   text-black relative items-center">
            <Warning2 />
            {t("dashboard:your_profile_is_not_complete_yet")}
            <Link href="/"><a className="bg-white rounded p-2 mx-2">{t("dashboard:go_to_the_profile")}</a></Link>
            <button>
            <Add size="30" className="transform rotate-45  absolute rtl:left-4 ltr:right-4 top-4" onClick={()=>setHide(true)}/>
            </button>
        </div>
    )
}
