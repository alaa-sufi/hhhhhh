import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ProfileContainer } from "@/container"
import { Location, ClipboardText, Lock1, Call } from 'iconsax-react'
import { Formik } from "formik";
import { UploadImage, InputIcon, Input, InputCity, InputDate, SelectWIthHead } from "@/form"
import { ButtonTheme, Error, Loading } from "@/ui"
import * as Yup from "yup";
import { profileBankAccount} from "apiHandle"
import Head from 'next/head'

export default function DetailsOfTheBankAccount() {
  const { t, lang } = useTranslation("profile")
  const [loadingButton, setLoadingButton] = useState(false)
  const [change, setChange] = useState(false)
  const onSubmitForm = (values) => {
    setLoadingButton(true);
    profileBankAccount({
      values: values,
      success: () => { setLoadingButton(false); },
      error: () => setLoadingButton(false)
    })
  }
  return (
    <>
      <Head>
        <title>{t("details_of_the_bank_account")} | {t("common:website_name")}</title>
      </Head>
    <ProfileContainer tab={"bankAccount"}>
      <div className="w-[700px] mx-auto ">
        <h1 className="mt-8 mb-2 text-2xl font-bold text-center text-black dark:text-white">{t("we_need_you_to_fill_the_details_of_your_bank_account")}</h1>
        <span className="block text-center text-gray-400">{t("do_not_worry_information_that_will_be_safe_with_us_no_one_but_you_will_see_it")}</span>
        <Formik initialValues={{
          user_id: process.env.userId, Beneficiary_Name: "", Bank_name: "", Bank_account_number: "", SWIFTnumber: "", bank_country: "", street: "", Neighborhood: "",
        }} validationSchema={() => Yup.object().shape({
          Beneficiary_Name: Yup.string().required(t('please_enter_the_name_of_the_beneficiary')),
          Bank_name: Yup.string().required(t('please_enter_the_bank_name')),
          Bank_account_number: Yup.string().required(t('please_enter_the_bank_account_number')),
          SWIFTnumber: Yup.string().required(t('please_do_swift_number')),
          bank_country: Yup.string().required(t('please_enter_the_banks_presence')),
          street: Yup.string().required(t('please_enter_the_street_name')),
          Neighborhood: Yup.string().required(t('please_enter_the_name_of_the_neighborhood')),

        })} onSubmit={onSubmitForm}>
          {(props) => {
            props.dirty && setChange(true)
            return (
              <form onSubmit={props.handleSubmit}>
                <div className="grid grid-cols-2 mt-8 gap-x-6">
                  <Input name="Beneficiary_Name" type="text" placeholder={t('beneficiary_name')} />
                  <Input name="Bank_name" type="text" placeholder={t('bank_name')} />
                  <Input name="Bank_account_number" type="number" placeholder={t('bank_account_number')} />
                  <Input name="SWIFTnumber" type="number" placeholder={t('swift_digit')} />
                  <InputIcon icon={<Location className="text-primary"  />} className="col-span-2">
                  <InputCity name="bank_country" type="text" placeholder={t('the_bank_is_the_bank')} defaultValue={props.values.bank_country} notGetApi={false} />
                </InputIcon>
                  <Input name="street" type="text" placeholder={t('street')} />
                  <Input name="Neighborhood" type="text" placeholder={t('neighborhood')} />
                </div>
                <ButtonTheme color="primary" as="button" type="submit" size="md" block className="my-8 text-center xs:my-4" loading={loadingButton} disabled={!change}>
                  {t('save')}
                </ButtonTheme>
              </form>
            )
          }}
        </Formik>
      </div>
    </ProfileContainer>
    </>
  )
}
