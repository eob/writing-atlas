// pages/_app.jsx
import '../styles/index.css'
import Router from "next/router";
// import withGA from "next-ga";
import config from '../lib/config';
import { UserProvider } from '@auth0/nextjs-auth0';

// const onRedirectCallback = (appState) => {
//   // Use Next.js's Router.replace method to replace the url
//   Router.replace(appState?.returnTo || '/');
// };

function MyApp({ Component, pageProps }) {
  const { user } = pageProps;
  return (
    <UserProvider user={user}>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp;
// export default withGA("UA-170123443-1", Router)(MyApp);
