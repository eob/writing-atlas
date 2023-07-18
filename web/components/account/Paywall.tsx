import { createLoginUrl, createUpgradeUrl } from '../account/LogInOutHelper'
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import useApi from '../../lib/use-api';

export function PleaseLogin({returnToUrl, inlineLink}) {
  return (
    <a className="colored" href={createLoginUrl(returnToUrl)}>Login to view</a>
  )
}

export function PleaseUpgrade({returnToUrl, inlineLink}) {
  return (
    <a className="colored" href={createUpgradeUrl(returnToUrl)}>Upgrade to view</a>
  )
}

export function DataError({code=null, message=null}) {
  if (!message) {
    message = "Error fetching data."
  }
  return (
    <span>{message}</span>
  )
}

export function RequireAuth({user, loading, children, loadingMsg, loginMsg}) {
  if (user) { return children }
  if (loading) { return loadingMsg || "Loading..." }
  return loginMsg || (
    <a href="/api/auth/login">Login to view</a>
  )
}

export function RequireData({
  user, userLoading, 
  data, dataLoading, dataError, dataInner,
  loadingMsg, loginMsg, upgradeMsg, errMsg,
  children, childElementFn, requireUser=true
}) {

  const [url, setUrl] = useState('#');

  useEffect(() => {
    setUrl(Router.asPath);
  });

  // If we don't have a user..
  if (userLoading) return loadingMsg || "Loading...";
  if (requireUser && (! user)) return loginMsg || (<PleaseLogin returnToUrl={url} inlineLink />);

  // If we don't have data...
  if (dataLoading) return loadingMsg || "Loading...";
  if (dataError) {
    if (dataError.error == "not_authenticated") {
      if (loginMsg) {
        return loginMsg
      }
    }
    if (errMsg) return errMsg
    return <DataError code={dataError.code} message={dataError.error} />
  }

  if (! data) {
    return errMsg || <DataError message="No data available." />
  }

  if (dataInner) {
    try {
      data = dataInner(data)
    } catch(ex) {
      return errMsg || <DataError message="No data available." />
    }
  }

  // We have data
  if (data.error) {
    if (data.error.type == "needs_login") {
      return loginMsg || <PleaseLogin returnToUrl={url} inlineLink />
    } else if (data.error.type == "needs_upgrade") {
      return upgradeMsg || <PleaseUpgrade returnToUrl={url} inlineLink />
    } else {
      return errMsg || <DataError />
    }
  }

  // We have no data
  let theData;
  if (data.data) {
    theData = data.data
  } else if (data) {
    theData = data
  }
  if (! theData) {
    return errMsg || <DataError message="No data available." />
  }

  if (childElementFn) {
    return childElementFn({data: theData, children: children})
  } else {
    return children
  }
}

export function UpgradeToSee({
  title,
  subtitle,
  button,
  user,
}) {
  const [url, setUrl] = useState('#');
  useEffect(() => {
    setUrl(Router.asPath);
  });

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="bg-indigo-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-1 lg:gap-4">
        <div className="pt-10 pb-12 px-6 sm:pt-8 sm:px-16 lg:py-8 lg:pr-0 xl:py-10 xl:px-20">
          <div className="lg:self-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">{title}</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-200">{subtitle}
            </p>
            <a
              href={user ? createUpgradeUrl(url) : createLoginUrl(url)}
              className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-indigo-600 hover:bg-indigo-50"
            >
              {button}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

