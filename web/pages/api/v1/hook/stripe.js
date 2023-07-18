import fetch from 'isomorphic-unfetch';

const STRIPE_INVOICE_PAID = 'invoice.paid'
const STRIPE_INVOICE_PAYMENT_FAILED = 'invoice.payment_failed'
const STRIPE_SUBSCRIPTION_DELETED = 'customer.subscription.deleted'
const STRIPE_PAYMENT_INTENT_SUCCEEDED = 'payment_intent.succeeded'
const STRIPE_PAYMENT_INTENT_FAILED = 'payment_intent.payment_failed'


async function onInvoicePaid({}) {
  // Used to provision services after the trial has ended.
  // The status of the invoice will show up as paid. Store the status in your
  // database to reference when a user accesses your service to avoid hitting rate limits.

}

async function onInvoicePaymentFailed({}) {
  // If the payment fails or the customer does not have a valid payment method,
  //  an invoice.payment_failed event is sent, the subscription becomes past_due.
  // Use this webhook to notify your user that their payment has
  // failed and to retrieve new card details.
  
}

async function onSubscriptionDeleted({event}) {
  if (event.request != null) {
    // handle a subscription cancelled by your request
    // from above.
  } else {
    // handle subscription cancelled automatically based
    // upon your subscription settings.
  }

}

async function onPaymentIntentSucceeded({paymentIntent}) {
  console.log(
    `🔔  Webhook received! Payment for PaymentIntent ${paymentIntent.id} succeeded.`
  );
}

async function onPaymentIntentFailed({paymentIntent}) {
// Note: you can use the existing PaymentIntent to prompt your customer to try again by attaching a newly created source:
// https://stripe.com/docs/payments/payment-intents/usage#lifecycle
  const paymentSourceOrMethod = paymentIntent.last_payment_error
    .payment_method
    ? paymentIntent.last_payment_error.payment_method
    : paymentIntent.last_payment_error.source;
  console.log(
    `🔔  Payment on ${paymentSourceOrMethod.object} ${paymentSourceOrMethod.id} of type ${paymentSourceOrMethod.type} for PaymentIntent ${paymentIntent.id} failed.`
  );
}

export default async function StripeWebhook(req, res) {
  try {
    console.log("- Stripe webook")
    
    // Check if webhook signing is configured.
    if (! process.env.STRIPE_WEBHOOK_SECRET) {
      console.log(`⚠️ Stripe Webhook Secret not available (env.STRIPE_WEBHOOK_SECRET).`);
      return res.sendStatus(400);
    }

    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️ Stripe Webhook signature verification failed. Make sure the correct webhook secret is configured.`);
      return res.sendStatus(400);
    }

    // Extract the object from the event.
    const data = event.data;
    const eventType = event.type;
    const object = data.object;

    let resp = null;

    try {
      switch (eventType) {
        case STRIPE_PAYMENT_INTENT_SUCCEEDED:
          resp = await onPaymentIntentSucceeded({paymentIntent: object})
          break;
        case STRIPE_PAYMENT_INTENT_FAILED:
          resp = await onPaymentIntentFailed({paymentIntent: object})
          break
        case STRIPE_INVOICE_PAID:
          resp = await onInvoicePaid({bar: object});
          break
        case STRIPE_INVOICE_PAYMENT_FAILED:
          resp = await onInvoicePaymentFailed({bar: object});
          break
        case STRIPE_SUBSCRIPTION_DELETED:
          resp = await onSubscriptionDeleted({bar: object});
          break
        default:
          console.log(`Unhandled hook: ${eventType}`)
        }
      res.sentStatus(200);
      return  
    } catch (ex) {
      console.error(ex);
      res.sentStatus(500).json({
        error: `Error processing request: ${ex}`
      })
      return
    }
  } catch (ex) {
    console.error(ex);
    res.sentStatus(500).json({
      error: `Error processing request: ${ex}`
    })
}
}
