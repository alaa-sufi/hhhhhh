import Head from 'next/head'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import 'rsuite/dist/rsuite.min.css'
import 'rsuite/dist/rsuite-rtl.min.css';
import 'react-phone-input-2/lib/style.css'
import 'styles/globals.css'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Provider } from "react-redux";
import store from "store/index";
import { CustomProvider } from "rsuite";
Router.events.on('routeChangeStart', () => NProgress.start())
// Router.events.on('routeChangeComplete', () => NProgress.done())
// Router.events.on('routeChangeError', () => NProgress.done())
NProgress.configure({ showSpinner: true })

// import Nav from "components/Nav"
import { NextUIProvider } from '@nextui-org/react';
function MyApp({ Component, pageProps }) {
  
  if (Component.getLayout) {
    return (
      <NextUIProvider>
        {/* Component.getLayout( */}
        <>
          <html lang="ar" dir="rtl" />
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet" />
            <meta name="theme-color" content="#1056EB" />
          </Head>
          <Component {...pageProps} />
        </>
        {/* ) */}
      </NextUIProvider>

    )
  }
  return (
    <>
      <NextUIProvider >
        <CustomProvider rtl >

        <html lang="ar" dir="rtl" />
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com"  />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
        </Head>
        {/* <Nav /> */}
        <Component {...pageProps} />
        </CustomProvider>
      </NextUIProvider>

    </>
  )
}

export default MyApp
