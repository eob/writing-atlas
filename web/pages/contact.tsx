import Image from 'next/image'
import Head from '../components/utility/site/Head'
import Layout from '../components/layout'
import Header from '../components/utility/site/Header'

export function Person({name, title=null, photo=null, children}) {
  return (
    <li>
      <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
        <div className="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
          <img className="object-cover shadow-lg rounded-lg" src={photo} alt={`Photo of ${name}`} />
        </div>
        <div className="sm:col-span-2">
          <div className="space-y-4">
            <div className="text-lg leading-6 font-medium space-y-1">
              <h3>{name}</h3>
              <p className="text-indigo-600">{title}</p>
            </div>
            <div className="text-lg">
              <p className="text-gray-500">{children}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default function About() {
  return (
    <Layout user={null} loading={false}>
      <Head title="Contact Writing Atlas" />
      <Header showBooks={false} showAuthor={false} showBook={false} />
      <div className="bg-white">
        <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Contact Us</h2>
            <p>
              We want to year your feedback! Please reach out to us at <a href="mailto:contact@writingatlas.com">contact@writingatlas.com</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}