import Link from "next/link"
import { Login } from 'iconsax-react';

import useTranslation from 'next-translate/useTranslation'
export default function FiveSteps(){
    const { t } = useTranslation("dashboard")
    return(
        <section className="p-8 mb-6 text-white rounded-lg bg-gradient-to-bl from-primary to-rose-500 md:rounded-xl">
        <h2 className="mb-6 text-2xl font-bold">{t("with_5_simple_steps_start_trading")}</h2>
        <Link href="/"><a className="flex justify-end gap-1 text-white">{t("start_now")} <Login className="text-white transform rotate-180" size="20" /></a></Link>
      </section>
    )
}