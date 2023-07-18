import {tagStaticProps, emptyStaticPaths} from '../../../components/tag/Props'
import PrismaClient from '../../../lib/PrismaClient'
import { useUser } from '@auth0/nextjs-auth0';
import BookRow from '../../../components/book/BookRow'
import {ListPageWrapper} from '../../../components/lists/ListPageWrapper'

export const PAGE_WIDTH = 10

export async function getStaticProps({params}) {
  const prisma = PrismaClient()
  return tagStaticProps({
    prisma,
    tagType: "HONOR",
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
      supertitle = {`Honor`}
      supertitleLink = '/honors'
      facetCategory = 'honorHandles'
      titlePrefix = ''
      searchIndex = "file"
      tagSuggestions = {false}
      allFilesCount={fileCount}
      slug= {`honor/${tag ? tag.handle : ''}`}
      page={page}
      step={PAGE_WIDTH}
      user={user}
      ItemRow={BookRow}
      loading={isLoading}

    />
  );
}

export default CollectionPage;
