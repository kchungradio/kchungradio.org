/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { config } from '@fortawesome/fontawesome-svg-core'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

import { paypalConfig } from '../lib/paypal'
import Navbar from '../components/Navbar'
import Stream from '../components/Stream'

import '@fortawesome/fontawesome-svg-core/styles.css'

import '../css/style.css'

config.autoAddCss = false

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'always',
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    }
  })
}

function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture('$pageview')
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <>
      <Head>
        <title>KCHUNG Radio 1630AM</title>
        <link rel="icon" type="image/png" href="/img/favicon.ico" />
        <meta property="og:image" content="/img/kchungforfacebook.jpg" />
      </Head>
      <Navbar />
      <Stream />
      <PostHogProvider client={posthog}>
        <PayPalScriptProvider deferLoading options={paypalConfig}>
          <Component {...pageProps} />
        </PayPalScriptProvider>
      </PostHogProvider>
    </>
  )
}

export default App
