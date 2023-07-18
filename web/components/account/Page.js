
//new file user info
import Layout from './Layout';
import { SideTabs } from '../tabs/Tabs';
import PlanTab from './PlanTab';
import ProfileTab from './ProfileTab';
import Dashboard from './Dashboard';
import ApiTab from './ApiTab';
import Link from 'next/link';


export default function Page({ user, children }) {
  let panels = [
    <ProfileTab user={user} />,
    <Dashboard user={user} />,
    <PlanTab user={user} />,
    <ApiTab user={user} />
  ];

  const tabs = {
    slug: 'page',
    labels: ['Profile','Dashboard', 'Plan', 'API'],
    keys: ['profile', 'Dashboard', 'plan', 'api'],
    asHref: `/account`,
    panels: panels
  };

  return (
    <Layout>
      <SideTabs {...tabs} Link={Link} />
    </Layout>
  );
}
