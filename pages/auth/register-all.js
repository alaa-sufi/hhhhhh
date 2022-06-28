
import { useState } from "react"
import Login from "@/ui/short/auth";
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse, UserOctagon } from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import DropdownButton from "@/ui/DropdownButton"
import Head from 'next/head'

export default function RegisterAll() {
    const { t } = useTranslation("auth")
    const [openIndividual, setopenIndividual] = useState(false)
    const [openCompany, setopenCompany] = useState(false)

    return (
        <>
           <Head>
        <title>{t("common:website_name")}</title>
      </Head>
        <Login slider noRiskWarning>
            <h1 className="mb-8 font-bold text-h2 mt-16">{t('welcome_with_us')}</h1>
            {/* start individual button */}
            <DropdownButton open={openIndividual} className="p-3 md:p-5 mb-4 rounded-xl bg-secondary dark:bg-dark-secondary  align-center text-xl" center onToggle={() => setopenIndividual(!openIndividual)} head={<div className="grid gap-2 items-center  grid-cols-[1.5rem_8rem] text-help1"> <Profile size="24" color="#333333" />
                <span className="select-none">{t('register_as_an_individual')}</span></div>} >
                <div className="flex justify-center gap-6 mt-5 pt-2 ">
                    <ButtonTheme color="primary" outline as="link" href="/auth/login-user" size="xs" className="w-1/2">
                        {t('sign_in')}
                    </ButtonTheme>
                    <ButtonTheme color="primary" as="link" href="/auth/register-user" size="xs" className="w-1/2">
                        {t('create_a_new_account')}
                    </ButtonTheme>
                </div>
            </DropdownButton>
            {/* end individual button */}
            {/* start company button */}
            <DropdownButton open={openCompany} className="p-2 md:p-4 mb-4 rounded-xl bg-secondary dark:bg-dark-secondary  align-center text-xl" center onToggle={() => setopenCompany(!openCompany)} head={<div className="grid gap-2 items-center  grid-cols-[1.5rem_8rem] text-help1"> <Courthouse size="24" color="#333333" />

                <span className="select-none">{t('register_as_an_company')}</span></div>} >
                <div className="flex justify-center gap-6 mt-5 pt-2">

                    <ButtonTheme color="primary" outline as="link" href="/auth/login-company"  size="xs" className="w-1/2">
                        {t('sign_in')}
                    </ButtonTheme>
                    <ButtonTheme color="primary " as="link" href="/auth/register-company"  size="xs" className="w-1/2">
                        {t('create_a_new_account')}
                    </ButtonTheme>
                </div>
            </DropdownButton>
            {/* end company button */}
            {/* start broker button */}
            <DropdownButton className="p-2 md:p-4 mb-4 rounded-xl bg-secondary dark:bg-dark-secondary  align-center text-xl" center link="/auth/login-broker" head={<div className="grid gap-2 items-center  grid-cols-[1.5rem_8rem] text-help1"> <UserOctagon size="28" color="#333333" />
                <span className="select-none">{t('identified_broker')}</span></div>} >
            </DropdownButton>
            {/* end broker button */}
            <ButtonTheme color="primary" as="link" href="/" outline className="block mx-auto my-10  xs:my-8 w-max " size="xs">
                {t('back_to_the_home_page')}
            </ButtonTheme>
        </Login>
        </>
    )
}
RegisterAll.getLayout = function PageLayout(page) {
    return <>
        {page}
    </>
}


