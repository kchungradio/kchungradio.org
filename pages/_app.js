/* eslint-disable react/prop-types */

import React from 'react'
import Head from 'next/head'

import Navbar from '../components/Navbar'

import '../css/style.css'

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>KCHUNG Radio 1630AM</title>
        <link rel="icon" type="image/png" href="/img/favicon.ico" />
        <meta property="og:image" content="/img/kchungforfacebook.jpg" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default App
