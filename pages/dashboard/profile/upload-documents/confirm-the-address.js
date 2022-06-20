import React, { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ProfileContainer } from "@/container"
import { Verify, ArrowLeft } from 'iconsax-react'
import { BankAccountStatement, Bill, Otherthing } from "public/svg"
import { UploadDraggableImage } from '@/form'
import { Formik } from "formik";
import { ButtonTheme, Error, Loading } from "@/ui"
import { profilePersonalIdentificationConfirmation ,profileAddressCheck} from "apiHandle"
import useSWR from 'swr'



export default function ConfirmTheAddress() {
  const { t, lang } = useTranslation("profile")
  const [choose, setChoose] = useState(-1)
  const [done, setDone] = useState(false)
  const [change, setChange] = useState(false)
  const [chooseValue, setChooseValue] = useState()
  const [loadingButton, setLoadingButton] = useState(false)

  const options = [
    { title: t("bank_account_statement"), icon: <BankAccountStatement />, value: "bank_account_statement" },
    { title: t("bill"), icon: <Bill />, value: "bill" },
    { title: t("another_thing"), icon: <Otherthing />, value: "another_thing" },
  ]
  const roles = [
    , t("date")
    , t("your_full_name")
    , t("home_adress")
    , t("the_name_issued_by_the_document")
  ]
  const role = "user"

  const onSubmit = (values) => {
    setLoadingButton(true);
    profilePersonalIdentificationConfirmation({
      values: { ...values, document_type: chooseValue },
      success: () => { setLoadingButton(false); setDone(true) },
      error: () => setLoadingButton(false)
    })
  }
  const { data, error } = useSWR( profileAddressCheck())
  useEffect(() => {
    data &&  setDone(data.status)
   }, [data])
   if (error) return <Error />
   if (!data) return <Loading />
  return (
    <ProfileContainer tab={"uploadDocuments"}>
      <Formik initialValues={{ user_id: role === "user" ? process.env.userId : process.env.company_id, first_document: "", second_document: "", document_type: chooseValue, type: "Address confirmation" }}
        onSubmit={onSubmit} >
        {(props) => {
          props.dirty && setChange(true)
          return (
            <form onSubmit={props.handleSubmit}>
              {!done ?
                <>
                  {choose === -1 ? <>
                    <h1 className="text-center text-2xl mb-8">{t("choose_how_to_confirm_your_personal_identity")}</h1>
                    <ul className="flex justify-between gap-6 mb-10">
                      {options.map((option, index) => (
                        <li key={index} className="bg-secondary rounded-xl w-full text-center flex justify-center items-center">
                          <button className=" py-6 px-8" onClick={() => { setChoose(index);; setChooseValue(option.value) }}>
                            <div className="mb-4 text-primary">{option.icon}</div>
                            <div className="text-xl">{option.title} </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                    :
                    <>
                      <div className="flex  mb-8 justify-between items-center ">
                        <h1 className="text-center text-2xl">{t("we_need_to_confirm_your_identity")}</h1>
                        {!change && <button onClick={() => setChoose(-1)} className="p-2 border border-primary rounded-xl">
                          <ArrowLeft size="25" className="text-primary " />
                        </button>}

                      </div>


                      <UploadDraggableImage name="first_document" fileName={<bdi><span>{t("raise_a")}</span>{" "}<span>{options[choose].title}</span></bdi>} dirty={change} />

                      {(change && props.values.first_document) && <ButtonTheme color="primary" as="button" type="submit" size="md" block className="mt-8 mb-10 text-center xs:my-4" loading={loadingButton} disabled={!change}>
                        {t('upload_the_file')}
                      </ButtonTheme>

                      }

                    </>
                  }
                  <h2 className="text-lg mb-6">{t("make_sure_the_following_information_is_clearly_showing")}</h2>
                  <div className="mb-10">
                    <ul className="grid grid-cols-5">
                      {roles.slice(0, 3).map((role, index) => (
                        <li key={index} className="mx-4 mb-6  text-xs  relative before:bg-primary before:rounded-full before:w-3 before:h-3 before:absolute  rtl:before:-right-5 ltr:before:-left-5 before:top-1/2 before:transform before:-translate-y-1/2">{role}</li>
                      ))}
                    </ul>
                    <ul className="grid grid-cols-5  ">
                      {roles.slice(-2).map((role, index) => (
                        <li key={index} className="mx-4 mb-6  text-xs  relative before:bg-primary before:rounded-full before:w-3 before:h-3 before:absolute  rtl:before:-right-5 ltr:before:-left-5 before:top-1/2 before:transform before:-translate-y-1/2">{role}</li>
                      ))}
                    </ul>
                  </div>
                </>
                :
                <div>
                  <Verify size="170" className="mx-auto mb-10 text-success more-linear" />
                  <p className='text-center mb-8 text-lg font-bold w-[380px] mx-auto'>{t("fabulous_the_files_will_be_reviewed_by_our_team_and_we_inform_you_in_the_event_of_approval_or_re_upload_a_document")}</p>
                </div>
              }
            </form>
          )
        }}
      </Formik>
    </ProfileContainer >
  )
}
