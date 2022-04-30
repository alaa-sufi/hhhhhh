
import { useState } from "react"
import Login from "@/ui/short/auth";
import useTranslation from 'next-translate/useTranslation'
import { Profile, ArrowDown2, ArrowUp2 } from 'iconsax-react';
import Link from 'next/link'


export default function RegisterAll() {
    const { t, lang } = useTranslation()
    const [openIndividual, setopenIndividual] = useState(false)
    const onSubmit = (values) => {
        console.log(values)
    }
    return (
        <Login slider>
            <h1 className="mb-8 font-bold text-h2">{t('auth:welcome_with_us')}</h1>
            <div className="p-4 rounded-lg bg-secondary align-center" onClick={() => setopenIndividual(!openIndividual)}>
                <div className="relative flex justify-center gap-2 cursor-pointer">
                <Profile size="20" color="#333333" />
                <span className="select-none">{t('auth:Register_as_an_individual')}</span>
                {openIndividual ? <ArrowUp2 size="20" color="#333333" className="absolute rtl:left-4 ltr:right-4" /> : <ArrowDown2 size="20" color="#333333" className="absolute rtl:left-4 ltr:right-4" />}
                </div>
                {openIndividual && <div className="flex justify-center gap-4 mt-5 ">
                    <Link href="/" >
                        <a className="button out-primary ">
                            {t('auth:sign_in')}
                        </a>
                    </Link>
                    <Link href="/" >
                        <a className="button primary ">
                            {t('auth:Create_a_new_account')}
                        </a>
                    </Link>
                </div>}
            </div>

        </Login>
    )
}
RegisterAll.getLayout = function PageLayout(page) {
    return <>
        {page}
    </>
}

