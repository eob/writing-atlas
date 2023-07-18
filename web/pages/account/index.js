import Page from '../../components/account/Page'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

function Account() {
  const { user, error, isLoading } = useUser();
  return (
    <Page user={user} />
  )
}

export default withPageAuthRequired(Account)
