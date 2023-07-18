import { ListHeader } from '../lib/hf-react'
import Head from '../components/utility/site/Head'
import Header from '../components/utility/site/Header'
import Layout from '../components/layout'
import { useUser } from '@auth0/nextjs-auth0';
import { createLoginUrl, createUpgradeUrl } from '../components/account/LogInOutHelper'

import Router, {useRouter} from 'next/router';
import React, { useEffect, useState } from 'react';
import useApi from '../lib/use-api';
import {RequireData, RequireAuth, PleaseUpgrade, PleaseLogin, DataError} from '../components/account/Paywall'

function Card({title, subtitle, children}) {
  return (
    <div className="bg-white overflow-hidden shadow sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:p-6">
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {subtitle}
          </p>
        </div>
        <div className="px-2 py-2">
          {children}
        </div>
      </div>
    </div>
  )
}

function InternalView({user, data}) {
  return (
    <div>
      <p>You are logged in: Profile:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>Data.data.name is: {data.data.name}</p>
    </div>    
  )  
}

function ShowMockRealName({data}) {
  return (
    <span>{data.profile.name}</span>
  )
}

function ShowMockFakeName({data}) {
  return (
    <span>{data}</span>
  )
}

export default function Paywall({title, supertitle, supertitlelink, subtitle, description, children, headerProps}) {
  const { user, isLoading } = useUser();
  const router = useRouter()
  
  // { response, error, isLoading }
  const mockApiResp = useApi('/api/v1/mock/paywall');

  return (
    <Layout user={user} loading={isLoading}>
      <Head title={title} />
      <Header {...headerProps} />
      <ListHeader title="Paywall Support" supertitle="Test" description="The blocks below should render conditionally" />
      <div className="relative bg-white pt-8 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8">
        <div className="relative max-w-7xl mx-auto">

          {/* <Card title="Login Protected" subtitle="No payment required. Login required. Shows login blocker.">
            <RequireAuth user={user} loading={isLoading} loginMsg={<PleaseLogin inlineLink />}>
              <InternalView user={user} data={{data: {name: "Ted"}}} />
            </RequireAuth>
          </Card>

          <Card title="Login Protected & Data Required" subtitle="Case 1: Login required.">
            <RequireData>
              <InternalView user={user} />
            </RequireData>
          </Card>

          <Card title="Login Protected & Data Required" subtitle="Case 2: User loading.">
            <RequireData userLoading={true}>
              <InternalView user={user} />
            </RequireData>
          </Card>

          <Card title="Login Protected & Data Required" subtitle="Case 3: Missing data.">
            <RequireData user={user}>
              <InternalView user={user} />
            </RequireData>
          </Card>

          <Card title="Login Protected & Data Required" subtitle="Case 4: Data loading.">
            <RequireData user={user} dataLoading={true}>
              <InternalView user={user} />
            </RequireData>
          </Card>

          <Card title="Login Protected & Data Required" subtitle="Case 5: Data error.">
            <RequireData user={user} dataError={{code: 500, error: "Case 5 Data Error Message"}}>
              <InternalView user={user} />
            </RequireData>
          </Card>

          <Card title="Login Protected & Data Required" subtitle="Case 6: Data application error | needs_logn.">
            <RequireData user={user} data={{error: {type: "needs_login"}}}>
              <InternalView user={user} />
            </RequireData>
          </Card>

          <Card title="Login Protected & Data Required" subtitle="Case 7: Data application error | needs_upgrade.">
            <RequireData user={user} data={{error: {type: "needs_upgrade"}}}>
              <InternalView user={user} />
            </RequireData>
          </Card>

          <Card title="Login Protected & Data Required" subtitle="Case 8: Data application error | other.">
            <RequireData user={user} data={{error: {type: "fubar"}}}>
              <InternalView user={user} />
            </RequireData>
          </Card>

          <Card title="Login Protected & Data Required" subtitle="Case 9: It works.">
            <RequireData user={user} data={{data: {name: "ted"}}}>
              <InternalView user={user} data={{data: {name: "ted"}}} />
            </RequireData>
          </Card> */}

          <Card title="Real Simulation" subtitle="This requires the pro plan!">
            <h1>This is an example of real API data</h1>

            <ul>
              <li><b>Real Name: </b>
                <RequireData 
                  user={user} 
                  dataLoading={mockApiResp.isLoading}
                  dataError={mockApiResp.error}
                  data={mockApiResp.response}
                  childElementFn={ShowMockRealName} />
              </li>
              <li><b>Basic Paywalled Name: </b>
                <RequireData 
                  user={user} 
                  dataLoading={mockApiResp.isLoading}
                  dataError={mockApiResp.error}
                  data={mockApiResp.response}
                  childElementFn={ShowMockFakeName}
                  dataInner={(x) => x.profile.basicName} />
              </li>
              <li><b>Pro Paywalled Name: </b>
                <RequireData 
                  user={user} 
                  dataLoading={mockApiResp.isLoading}
                  dataError={mockApiResp.error}
                  data={mockApiResp.response}
                  childElementFn={ShowMockFakeName}
                  dataInner={(x) => x.profile.proName} />
              </li>
            </ul>       
          </Card>

        </div>
      </div>
    </Layout>
  );
}