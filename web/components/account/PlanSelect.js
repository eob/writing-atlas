import StripeCheckout from './StripeCheckout'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51GyQifJ8kHh2FyYyTdufAc9YKnhKNFWesFb0KD9YLdpNnkExPWuONjSqenEDwIeHIihE124FahSbwSMNbJ0LMa1H00Rt1P5mDT');

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      // cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
};

export default function PlanSelect({user, plan}) {
  return (
    <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
      <div className="flex-1 bg-white px-6 py-8 lg:p-12">
        <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
          {plan.name}
        </h3>
        <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
          <StripeCheckout user={user} priceId={plan.monthlyPriceId} />
        </Elements>
      </div>
    </div>
  )
}