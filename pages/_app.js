import Head from 'next/head'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'react-phone-input-2/lib/style.css'
import "swiper/css/effect-cards";
import 'styles/globals.css'
import { Toaster } from "react-hot-toast";

import Router from 'next/router'
import NProgress from 'nprogress'
import Aside from "@/ui/Aside"
import TopNav from "@/ui/TopNav"
import Warring from "@/ui/Warring"
import { CustomProvider } from "rsuite";
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())
NProgress.configure({ showSpinner: true })
import useTranslation from 'next-translate/useTranslation'
function MyApp({ Component, pageProps }) {
  const { t, lang } = useTranslation();
  const dir = lang === "ar" ? "rtl" : "ltr";
  if (Component.getLayout) {
    return (
      <>
        <html lang={lang} dir={dir} />
        <Head>
         
          {dir === "rtl" ?
              <link href="https://cdnjs.cloudflare.com/ajax/libs/rsuite/5.11.0/rsuite-rtl.min.css" rel="stylesheet" />
              :
              <link href='https://cdnjs.cloudflare.com/ajax/libs/rsuite/5.11.0/rsuite.min.css' rel="stylesheet" />
            }
        </Head>
        <Toaster position="bottom-right" />
        <Component {...pageProps} />
      </>

    )
  }
  return (
    <>
      <html lang={lang} dir={dir} />
      <Head>
        {dir === "rtl" ?
              <link href="https://cdnjs.cloudflare.com/ajax/libs/rsuite/5.11.0/rsuite-rtl.min.css" rel="stylesheet" />
              :
              <link href='https://cdnjs.cloudflare.com/ajax/libs/rsuite/5.11.0/rsuite.min.css' rel="stylesheet" />
            }
      </Head>
      <CustomProvider rtl={lang === "ar" ? true : false} >
        <Toaster position="bottom-right" />
        <div className="grid grid-area-home">
          <Aside />
          <TopNav />
          <div className="bg-secondary grid-area-home-page rtl:rounded-tr-xl ltr:rounded-tl-xl py-8">
            <div className="container2   px-4  mx-auto">
              <Warring />
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </CustomProvider>
    </>
  )
}

export default MyApp
