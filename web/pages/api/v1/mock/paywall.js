import auth0 from '../../../../lib/auth0';
import {fetchAuth0User} from '../../../../lib/fetchAuth0User'
import {GetStripePlans} from '../../../../lib/plan'
import PaywallProtect from '../../../../lib/PaywallProtect'

export default async function MockPaywall(req, res) {
  try {
    const profile = await fetchAuth0User(auth0, req);
    const stripeId = profile['https://stripe.com/stripe_customer_id'];
    if (!stripeId) {
      res.status(500).json({error: "Unable to load Stripe ID"})
      return
    }

    let data = {
      profile: {
        name: "Clark Kent",
        proName: "Pro Superman",
        basicName: "Basic Superman"
      }
    }

    let customerPlans = null;
    try {
      customerPlans = await GetStripePlans(stripeId)
    } catch (ex) {
      console.log("Unable to fetch customer plans.", ex)
    }

    data = await PaywallProtect(data, "profile.proName", {
      requiredPlan: 'pro',
      userPlans: customerPlans
    })
    data = await PaywallProtect(data, "profile.basicName", {
      requiredPlan: 'basic',
      userPlans: customerPlans
    })
    res.status(200).json(data);
    return
  } catch (error) {
    console.error("error: ", error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
    return
  }
}
