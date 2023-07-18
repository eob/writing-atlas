import Layout from '../account/Layout'
import {SideTabs} from '../tabs/Tabs';
import UsersTab from './UsersTab'
import Link from 'next/link'

export default function Page({user}) {
  let panels = [
    <UsersTab user={user} />, 
  ]

  const tabs = {
    slug: 'page',
    labels: ['Users'],
    keys: ['users'],
    asHref: `/stacks`,
    panels: panels
  }

  return (
    <Layout title="The Stacks">
      <SideTabs {...tabs} Link={Link} />
    </Layout>
  )
}