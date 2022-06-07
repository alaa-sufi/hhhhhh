import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { MoneyRecive, ArrowLeft, Information,Wallet3 } from 'iconsax-react';
import Link from "next/link"
import {CardAccountTop , Slider ,ButtonTheme ,FiveSteps ,LastActivity } from "@/ui"
import { Input } from "@/form"
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const handleSubmit = (values) => {
  console.log(values);
};
export default function Deposit() {
  const { t } = useTranslation("dashboard")


  return (
    <div className="grid grid-cols-7 gap-10 ">
      <div className="p-8 bg-white rounded-lg md:rounded-xl col-span-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mb-8 ">
            <div className=" icon-container">
              <MoneyRecive size="25" className="text-primary" />
            </div>
            <h1 className="block text-3xl font-bold text-black">{t("deposit_from_the_portfolio")}</h1>
          </div>
          <Link href="/dashboard" >
            <a className="p-2 border border-primary rounded-xl">
              <ArrowLeft size="25" className="text-primary " />
            </a>
          </Link>
        </div>
        <div className="py-4 w-[500px] max-w-full mx-auto">
          <div className="mb-4 ">
            <h2 className="mb-4 text-lg text-gray-500">{t("the_deposit_for_calculating")}</h2>
            <Slider item={<CardAccountTop />} />

          </div>
          <div className=" ">
            <h2 className="mb-2 text-lg text-gray-500 ">{t("enter_the_deposit_amount")}</h2>
            <Formik
              validationSchema={() => Yup.object().shape({
                deposit: Yup.number().required(t('please_enter_the_deposit_amount')),
              })}
              initialValues={{ deposit: "" }}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
                  <Input name="deposit" type="number" />
                  <p className="text-danger mb-4 flex gap-2 items-center"><Information size="15" /> {t("the_balance_in_your_wallet_is_not_enough_to_deposit")}</p>
                  <ButtonTheme color="primary" block size="md" fontSize="md" type="submit" className="mb-10">{t("deposit_now")}</ButtonTheme>
                </Form>
              )}
            </Formik>
            <ButtonTheme color="primary" outline size="xs" fontSize="xs" className="w-max block mx-auto my-4"><span className="mx-6">{t("examine_an_amount_directly")}</span></ButtonTheme>
          </div>
        </div>
      </div >
      <div className="col-span-2">
        {/* start wallet */}
        <section className="p-8 mb-6 bg-white rounded-lg md:rounded-xl">
          <div className="flex items-center gap-1">
            <div className="icon-container">
              <Wallet3 size="18" className="text-primary" />
            </div>
            <h2 className="m-0 text-sm text-gray-500">{t('current_balance')}</h2>
          </div>
          <strong className="block mt-4 mb-6 text-4xl text-black"><bdi>$</bdi>5,860,00</strong>
          {true && <ButtonTheme color="primary" block size="xs" className="flex items-center justify-center gap-2 " as="link" href="/dashboard/deposit"><MoneyRecive size="25" className="text-white" /><span>{t('deposit_a_new_amount')}</span></ButtonTheme>}
        </section>
        {/* end wallet */}
        <FiveSteps/>
        <LastActivity/>

      </div>
    </div>
  )
}
