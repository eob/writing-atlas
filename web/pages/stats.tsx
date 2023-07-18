import PrismaClient from '../lib/PrismaClient'
import {GetEntitiesCount} from "../lib//hf-server"
import {GetFilesCount} from "../common/db/GetFilesCount"
import {GetTagsCount} from "../common/db/GetTagCount"
import Head from '../components/utility/site/Head'
import Layout from '../components/layout'
import Header from '../components/utility/site/Header'

export async function getStaticProps({params}) {
  const prisma = PrismaClient();
  const authorCount = await GetEntitiesCount(prisma, {entityType: "PERSON", entitySubType: "AUTHOR"});
  const publicationCount = await GetEntitiesCount(prisma, {entityType: "ORG", entitySubType: "PUBLICATION"});
  const fileCount = await GetFilesCount(prisma, {});
  
  return {
    props: {
      fileCount,
      authorCount,
      publicationCount
    }
  }
}

export default function Page({
  fileCount,
  authorCount,
  publicationCount,
  honorCount,
  tagCount,
  fileTagCount,
  fileHonorCount,
  collectionCount
}) {
  return (
    <Layout user={null} loading={false}>
      <Head title="Stats Writing Atlas" />
      <Header showBooks={false} showAuthor={false} showBook={false} />
      <div className="bg-gray-50 pt-12 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Database Statistics
            </h2>
            <p className="mt-3 text-xl text-gray-500 sm:mt-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus repellat laudantium.
            </p>
          </div>
        </div>
        <div className="mt-10 pb-12 bg-white sm:pb-16">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-50"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                  <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Stories
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-indigo-600">
                      {fileCount}
                    </dd>
                  </div>
                  <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Authors
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-indigo-600">
                      {authorCount}
                    </dd>
                  </div>
                  <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Publications
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-indigo-600">
                      {publicationCount}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>


    </Layout>
  )
}