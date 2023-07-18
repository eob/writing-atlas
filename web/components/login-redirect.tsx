import Router from 'next/router';
import React, { useEffect } from 'react';

import Layout from './layout';
import { createLoginUrl } from './account/LogInOutHelper'
import Head from './utility/site/Head'
import Header from './utility/site/Header'
import { useUser } from '@auth0/nextjs-auth0';


import { useRouter } from 'next/router'

export default function RedirectToLogin({
  title, message
}) {
  const { user, error, isLoading } = useUser();
  const router = useRouter()


  useEffect(() => {
    window.location.assign(createLoginUrl(router.asPath));
  })
  return (
    <Layout user={user} loading={isLoading}>
      <Head title="Login" />      
      <Header />
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  {title || "Welcome!"}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {message || "Redirecting you to sign in..."}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
