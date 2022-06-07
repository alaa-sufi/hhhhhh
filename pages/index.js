import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
export default function Home() {
    const router = useRouter()
    const closeHandler = () => {
        setVisible(false);
    };
    useEffect(() => {
        router.push("/auth/register-all")
    }, [])
    return (
        <>
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