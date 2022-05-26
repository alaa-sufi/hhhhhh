import React  , {useEffect}from "react";
// import { Button, Modal, Text } from '@nextui-org/react';
import Link from "next/link";
import {useRouter} from 'next/router'
export default function Home() {
    const [visible, setVisible] = React.useState(false);
    const router = useRouter()
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
    };
useEffect(() => {
router.push("/auth/register-all")
},[])
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