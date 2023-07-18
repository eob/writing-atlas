import React, {useState} from 'react';
import PlanSelect from './PlanSelect'
import StripePlans from '../../common/stripe/StripePlans'
import { CardTitleFooter } from '../cards/CardTitleFooter'
import useApi from '../../lib/use-api';

function ApiKey({user}) {
  const { response, error, isLoading } = useApi(`/api/v1/account/api`);
  return (
    <CardTitleFooter title="API">
      <dl className="sm:divide-y sm:divide-gray-200">
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">
            API Key
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {(response && response.token) && response.token}
          </dd>
        </div>
      </dl>
    </CardTitleFooter>
  )
}

export default function ApiTab({user}) {
  return <ApiKey user={user} />
}