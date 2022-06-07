import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Add, ArrowLeft, Flag, Cup, Crown1 } from 'iconsax-react';
import Link from "next/link"
import ButtonTheme from "@/ui/ButtonTheme"
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Lock, Eye, EyeSlash } from 'iconsax-react';
import { Input, InputIcon, CustumnCheckbox, SelectWIthHead } from "@/form"
import { Trider4, Correct } from "public/svg"
import { useRouter } from 'next/router';
import { DepositModal } from "@/modals"
export default function ChangeTypeAccount() {
    const router = useRouter;
    const { t } = useTranslation("dashboard")
    const plans = [
        { icon: <Flag className="text-white" size="30" />, title: t("essential"), pips: "1.5", lowest: "$100", ea: t("no"), volume: "0.01", islamic: t("yes"), value: "1" },
        { icon: <Cup className="text-white" size="30" />, title: t("classic"), pips: "1.2", lowest: "$100", ea: t("no"), volume: "0.01", islamic: t("yes"), value: "2" },
        { icon: <Crown1 className="text-white" size="30" />, title: t("professionalism"), pips: "0.1", lowest: "$200", ea: t("no"), volume: "0.01", islamic: t("yes"), value: "3" }
    ]
    const handleSubmit = (values) => {
        console.log(values);
      };

    return (
        <>
            <div className="p-8 bg-white rounded-lg md:rounded-xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 mb-8 ">
                        <div className=" icon-container">
                            <Add size="25" className="text-primary-400" />
                        </div>
                        <h1 className="block text-3xl font-bold text-black">{t("modify_the_type_of_account")}</h1>
                    </div>

                    <Link href="/dashboard" >
                        <a className="p-2 border border-primary rounded-xl">
                            <ArrowLeft size="25" className="text-primary " />
                        </a>
                    </Link>

                </div>
                <div className="py-4 ">
                    <Formik
                        initialValues={{account_type:"1"}}
                        onSubmit={handleSubmit}
                    >
                        {({ values }) => (
                            <div className="mx-auto  w-[900px] max-w-full">
                                <Form>
                                    <h2 className="mb-0 text-lg text-gray-600 ">{t("account_type")}</h2>
                                    <div className="grid grid-cols-3 gap-8">
                                        {plans.map((plan, index) => (
                                            <div key={index} className="px-8 py-6 my-4 bg-secondary rounded-xl">
                                                <div className="flex gap-4 mb-4">
                                                    <div className="flex items-center justify-center w-12 h-12 p-1 rounded-full bg-primary ">
                                                        {plan.icon}
                                                    </div>
                                                    <h3 className="mt-1 text-3xl text-black">{plan.title}<br /><span className="block text-xs text-center text-gray-400 ">{t("starting_from")}</span></h3>
                                                </div>
                                                <div className="mb-10 text-center">
                                                    <bdi><span className="text-3xl font-black text-black">{plan.pips}</span>&nbsp;pips</bdi><br />
                                                    <span className="text-gray-500">{t("there_is_no_commission")}</span>
                                                </div>
                                                <ul className="mb-8 rtl:mr-4 ltr:ml-4 ">
                                                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                                                        <span>{t("the_lowest_deposit_amount")}</span>
                                                        <span className="font-bold text-black">{plan.lowest}</span>
                                                    </li>
                                                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                                                        <span>EA</span>
                                                        <span className="font-bold text-black">{plan.ea}</span>
                                                    </li>
                                                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                                                        <span>{t("less_trading_volume")}</span>
                                                        <span className="font-bold text-black">{plan.volume}</span>
                                                    </li>
                                                    <li className="relative flex justify-between pr-2 mb-4 before:w-3 before:h-3 before:bg-primary before:absolute rtl:before:-right-4 ltr:before:-left-3 before:top-1 before:rounded-full">
                                                        <span>{t("islamic_account")}</span>
                                                        <span className="font-bold text-black">{plan.islamic}</span>
                                                    </li>

                                                </ul>
                                                <div className={`relative`}>
                                                    <Field name="account_type" type="radio" value={plan.value} className="absolute top-0 right-0 w-full h-full opacity-0 peer" />
                                                    <Correct size="15" className="absolute top-1/2 right-1/2 peer-checked:block hidden transform translate-x-1/2 -translate-y-1/2" />
                                                    <div className={`bg-secondary py-3  rounded-xl flex items-center justify-center  border peer-checked:border-2 peer-checked:border-primary text-primary peer-checked:bg-primary  border-primary  `}>
                                                        {t("choose_the_account")}

                                                    </div>
                                                </div >

                                            </div>
                                        ))}

                                    </div>


                                    <div className="mx-auto  w-[500px] max-w-full">
                                        <ButtonTheme type="submit" color="primary" block size="xs" >{t("saving_changes")}</ButtonTheme>
                                    </div>

                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>

            </div>
        </>
    )
}
