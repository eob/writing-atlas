import FullWidthTitle from '../utility/panels/FullWidthTitle'
import Layout from '../layout'
import Head from '../utility/site/Head'
import Header from '../utility/site/Header'

export default function AccountLayout({children, title="My Account"}) {
  return (
    <Layout>
      <Head title="Account" />      
      <Header />
      <FullWidthTitle
        title={title}
      />
      <div className="relative bg-global pt-12 md:pt-16 pb-20 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </Layout>
  )
}