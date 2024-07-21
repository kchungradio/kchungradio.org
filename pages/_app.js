/* eslint-disable react/prop-types */
import React from 'react'
import Head from 'next/head'
import { config } from '@fortawesome/fontawesome-svg-core'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { paypalConfig } from '../lib/paypal'
import Script from 'next/script'

import Navbar from '../components/Navbar'
import Stream from '../components/Stream'

import '@fortawesome/fontawesome-svg-core/styles.css'

import '../css/style.css'

config.autoAddCss = false

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>KCHUNG Radio 1630AM</title>
        <link rel="icon" type="image/png" href="/img/favicon.ico" />
        <meta property="og:image" content="/img/kchungforfacebook.jpg" />
      </Head>
      <Navbar />
      <Stream />
      <PayPalScriptProvider deferLoading options={paypalConfig}>
        <Component {...pageProps} />
      </PayPalScriptProvider>

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-79TEET1DEV" strategy="beforeInteractive" />
      
      <Script strategy="beforeInteractive" >
        {
          `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-79TEET1DEV');`
        }
        </Script>
        <Script strategy="beforeInteractive" >
        {
          `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "n90784i96d");`
        }
        </Script>
    </>
  )
}

export default App
