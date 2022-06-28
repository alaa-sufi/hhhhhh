import { useState, useEffect } from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon, InputCity, InputPhone } from "@/form"
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse, Sms, Lock, Eye, EyeSlash, Flag, Call, ArrowLeft, ArrowRight } from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"
import { forgetPasswordByEmail } from "apiHandle"
import { useRouter } from 'next/router'
import toast from "react-hot-toast";
import Head from 'next/head'

export default function EnterEmailCode() {
  const router = useRouter()
  const [time, setTime] = useState("01:15");
  const [duration, setDuration] = useState(60 * 1.5);

  function startTimer(duration) {
    var timer = duration, minutes, seconds;
    const counnter = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      setTime(minutes + ":" + seconds);

      if (--timer < 0) {
        timer = 0;
        clearInterval(counnter)
      }
    }, 1000);
  }
  const onSubmit = () => {
    forgetPasswordByEmail({
      values : {email : router.query.email},
      success : ()=>{},
      error : (err)=>{ if(err.response.status === 401){
        toast.error(t("errToast:please_wait_and_return_later"))
    }}
    })
  }
  useEffect(() => {
    startTimer(duration);
  }, [])
  const { t , lang} = useTranslation("auth")


  return (
    <>
      <Head>
        <title>{t("email_confirmation")} | {t("common:website_name")}</title>
      </Head>
    <Login noLinksButton contactUs>
      <h1 className="mb-8  text-4xl md:text-[1.7rem]  text-center block mt-14 text-success">{t('your_password_recovery_details_have_been_sent_to_your_email')}</h1>
        <span className="flex justify-between mx-auto text-center ">
          <span className={`${time == "00:00" ? "text-primary cursor-pointer" : "font-bold pointer-events-none"}`} onClick={() => { startTimer(duration);onSubmit() }}>{t('i_havent_received_the_code_yet')} </span>
          <span>{t('re_send_through')} {time}</span>
        </span>
      <ButtonTheme color="primary" onClick={() => router.back()} size="xs" outline className="flex items-center gap-2 mx-auto mt-20 mb-4 text-center xs:my-2 w-max">
        {t('back')}{lang == "ar" ? <ArrowLeft size="15" className="text-inherit" /> : <ArrowRight size="15" className="text-inherit" />}
      </ButtonTheme>
    </Login>
    </>
  )
}
EnterEmailCode.getLayout = function PageLayout(page) {
  return <>
    {page}
  </>
}

