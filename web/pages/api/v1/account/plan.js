import fetch from 'isomorphic-unfetch';
import auth0 from '../../../../lib/auth0';
import {fetchAuth0User} from '../../../../lib/fetchAuth0User'
import {GetStripePlans} from '../../../../lib/plan'

export default async function GetPlans(req, res) {
  try {
    const profile = await fetchAuth0User(auth0, req);
    const stripeId = profile['https://stripe.com/stripe_customer_id'];
    if (!stripeId) {
      res.status(500).json({error: "Unable to load Stripe ID"})
      return
    }

    const customerPlans = GetStripePlans(stripeId)
    res.status(200).json(customerPlans);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
}


