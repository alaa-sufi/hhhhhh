import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'

export default function Home() {
    const { t, lang } = useTranslation("dashboard")
    const router = useRouter()
    const closeHandler = () => {
        setVisible(false);
    };
    useEffect(() => {
        router.push("/auth/register-all")
    }, [])
    return (
        <>
         <Head>
        <title>{t("common:website_name")}</title>
      </Head>
            <h1 className="text-primary text-4xl m-20 p-10 text-center text-bold">
                Hululfx

            </h1>
        </>
    );
}
Home.getLayout = function PageLayout(page) {
    return <>
        {page}
    </>
}