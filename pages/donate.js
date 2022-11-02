import { useEffect } from 'react'
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'

function DonatePage() {
  return (
    <div id="main">
      <h3>how to donate money</h3>
      <p>
        we accept tax-deductible financial donations via paypal{' '}
        <a
          href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=538MT3ZCJPQ5L"
          target="_blank"
        >
          here
        </a>
      </p>
      <p>
        KCHUNG is a 501(c)(3) charitable organization. Donations to KCHUNG Radio
        are tax deductible to the full extent of the law under Federal ID
        81-2437303.
      </p>
      <h3>for members</h3>
      <p>Member dues are $10/month per DJ. Please use the paypal button below to subscribe to automatic payments.</p>
      
      <div id="paypal-button">
        <PayPalScriptProvider
          options={{
            'client-id': 'AYvlpSx1PTdgYQo3wq8UcDzmH6zNX_lQOvlwhBVunfMPaXWmlKrB-_26WNBy4VqdHvB5Rb9wxBbAgX2O',
            components: 'buttons',
            intent: 'subscription',
            vault: true,
          }}
        >
          <ButtonWrapper type="subscription" />
        </PayPalScriptProvider>
      </div>
    </div>
  )
}

const ButtonWrapper = ({ type }) => {
  const [{ options }, dispatch] = usePayPalScriptReducer()

  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        intent: 'subscription',
      },
    })
  }, [type])

  return (
    <PayPalButtons
      createSubscription={(data, actions) => {
        return actions.subscription
          .create({
            plan_id: 'P-14R72656K1344571AMNQ7OFA'
          })
          .then((orderId) => {
            // Your code here after create the order




            return orderId
          })
      }}
      style={{
        label: 'subscribe',
      }}
    />
  )
}

export default DonatePage
