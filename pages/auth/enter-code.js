import { useState, useEffect } from "react"
import Login from "@/ui/short/auth";
import { Input, InputIcon, InputCity, InputPhone } from "@/form"
import useTranslation from 'next-translate/useTranslation'
import { Profile, Courthouse, Sms, Lock, Eye, EyeSlash, Flag, Call, ArrowLeft, ArrowRight } from 'iconsax-react';
import ButtonTheme from "@/ui/ButtonTheme"

import { useRouter } from 'next/router'

export default function EnterCode() {
  const router = useRouter()
  const [time, setTime] = useState("01:15");
  const [duration, setDuration] = useState(60 * 1.5);
  const [allCode, setAllCode] = useState("");

  function startTimer(duration) {
    var timer = duration, minutes, seconds;
    const counnter = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      setTime(minutes + ":" + seconds);
      console.log(time)

      if (--timer < 0) {
        timer = 0;
        clearInterval(counnter)
      }
    }, 1000);
  }
  const onSubmit = (values) => {
    console.log(values)
  }
  const otpFunc = (e) => {
    var current = Number.parseInt(e.target.dataset.tab);
    if (e.target.value.length != 1) {
      e.target.value = e.target.value.slice(1, 2);
    }
    if (current < 5 && e.target.value != "" && e.target.value.length === 1) {
      e.target.parentElement.querySelector(`#numb${current + 1}`).focus()
    } else {
      // e.target.parentElement.focus()
    }
    setAllCode(`${document.getElementById("numb1").value}${document.getElementById("numb2").value}${document.getElementById("numb3").value}${document.getElementById("numb4").value}${document.getElementById("numb5").value} `)
  }
  useEffect(() => {
    startTimer(duration);
  }, [])
  const { t, lang } = useTranslation()


  return (
    <Login noLinksButton contactUs>
      <h1 className="mb-0 font-bold text-h2 block mt-14">{t('auth:enter_the_code')}</h1>
      <span className="mb-0 block text-gray-400 text-md">{t('auth:you_will_receive_an_sms_containing_5_numbers_enter_them_in_the_field_to_confirm_the_operation')}</span>

      <form onSubmit={onSubmit}>
        <div className="w-full">
          <div className="py-3 text-center rounded ">
            <div id="otp" className="flex flex-row justify-center  mt-5 text-center">
              <input onKeyUp={otpFunc} className="h-16 m-2 text-lg text-center bg-gray-200 border rounded w-14" type="number" id="numb5" minLength="1" data-tab="5" />
              <input onKeyUp={otpFunc} className="h-16 m-2 text-lg text-center bg-gray-200 border rounded w-14" type="number" id="numb4" minLength="1" data-tab="4" />
              <input onKeyUp={otpFunc} className="h-16 m-2 text-lg text-center bg-gray-200 border rounded w-14" type="number" id="numb3" minLength="1" data-tab="3" />
              <input onKeyUp={otpFunc} className="h-16 m-2 text-lg text-center bg-gray-200 border rounded w-14" type="number" id="numb2" minLength="1" data-tab="2" />
              <input onKeyUp={otpFunc} className="h-16 m-2 text-lg text-center bg-gray-200 border rounded w-14" type="number" id="numb1" minLength="1" data-tab="1" />
            </div>
          </div>
        </div>
        <span className=" mx-auto text-center flex justify-between">
          <span className={`${time == "00:00" ? "text-primary cursor-pointer" : "font-bold pointer-events-none"}`} onClick={() => { startTimer(duration) }}>{t('auth:i_havent_received_the_code_yet')} </span>
          <span>{t('auth:re_send_through')} {time}</span>
        </span>
        <input type="number" value={allCode} className="hidden" />
        <ButtonTheme color="primary" as="button" type="submit" big block className="my-4 text-center xs:my-2 px-4 py-2">
          {t('auth:confirm_code')}
        </ButtonTheme>

      </form>
      <ButtonTheme color="primary" onClick={() => router.back()} outline className=" mx-auto my-4 text-center xs:my-2 w-max flex items-center gap-2 px-4 py-2">
        {t('auth:back')}{lang == "ar" ? <ArrowLeft size="15" className="text-primary" /> : <ArrowRight size="15" className="text-primary" />}
      </ButtonTheme>


    </Login>
  )
}
EnterCode.getLayout = function PageLayout(page) {
  return <>
    {page}
  </>
}

