export const paypalConfig = {
  clientId: process.env.PAYPAL_CLIENT_ID,
  components: 'buttons',
  intent: 'subscription',
  vault: true,
}

export const handleCreateSubscription = (data, actions) =>
  actions.subscription.create({
    plan_id: process.env.PAYPAL_PLAN_ID,
  })
