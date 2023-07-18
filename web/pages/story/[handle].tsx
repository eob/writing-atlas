import Link from "next/link"

import Head from '../../components/utility/site/Head'
import Header from '../../components/utility/site/Header'

import BookTitle from '../../components/book/BookTitle'
import { BookmarkIcon } from '@heroicons/react/solid'
import {getAuthorLink, getPublicationLink, getPublicationDate} from '../../components/book/DataExtractors'
import UnknownError from '../../components/utility/indicators/Error'

import Error404 from '../../components/utility/indicators/404'
import useApi from '../../lib/use-api';
import PrivateBetaNotice from "../../components/utility/indicators/PrivateBetaNotice"
import LoginError from '../../components/utility/indicators/Login'
import Layout from '../../components/layout'
import { useRouter } from 'next/router'
import LoadingIndicator from '../../components/utility/indicators/Loading'
import { GetFiles } from '../../common/db/GetFiles'
import { useUser } from '@auth0/nextjs-auth0';
import { Tag } from '../../components/tag/Tag'
import React from "react"
import GetAuthorFromBook from '../../common/db/GetAuthorFromBook'
const CreateClient = require('../../lib/PrismaClient')

export async function getStaticProps({params}) {
  const prisma = CreateClient.default();
  const books = await GetFiles(prisma, {take: 1, fileLinks: true, fileHandle: params.handle, withLoglines: false});
  
  if (books && books.length > 0) {
    let book = books[0]
    let entities = await GetAuthorFromBook(book)
    let author = entities.author

    return {
      props: {
        book,
        author,
        entities
      }
    };  
  } else {
    return {
      props: {
        notFound: true
      }
    }
  }
}

export async function getStaticPaths() {
  const prisma = CreateClient.default();

  // const prisma = new PrismaClient();
  const books = await GetFiles(prisma, {})

  // const combos = books.map((boo/) => {
  //   return {
  //     params: { 
  //       bookhandle: String(book.handle) 
  //     }
  //   }
  // }).filter((x) => x != null)
  // There are too many! Let it lazily generate
  const combos = [];
  return {
    paths: combos,
    fallback: true
  };
}

export function Block({title=null, subtitle=null, highlight=false, children}) {
  
  const highlightStyle = highlight ? 'bg-yellow-50 border border-yellow-300' : 'bg-white';

  return (
    <div className={`${highlightStyle} shadow overflow-hidden sm:rounded-lg my-8`}>
      {title && (
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
          {subtitle && (
            <p className="max-w-2xl mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
      )}
      <div className={`${title ? "border-t border-gray-200" : ""} px-4 py-5 sm:px-6`}>
        {children}
      </div>
    </div>
  )
}

export function KV({title, children}) {
  return (
    <React.Fragment>
      <dt className="text-sm font-medium text-gray-500">{title}</dt>
      <dd className="mt-1 text-gray-900">{children}</dd>
    </React.Fragment>
  )
}

function InlineTagBlock({prefix=null, title=null, tags}) {
  if (tags.length == 0) {
    return null;
  }
  return (
    <div className="flex flex-wrap">
      {tags.map(ft => <Tag key={ft.tag.handle} handle={ft.tag.handle} label={ft.tag.name} kind={ft.tag.kind} />)}
    </div>
  )
}

function NewTagBlock({prefix, title, tags, color}) {
  if (tags.length == 0) {
    return null;
  }
  return (
    <div className="mb-8 sm:col-span-2">
      <KV title={title}>
        <InlineTagBlock prefix={prefix} tags={tags} />
      </KV>
    </div>  
  )
}


function Links({book}) {
  if (!(book && book.file_links)) {
    return null;
  }

  let links = book.file_links.map(x => x.link).map(link => {
    let name = link.name;
    if (link.url.indexOf(".tor.com/") > -1) {
      name = "Read on TOR.com"
    }
    return (
      <a target="_blank" href={link.url} className="relative flex p-4 border border-gray-200">
        <svg className="w-6 h-6 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <label htmlFor="settings-option-0" className="flex flex-col ml-3 cursor-pointer">
          {link.name}
        </label>
      </a>
    )
  })

  return (
    <Block title="Links">
      <div className="mt-1 -space-y-px bg-white rounded-md shadow-sm">
        {links}
      </div>
    </Block>
  )
}

export function SummaryBlock({text}) {
  if (text) {
    return (
      <Block>
        <KV title="Logline">
          <span className="text-xl font-semibold">{text}</span>
        </KV>
      </Block>
    )
  } else {
    return null;
  }
}

export function AboutBlock({book, honors, entities, author}) {
  let {name: authorName, url: authorUrl} = getAuthorLink({entities, file: book, author});
  let {name: publicationName, url: publicationUrl} = getPublicationLink({entities, file: book, author});
  let publicationDate = getPublicationDate({book: book})

  let publicationPlace = null
  if (publicationUrl && publicationName) {
    publicationPlace = <a href={publicationUrl} className="colored">{publicationName}</a>
  } else if (publicationName) {
    publicationPlace = publicationName
  } else {
    publicationPlace = null
  }
  
  return (
    <Block title="Key Information">
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <KV title="Author"><a className="colored" href={authorUrl}>{authorName}</a></KV>
        </div>
        {publicationPlace && (
          <div className="sm:col-span-1">
            <KV title="Published In">{publicationPlace ? publicationPlace : "Unknown"}</KV>
          </div>
        )}
        {publicationDate && (
          <div className="sm:col-span-1">
            <KV title="Publication Year">{publicationDate ? publicationDate : "Unknown"}</KV>
          </div>
        )}
        {book.wordCount && (
          <div className="sm:col-span-1">
            <KV title="Words">{book.wordCount}</KV>
          </div>
        )}
        {(honors && (honors.length > 0)) && (
          <div className="sm:col-span-2">
            <KV title="Honors">
              <div className="border border-gray-200 divide-y divide-gray-200 rounded-md">
                {honors.map((honor) => {
                  let tag = honor.tag;
                  if (!tag) { return null }
                  return (
                    <a href={`/honor/${tag.handle}`} className="flex items-center py-3 pl-3 pr-4 text-sm hover:bg-blue-100 place-content-start">
                      <div className="flex items-center flex-1 w-0">
                        <BookmarkIcon className="flex-shrink-0 w-5 h-5 text-gray-400" aria-hidden="true" />
                        <span className="ml-2">{tag.name}</span>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {honor.role}, {honor.year}
                      </div>
                    </a>
                  )
                })}
              </div>
            </KV>
          </div>
        )}
      </div>
    </Block>
  )
}


export default function Page({ book, author, entities, notFound }) {
  const router = useRouter()
  const { user, isLoading } = useUser();
  const userLoading = isLoading;
  if (router.isFallback) {
    return <LoadingIndicator />
  }

  if (notFound) {
    // @eric-zhizu: It seems like the /api/v1/book URL doesn't exist. It returns an HTML page, not a JSON object
    // resulting in an "Unexpected token < at JSON position 0" error.

    // const { handle } = router.query
    // const { response, error, isLoading } = useApi(`/api/v1/book/${handle}`);
    // if (isLoading) {
    //   return (<LoadingIndicator />)
    // }
    // if (error) {
    //   if (error.code == "invalid_session") {
    //     return (<LoginError />)
    //   } else if (error.code == 'insufficient_scope') {
    //     return (<PrivateBetaNotice />)
    //   } else {
    //     return (<UnknownError message={`[${error.code}] ${error.error}`} />)
    //   }
    // }
    // if (typeof response == 'undefined') {
    //   return (<UnknownError message="Missing result from server." />)
    // }
    // if (response && response.message) {
    //   return (<Error404 message="Page not found." />)
    // }
    //
    // book = null
    // if (response && response.data) {
    //   book = response.data
    // }
  }

  if (! book) {
    return (<Error404 message="Page not found." />)
  }
 
  let tags = []
  let genres = []
  let characters = []
  let settings = []
  let collections = []
  let honors = []
  let ifyoulike = []

  if (book.file_tags) {
    for (let ft of book.file_tags) {
      if (ft.tag.kind == "TAG") {
        if (ft.tag.subKind == "Genre") {
          genres.push(ft)
        } else if (["Setting", "Geography", "Time Setting", "Time Period"].includes(ft.tag.subKind)) {
          settings.push(ft)
        } else if (["Character", "Demographics", "Protagonist"].includes(ft.tag.subKind)) {
          characters.push(ft)
        } else {
          tags.push(ft)
        }
      }
      else if (ft.tag.kind == "COLLECTION") { collections.push(ft) }
      else if (ft.tag.kind == "HONOR") { honors.push(ft) }
      else if (ft.tag.kind == "IFYOULIKE") { ifyoulike.push(ft) }
    }
  }

  return (
    <Layout user={user}>
      <Head title={book.name} />      
      <Header />
      <BookTitle user={user} loading={userLoading} book={book} author={author} hearted={false} />

      <div className="relative pt-12 pb-20 bg-gray-50 md:pt-10 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8">
        <div className="relative max-w-4xl mx-auto">
          <section className="overflow-hidden">
            <div className="relative px-4 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:pb-20">

            <SummaryBlock text={book.logline} />
            <AboutBlock book={book} author={author} honors={honors} entities={entities} />

            <Block title="Tags and Categorization" subtitle={
              <span>Prepared by hand by our <a target="_blank" className="colored" href="/about#fellows">Writing Atlas Fellows</a>.</span>
            }>
              <NewTagBlock prefix={"collection"} title="Collections" tags={collections} color="green" />
              <NewTagBlock prefix={"genre"} title="Genres" tags={genres} color="green" />
              <NewTagBlock prefix={"character"} title="Characters" tags={characters} color="green" />
              <NewTagBlock prefix={"setting"} title="Settings" tags={settings} color="green" />
              <NewTagBlock prefix={"tag"} title="Tags" tags={tags} color="green" />
              <NewTagBlock prefix={"collection"} title="Read if you like..." tags={ifyoulike} color="green" />
            </Block>
              { book.summary && (
                <Block title="Summary">
                  <p className="font-md">{book.summary}</p>
                </Block>
              )}
              {book.storyTextURL && (
                <button className="px-3 py-1 my-1 mr-2 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full whitespace-nowrap">
                  <a href={book.storyTextURL}>
                    Read full story ->
                  </a>
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}
