import {PowerSearch} from '../../components/power_search/ui/PowerSearch'
import Head from '../../components/utility/site/Head'
import Layout from '../../components/layout'
import Header from '../../components/utility/site/Header'
import { useUser } from '@auth0/nextjs-auth0';

export default function Page(props) {
  const { user, isLoading } = useUser();
  return  (
    <Layout user={user} loading={isLoading}>
      <Head title="Search" />
      <Header />
      <PowerSearch user={user} userIsLoading={isLoading} {...props} />
    </Layout>
  )
}