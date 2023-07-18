import { useUser } from '@auth0/nextjs-auth0';
import { createLoginUrl, createLogoutUrl } from "./LogInOutHelper";
import React from "react";

// eslint-disable-next-line react/prop-types
function Button({ url, label }) {
  return (
    <span className="inline-flex rounded-md shadow-sm">
      <a
        href={url}
        className="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
      >
        {label}
      </a>
    </span>
  );
}

// eslint-disable-next-line react/prop-types
function ButtonSm({ url, label }) {
  return (
    <span className="inline-flex rounded-md shadow-sm">
      <a
        href={url}
        className="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900"
      >
        {label}
      </a>
    </span>
  );
}

// eslint-disable-next-line react/prop-types
function Link({ url, label }) {
  return (
    <a
      href={url}
      className="text-base leading-6 text-gray-500 hover:text-gray-900"
    >
      {label}
    </a>
  );
}

export function LogInOut({ type, redirectTo }) {
  const { user, error, isLoading } = useUser();
 if (!isLoading && user) {
    // LOGOUT
    const url = createLogoutUrl(redirectTo);
    const label = "Sign out";
    if (type == "button") {
      return <ButtonSm url={url} label={label} />;
    } else {
      return <Link url={url} label={label} />;
    }
  } else {
    // LOGIN
    const url = createLoginUrl(redirectTo);
    const label = "Sign in";
    if (type == "button") {
      return <Button url={url} label={label} />;
    } else if (type == "buttonSmall") {
      return <Button url={url} label={label} />;
    } else {
      return <Link url={url} label={label} />;
    }
  }
}
