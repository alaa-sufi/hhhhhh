import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';
import { css } from '@nextui-org/react';
import useTranslation from 'next-translate/useTranslation'

class MyDocument extends Document {

  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: <>{initialProps.styles}</>
    };
  }
  
  render() {
    const  lang  = "ar"
    // const { t, lang } = useTranslation()
    return (
      <Html lang={lang === 'ar' ? "ar" : "en"} dir={lang === 'ar' ? "rtl" : "ltr"} >
        <Head>{CssBaseline.flush()}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;