import Head from '../components/utility/site/Head'
import Layout from '../components/layout'
import Header from '../components/utility/site/Header'
// import CreateClient from '../lib/PrismaClient'
import Footer from '../components/utility/site/Footer'
import PrismaClient from '../lib/PrismaClient'
import {createLoginUrl} from '../components/account/LogInOutHelper'
import { titleCase } from "title-case";
import { BuildCats } from '../components/featured/cat_builder'

// import {Meeting2_Content} from './meetings/002-read-robin-cook-learned-dialogue'


export async function getStaticProps() {
  const prisma = PrismaClient()

  let links = await BuildCats(prisma)
  return {
    props: {
      links
    }
  };
}

function Link({name, handle, slug="tag"}) {
  return <a className="whitespace-nowrap inline-block colored pr-4" href={`/${slug}/${handle}`}>{titleCase(name)}</a>
}

function LinkList({links, slug}) {
  if (!links) {
    links = []
  }
  links.sort((a, b) => {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  })
  return links.map(y => <Link slug={slug} {...y} />)
}

function Card({title, body, image, seeAll, width = 2, seeAllLink}) {
  let col = (width == 4) ? "col-span-4" : (width == 1) ? "col-span-1" : "col-span-2";
  
  return (
    <div className={`flex flex-col rounded-lg shadow-lg overflow-hidden ${col}`}>
      <div className="flex-shrink-0">
        <img className="h-48 w-full object-cover" src={`/images/topics/${image}.png`} alt={title} />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <a href="#" className="block mt-2">
            <p className="text-xl font-semibold text-gray-900">
              {title}
            </p>
            <p className="mt-3 text-base text-gray-500">
              {body}
            </p>
          </a>
        </div>
        {seeAll && (
          <div className="mt-6 flex items-center">
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                <a href="#" className="hover:underline">
                  See All Locations
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>    
  )
}

function HeroSection() {
  return (
    <div className="mt-10">    
      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100"></div>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
            <div className="absolute inset-0">
              <img className="h-full w-full object-cover" src="/images/jaredd-craig-HH4WBGNyltc-unsplash.jpg" alt="Writing Atlas" />
              <div className="absolute inset-0 bg-indigo-700" style={{"mixBlendMode": "multiply"}}></div>
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">An atlas of</span>
                <span className="block text-indigo-200">wonderful short stories</span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                We are building the world's best collection of short stories for you to discover, read, and share.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LinkSection({title, linkBlocks, image, subtitle, cols="lg:grid-cols-6"}) {
  let links = linkBlocks.map(x => (
    <Card
      key={x.title}
      title={x.title}
      image={x.image}
      width={x.width}
      body={<LinkList key={x.slug} slug={x.slug || "tag"} links={x.links} />}
     />
  ))

  return (
    <div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="relative mb-10">
          <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 max-w-3xl mx-auto text-center text-xl text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
        <dl className={`space-y-10 lg:space-y-0 lg:grid ${cols} lg:gap-8`}>
          {links}
        </dl>
      </div>
    </div>      
  )  
}

function PremiumSection() {
  const loginUrl = createLoginUrl('/reach-out');

  return (
    <div className="py-16 sm:py-24">
      <div className="relative sm:py-16">
        <div aria-hidden="true" className="hidden sm:block">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl"></div>
          <svg className="absolute top-8 left-1/2 -ml-3" width="404" height="392" fill="none" viewBox="0 0 404 392">
            <defs>
              <pattern id="8228f071-bcee-4ec8-905a-2a059a2cc4fb" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="392" fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
          </svg>
        </div>
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="relative rounded-2xl px-6 py-10 bg-indigo-600 overflow-hidden shadow-xl sm:px-12 sm:py-20">
            <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
                <path className="text-indigo-500 text-opacity-40" fill="currentColor" d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z" />
                <path className="text-indigo-700 text-opacity-40" fill="currentColor" d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z" />
              </svg>
            </div>
            <div className="relative">
              <div className="sm:text-center">
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  Need help clearing short story rights for screen adaptation, education uses or translation?
                </h2>
                <p className="mt-6 mx-auto max-w-2xl text-lg text-indigo-200">
                  <a target="_blank" href="/about" className="underline font-bold">Our team</a>&nbsp;
                  of readers, researchers and data experts can help you with the process.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-3 text-center">
                <a href={"mailto:contact@writingatlas.com"} className="mt-10 inline-block px-10 rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>    
  )
}

export default function Home({ links }) {
  return (
    <div className="relative bg-gray-50">
      <Head />
      <Header title="Writing Atlas" />
      <main>
        <HeroSection />
        <LinkSection 
          title="Browse by Theme" 
          linkBlocks={links.filter(x => (x.block == 1))} 
          subtitle={<span>Or <a href="/tags" className="colored">search all themes</a></span>}
          />
        <LinkSection 
          title="Award Winners and Expert Curations" 
          linkBlocks={links.filter(x => (x.block == 2))} 
          cols="lg:grid-cols-2"
        />
        <PremiumSection />
      </main> 
      <Footer />
    </div>

  )
}


    // {/* <Layout>
    //   <Head />
    //   <Header title="Writing Atlas" />
    //   <div className="py-12">
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:py-24">
    //       <div className="lg:text-center">
    //         <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
    //           An atlas of wonderful stories
    //         </p>
    //         <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
    //           For you to browse, discover, and read. <br />
    //           Sign in above to get on our mailing list 
    //         </p>
    //       </div>
    //     </div>
    //   </div>


    // </Layout> */}