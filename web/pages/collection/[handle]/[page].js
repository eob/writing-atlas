import {tagStaticProps, emptyStaticPaths} from '../../../components/tag/Props'
import PrismaClient from '../../../lib/PrismaClient'
import { useUser } from '@auth0/nextjs-auth0';
import BookRow from '../../../components/book/BookRow'
import {ListPageWrapper} from '../../../components/lists/ListPageWrapper'
import RedirectToLogin from '../../../components/login-redirect';

export const PAGE_WIDTH = 10

export async function getStaticProps({params}) {
  const prisma = PrismaClient()
  return tagStaticProps({
    prisma,
    tagType: "COLLECTION",
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
  fileCount = 0,
  noItemsFound,
  page
}) {
  const { user, isLoading } = useUser();

  if ((handle == "favorites") && (isLoading == false) && (user == null)) {
    return <RedirectToLogin title="Favorite Stories" url="/collection/favorites" />
  } else if (handle == "favorites") {
    tag = {
      handle: "favorites",
      name: "Favorites",
      kind: "LIST",
    }
  }

  const dynamicItemLoadUrl = ((page < 2) && (handle == 'favorites')) ? '/api/v1/all_favorites' : null;

  return (
    <ListPageWrapper
      tag={tag}
      items={files}
     notFound={notFound}
     noItemsFound={noItemsFound}
      notFoundNounPl = 'stories'
      searchNotFoundPrefix = 'No stories tagged'
      supertitle = {`Collection`}
      supertitleLink = '/collections'
      facetCategory = 'collectionHandles'
      titlePrefix = ''
      searchIndex = "file"
      tagSuggestions = {false}
      allFilesCount={fileCount}
      slug= {`collection/${tag ? tag.handle : ''}`}
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
