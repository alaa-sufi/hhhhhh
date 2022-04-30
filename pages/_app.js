import Head from 'next/head'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "public/flickity.css"
import 'styles/globals.css'
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
      <NextUIProvider>
        <html lang="ar" dir="rtl" />
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
        </Head>
        {/* <Nav /> */}
        <Component {...pageProps} />
      </NextUIProvider>

    </>
  )
}

export default MyApp
