/* eslint-disable react/prop-types */
import React from 'react'
import Head from 'next/head'
import { config } from '@fortawesome/fontawesome-svg-core'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { paypalConfig } from '../lib/paypal'

import Navbar from '../components/Navbar'

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
      <PayPalScriptProvider deferLoading options={paypalConfig}>
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </>
  )
}

export default App
