import fetch from 'isomorphic-unfetch';
import auth0 from '../../../../lib/auth0';
import config from '../../../../lib/config';
import Stripe from "stripe";
import {fetchAuth0UserId} from '../../../../lib/fetchAuth0User'

const stripe = new Stripe(process.env.STRIPE_SECRET);

const PLAN = 'price_1Hpn7cJ8kHh2FyYyv1g7h1je' // Note this is the pricing object, not the plan object.



export default async function createCustomer(req, res) {
  if (!(req.method === "POST")) {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }

  // Load the user id
  let userId = null
  try {
    userId = fetchAuth0UserId(auth0, req)
  } catch (error) {
    return res.status('402').send({ error: { message: "Unable to determine user ID" } });
  }

  // Attach the payment method to the customer
  try {
    await stripe.paymentMethods.attach(req.body.paymentMethodId, {
      customer: req.body.customerId,
    });
  } catch (error) {
    return res.status('402').send({ error: { message: error.message } });
  }

  // Change the default invoice settings on the customer to the new payment method
  await stripe.customers.update(
    req.body.customerId,
    {
      name: req.body.name,
      email: req.body.email,
      invoice_settings: {
        default_payment_method: req.body.paymentMethodId,
      },
      metadata: {
        user_id: userId
      }
    }
  );

  // Create the subscription
  const subscription = await stripe.subscriptions.create({
    customer: req.body.customerId,
    items: [{ price: req.body.priceId }],
    expand: ['latest_invoice.payment_intent'],
  });

  res.send(subscription);  
}


