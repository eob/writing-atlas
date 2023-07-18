import React from 'react';

import Layout from '../components/layout';
import { useUser } from '@auth0/nextjs-auth0';

function RequirePerms({user, loading, id, children}) {
  if (user) { return children }
  if (loading) { return "Loading..." }
  return (
    <div>
      <a href="/api/auth/login">Login to view</a>
    </div>
  )
}

export default function Profile() {
  const { user, isLoading } = useUser();
  return (
    <Layout user={user} loading={isLoading}>
      <h1>Profile</h1>
      <RequirePerms user={user} loading={isLoading}>
        <p>Profile:</p>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </RequirePerms>
    </Layout>
  );
}
