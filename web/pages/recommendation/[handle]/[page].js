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
    tagType: "IFYOULIKE",
    tagHandle: params.handle,
    pageWidth: PAGE_WIDTH,
    page: params.page,
    allowEmpty: true
  })
}

export async function getStaticPaths() {
  return emptyStaticPaths()
}

function Page({
  handle,
  tag, 
  files,
  notFound, 
  noItemsFound,
  fileCount = 0,
  page
}) {
  const { user, isLoading } = useUser();

  const dynamicItemLoadUrl = ((page < 2) && (handle == 'favorites')) ? '/api/v1/tag/LIST/favorite/FILE' : null;
  return (
    <ListPageWrapper
      tag={tag}
      items={files}
     notFound={notFound}
     noItemsFound={noItemsFound}
      notFoundNounPl = 'stories'
      searchNotFoundPrefix = 'No stories tagged'
      supertitle = {`Read if you like..`}
      supertitleLink = '/recommendations'
      facetCategory = 'recommendationHandles'
      titlePrefix = ''
      searchIndex = "file"
      tagSuggestions = {false}
      allFilesCount={fileCount}
      slug= {`recommendation/${tag ? tag.handle : ''}`}
      page={page}
      step={PAGE_WIDTH}
      user={user}
      ItemRow={BookRow}
      loading={isLoading}
      dynamicItemLoadUrl={dynamicItemLoadUrl}
    />
  );
}

export default Page;
