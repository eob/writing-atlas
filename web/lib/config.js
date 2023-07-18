if (typeof window === 'undefined') {
  /**
   * Settings exposed to the server.
   */
  module.exports = {
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_CLIENT_ID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    AUTH0_SCOPE: process.env.NEXT_PUBLIC_AUTH0_SCOPE,
    AUTH0_DOMAIN: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
    REDIRECT_URI: process.env.NEXT_PUBLIC_REDIRECT_URI,
    POST_LOGOUT_REDIRECT_URI: process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI,
    SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
    SESSION_COOKIE_LIFETIME: process.env.SESSION_COOKIE_LIFETIME,
    API_BASE_URL: process.env.API_BASE_URL,
    SEARCH_URL: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === 'staging' ? process.env.NEXT_PUBLIC_SEARCH_URL_STAGING : process.env.NEXT_PUBLIC_SEARCH_URL,
    SEARCH_KEY: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === 'staging' ? process.env.NEXT_PUBLIC_SEARCH_KEY_STAGING : process.env.NEXT_PUBLIC_SEARCH_KEY
  };
} else {
  /**
   * Settings exposed to the client.
   */
  module.exports = {
    AUTH0_CLIENT_ID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    AUTH0_SCOPE: process.env.NEXT_PUBLIC_AUTH0_SCOPE,
    AUTH0_DOMAIN: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
    REDIRECT_URI: process.env.NEXT_PUBLIC_REDIRECT_URI,
    POST_LOGOUT_REDIRECT_URI: process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI,
    SEARCH_URL: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === 'staging' ? process.env.NEXT_PUBLIC_SEARCH_URL_STAGING : process.env.NEXT_PUBLIC_SEARCH_URL,
    SEARCH_KEY: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === 'staging' ? process.env.NEXT_PUBLIC_SEARCH_KEY_STAGING : process.env.NEXT_PUBLIC_SEARCH_KEY
  };
}
