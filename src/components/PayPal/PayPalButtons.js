'use client'

import { useEffect } from 'react'
import {
  PayPalButtons as PPButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'

import { handleCreateSubscription } from '../../lib/paypal'

export function PayPalButtons() {
  const [{ isInitial, isPending, isResolved, isRejected, options }, dispatch] =
    usePayPalScriptReducer()

  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id="paypal-button">
      {isInitial && <span>load paypal!</span>}
      {isPending && <span>loading paypal...</span>}{' '}
      {isRejected && <span>problem loading paypal</span>}
      {isResolved && (
        <PPButtons
          createSubscription={handleCreateSubscription}
          style={{
            label: 'subscribe',
          }}
        />
      )}
    </div>
  )
}
