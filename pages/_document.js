import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  const isProduction = process.env.NEXT_PUBLIC_ENV
  return (
    <Html>
      <Head>
        <link rel="icon" type="image/png" href="/img/favicon.ico" />
        <meta property="og:image" content="/img/kchungforfacebook.jpg" />
      </Head>
      <body>
        { isProduction && <Script src="https://www.googletagmanager.com/gtag/js?id=G-79TEET1DEV" strategy="beforeInteractive" /> }
        { isProduction && <Script id="ga4" strategy="beforeInteractive"> {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-79TEET1DEV');`} </Script> }
        { isProduction && <Script id="ms_clarity" strategy="beforeInteractive"> {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}; t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i; y=l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "n90784i96d");`} </Script> }
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}