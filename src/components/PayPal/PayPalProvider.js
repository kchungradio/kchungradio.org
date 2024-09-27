'use client'

import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import { paypalConfig } from '../../lib/paypal'

export function PayPalProvider({ children }) {
  return (
    <PayPalScriptProvider deferLoading options={paypalConfig}>
      {children}
    </PayPalScriptProvider>
  )
}
