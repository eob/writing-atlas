import {tagStaticProps, emptyStaticPaths} from '../../../components/tag/Props'
import {ListPageWrapper} from '../../../components/lists/ListPageWrapper'

import PrismaClient from '../../../lib/PrismaClient'
import { useUser } from '@auth0/nextjs-auth0';
import BookRow from '../../../components/book/BookRow'

export const PAGE_WIDTH = 10

export async function getStaticProps({params}) {
  const prisma = PrismaClient()
  return tagStaticProps({
    prisma,
    tagType: "TAG",
    tagHandle: params.handle,
    pageWidth: PAGE_WIDTH,
    page: params.page
  })
}

export async function getStaticPaths() {
  return emptyStaticPaths()
}

function CollectionPage({
  tag, 
  files,
  notFound, 
  noItemsFound,
  fileCount = 0,
  page
}) {
  const { user, isLoading } = useUser();
  return (
    <ListPageWrapper
      tag={tag}
      items={files}
     notFound={notFound}
     noItemsFound={noItemsFound}
      notFoundNounPl = 'stories'
      searchNotFoundPrefix = 'No stories tagged'
      supertitle = {`Stories with Tag`}
      supertitleLink = '/tags'
      facetCategory = 'tagHandles'
      titlePrefix = ''
      tagSuggestions = {false}
      allFilesCount={fileCount}
      slug= {`tag/${tag ? tag.handle : ''}`}
      page={page}
      searchIndex = "file"
      ItemRow={BookRow}
      step={PAGE_WIDTH}
      user={user}
      loading={isLoading}
    />
  );
}

export default CollectionPage;
