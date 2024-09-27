const PAYPAL_CLIENT_ID =
  'AYvlpSx1PTdgYQo3wq8UcDzmH6zNX_lQOvlwhBVunfMPaXWmlKrB-_26WNBy4VqdHvB5Rb9wxBbAgX2O'

const PAYPAL_PLAN_ID = 'P-14R72656K1344571AMNQ7OFA'

export const paypalConfig = {
  clientId: PAYPAL_CLIENT_ID,
  components: 'buttons',
  intent: 'subscription',
  vault: true,
}

export const handleCreateSubscription = (data, actions) =>
  actions.subscription.create({
    plan_id: PAYPAL_PLAN_ID,
  })
