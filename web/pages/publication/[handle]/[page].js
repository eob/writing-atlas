import BookRow from '../../../components/book/BookRow'
import PrismaClient from '../../../lib/PrismaClient'
import {entityFilesStaticProps, emptyStaticPaths} from '../../../components/entity/Props'
import { useUser } from '@auth0/nextjs-auth0';
import {ListPageWrapper} from '../../../components/lists/ListPageWrapper'

const PAGE_WIDTH = 10;

export async function getStaticProps({params}) {
  const prisma = PrismaClient()
  return entityFilesStaticProps({
    prisma,
    handle: String(params.handle),
    entityType: 'ORG',
    entitySubType: 'PUBLICATION',
    pageWidth: PAGE_WIDTH,
    page: params ? params.page : 1
  })
}

export async function getStaticPaths() {
  return emptyStaticPaths()
}

function Page({
  tag,
  entity,
  files,
  notFound, 
  noItemsFound,
  fileCount = 0,
  page
}) {
  const { user, isLoading } = useUser();
  return (
    <ListPageWrapper
      tag={null}
      items={files}
      notFound={notFound}
      noItemsFound={noItemsFound}
      headerProps={{showBooks: true}} 
      notFoundNounPl = 'stories'
      searchNotFoundPrefix = 'No stories yet from this publication'
      supertitle = {`Publication`}
      supertitleLink = '/publications'
      description = {entity ? entity.bio : null}
      facetCategory = {null}
      titlePrefix = {entity ? entity.name : null}
      searchIndex = "file"
      tagSuggestions = {false}
      allFilesCount={fileCount}
      slug= {`publication/${entity ? entity.handle : ''}`}
      page={page}
      step={PAGE_WIDTH}
      user={user}
      ItemRow={BookRow}
      loading={isLoading}
    />
  );
}

export default Page;