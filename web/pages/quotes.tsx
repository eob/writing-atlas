import PrismaClient from '../lib/PrismaClient'
import {GetEntities, GetEntitiesCount} from "../lib/hf-server"
import {SearchBox} from '../components/search/SearchBox'
import PAGE_WIDTH from './authors/[...slug]';

export async function getStaticProps({params}) {
  const prisma = PrismaClient();
  const query = { entityType: "PERSON", entitySubType: "AUTHOR" };
  let page = 1

  const entitiesCount = await GetEntitiesCount(prisma, query);
  if ((page-1)*(PAGE_WIDTH as any as number) > entitiesCount) {
    return null;
  }
  const authors = await GetEntities(prisma, { page, ...query });
  return {
    props: {
      authors,
      entitiesCount,
      page: page
    }
  };
}
  
export default function Quotes({}) {
  return (
    <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
      <div className="text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">What does</span>
          <span className="block text-indigo-600 xl:inline">THING</span>
        </h1>
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">think about</span>
          <span className="block text-indigo-600 xl:inline">things</span>
        </h1>
        <a href="/quote/authors/topic/0">Go</a>
    </div>
    </main>    
  )
}
