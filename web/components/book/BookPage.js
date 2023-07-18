import Link from "next/link"

import Head from '..//utility/site/Head'
import Header from '..//utility/site/Header'

import BookTitle from './BookTitle'
import { useRouter } from "next/router"

const CustomTabCommon = "block cursor-pointer md:ml-4 px-3 py-2 text-sm focus:outline-none focus:bg-gray-300"
const CustomTabSelected = `${CustomTabCommon} text-black rounded font-bold bg-gray-200 md:bg-none`
const CustomTabUnSelected = `${CustomTabCommon} text-gray-600 font-regular`

const tabs = ['description']

export default function BookPage({ book, children }) {
  const router = useRouter()
  let selectedTab = 0

  try {
    const lastElement = router.pathname.split('/').pop()
    selectedTab = Math.max(tabs.indexOf(lastElement), 0)  
  } catch(e) {
    console.log(e)
  }

  return (
    <React.Fragment>
      <Head title={book.title} />      
      <Header />
      <BookTitle book={book} />      
      <div className="relative bg-global pt-12 md:pt-16 pb-20 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="pr-5 pl-5 pb-6">
              <Link href={`/story/[bookhandle]/description`} href={`/story/${book.handle}/description`}>
                <a className={(selectedTab == 0) ? CustomTabSelected : CustomTabUnSelected}>Description</a>
              </Link>
            </div>
            <div className="flex-1 pr-5 pl-5">
              {children}
            </div>
          </div>      
        </div>
      </div>
    </React.Fragment>
  )
}



