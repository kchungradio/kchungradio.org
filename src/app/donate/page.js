import { PayPalProvider } from '../../components/PayPal/PayPalProvider'
import { PayPalButtons } from '../../components/PayPal/PayPalButtons'

export default function DonatePage() {
  return (
    <div id="main">
      <h3>how to donate money</h3>
      <p>
        we accept tax-deductible financial donations via paypal{' '}
        <a
          href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=538MT3ZCJPQ5L"
          target="_blank"
          rel="noreferrer"
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
      <p>
        Member dues are $12/month per DJ. Please use the paypal button below to
        subscribe to automatic payments.
      </p>

      <PayPalProvider>
        <PayPalButtons />
      </PayPalProvider>
    </div>
  )
}
