const StripePlans = {
  basic: {
    productId: 'prod_ITzOr7Kv3GNbLa',
    name: 'Basic',
    monthlyPriceId: 'price_1Ht1Q6J8kHh2FyYyMfH1DWqX',
    monthlyPriceUnitAmount: 50,
    monthlyPriceHumanAmount: "$0.50",
    visible: false,
    buttonCta: 'Sign Up'
  },
  pro: {
    productId: 'prod_IQeQWrw0nzKDq8',
    name: 'Pro Membership',
    logline: 'The essential resource for the world of stories.',
    monthlyPriceId: 'price_1Hpn7cJ8kHh2FyYyv1g7h1je',
    monthlyPriceUnitAmount: 100,
    monthlyPriceHumanAmount: "$1",
    buttonCta: 'Become a Pro',
    features: [
      {
        name: 'Advanced Search'
      },
      {
        name: 'Rights Information'
      },
      {
        name: 'Author Representation'
      },
      {
        name: 'Exclusive Curations'
      }
    ]
  }
}

export default StripePlans; 

const NEEDS_LOGIN = 'needs_login';
const NEEDS_UPGRADE = 'needs_upgrade';
const NO_PLAN_SPECIFIED = 'no_required_plan_specified';
const NO_PLAN_CONFIGURATION = 'required_plan_not_configured';

function CreatePlanFault(errorType) {
  return {
    error: {
      type: errorType
    }
  }
}

export async function UserPlanFault({requiredPlan, userPlans}) {
  if (! requiredPlan) {
    return CreatePlanFault(NO_PLAN_SPECIFIED)
  }

  let plan = StripePlans[requiredPlan]
  if ((!plan) || (typeof plan == 'undefined')) {
    return CreatePlanFault(NO_PLAN_CONFIGURATION)
  }

  if (!userPlans) {
    return CreatePlanFault(NEEDS_UPGRADE)
  }

  let userProduct = userPlans[plan.productId]
  if ((!userProduct) || (typeof userProduct == 'undefined')) {
    return CreatePlanFault(NEEDS_UPGRADE)
  }

  if (userProduct && userProduct.active && (userProduct.active.length > 0)) {
    // There is no fault.
    return null
  }

  return CreatePlanFault(NEEDS_UPGRADE)
}