import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET);

export async function GetStripePlans(stripeId) {
  if (!stripeId) {
    throw new Error("Unable to load Stripe ID")
  }

  let customer = await stripe.customers.retrieve(stripeId, {expand: ['subscriptions']})

  if (
    (! customer.subscriptions) || 
    (customer.subscriptions.object != 'list') ||
    (! customer.subscriptions.data) ||
    (customer.subscriptions.data.length == 0)
    ) {
    return {};
  }

  let subscriptions = customer.subscriptions.data.map((s) => {
    return {
      subscriptionId: s.id,
      priceId: s.plan ? s.plan.id : null,
      productId: s.plan ? s.plan.product : null,
      active: s.plan ? s.plan.active : false
    }
  })

  let resObj = {}
  for (let s of subscriptions) {
    if (typeof resObj[s.productId] == 'undefined') {
      resObj[s.productId] = {active: [], inactive: []}
    }
    if (s.active) {
      resObj[s.productId].active.push(s)
    } else {
      resObj[s.productId].inactive.push(s)
    }
  }
  return resObj
}