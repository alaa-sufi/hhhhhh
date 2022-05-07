
import { useState } from "react"
import Login from "@/ui/short/auth";
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse ,UserOctagon} from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import DropdownButton from "@/ui/DropdownButton"

export default function RegisterAll() {
    const { t, lang } = useTranslation()
    const [openIndividual, setopenIndividual] = useState(false)
    const [openCompany, setopenCompany] = useState(false)
   
    return (
        <Login slider noRiskWarning>
            <h1 className="mb-8 font-bold text-h2">{t('auth:welcome_with_us')}</h1>
            {/* start individual button */}
            <DropdownButton open={openIndividual} onToggle={() => setopenIndividual(!openIndividual)} head={<> <Profile size="20" color="#333333" />
                <span className="select-none">{t('auth:register_as_an_individual')}</span></>} >
                <ButtonTheme color="primary" outline as="link" href="/auth/login-user">
                    {t('auth:sign_in')}
                </ButtonTheme>
                <ButtonTheme color="primary" as="link" href="/auth/register-user">
                    {t('auth:create_a_new_account')}
                </ButtonTheme>
            </DropdownButton>
            {/* end individual button */}
            {/* start company button */}
            <DropdownButton open={openCompany} onToggle={() => setopenCompany(!openCompany)} head={<> <Courthouse size="20" color="#333333" />
                <span className="select-none">{t('auth:register_as_an_company')}</span></>} >
                <ButtonTheme color="primary" outline as="link" href="/auth/login-company">
                    {t('auth:sign_in')}
                </ButtonTheme>
                <ButtonTheme color="primary " as="link" href="/auth/register-company">
                    {t('auth:create_a_new_account')}
                </ButtonTheme>
            </DropdownButton>
            {/* end company button */}
            {/* start broker button */}
            <DropdownButton link="/auth/login-broker"  head={<> <UserOctagon size="20" color="#333333"  />
                <span className="select-none">{t('auth:identified_broker')}</span></>} >
            </DropdownButton>
            {/* end broker button */}
            <ButtonTheme color="primary" as="a" href="/" outline className="block mx-auto my-10 text-center xs:my-8 w-max">
                {t('auth:back_to_the_home_page')}
            </ButtonTheme>
        </Login>
    )
}
RegisterAll.getLayout = function PageLayout(page) {
    return <>
        {page}
    </>
}


