import React, {useState} from 'react';
import PlanSelect from './PlanSelect'
import StripePlans from '../../common/stripe/StripePlans'

function PlanFeature({name, icon}) {
  return (
    <li className="flex items-start lg:col-span-1">
      <div className="flex-shrink-0">
        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </div>
      <p className="ml-3 text-sm text-gray-700">
        {name}
      </p>
    </li>
  )
}

function AdvertisePlan({setStage}) {

  let plan = StripePlans.pro

  return (
    <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
      <div className="flex-1 bg-white px-6 py-8 lg:p-12">
        <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
          {plan.name}
        </h3>
        {plan.logline && (
          <p className="mt-6 text-base text-gray-500">
            {plan.logline}
          </p>
        )}
        <div className="mt-8">
          <div className="flex items-center">
            <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-indigo-600">
              What's included
            </h4>
            <div className="flex-1 border-t-2 border-gray-200"></div>
          </div>
          {plan.features && (
            <ul className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
              {plan.features.map(PlanFeature)}
            </ul>
          )}
        </div>
      </div>
      <div className="py-8 px-6 text-center bg-global lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
        <p className="text-lg leading-6 font-medium text-gray-900">
        </p>
        <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900">
          <span>
            {plan.monthlyPriceHumanAmount}
          </span>
          <span className="ml-3 text-xl font-medium text-gray-500">
            / mo
          </span>
        </div>
        <div className="mt-6">
          <div className="rounded-md shadow">
            <a href="#" onClick={() => {setStage(plan)}} className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900">
              {plan.buttonCta}
            </a>
          </div>
        </div>
      </div>
    </div>    
  )
}

export default function PlanTab({user}) {
  const [stage, setStage] = useState(null);

  if (stage == null) {
    return <AdvertisePlan setStage={setStage} />
  } else {
    return <PlanSelect user={user} plan={stage} />
  }
}