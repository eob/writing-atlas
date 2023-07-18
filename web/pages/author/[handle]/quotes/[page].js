import QuoteRow from '../../../../components/quote/QuoteRow'
import PrismaClient from '../../../../lib/PrismaClient'
import {entityFilesStaticProps, emptyStaticPaths} from '../../../../components/entity/Props'
import { useUser } from '@auth0/nextjs-auth0';
import {ListPageWrapper} from '../../../../components/lists/ListPageWrapper'

const PAGE_WIDTH = 10;

export async function getStaticProps({params}) {
  const prisma = PrismaClient()
  return entityFilesStaticProps({
    prisma,
    handle: String(params.handle),
    entityType: 'PERSON',
    entitySubType: 'AUTHOR',
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
      searchNotFoundPrefix = 'No stories yet from this author'
      supertitle = {`Author`}
      supertitleLink = '/authors'
      description = {entity ? entity.bio : null}
      facetCategory = {null}
      titlePrefix = {`Quotes by ${entity ? entity.name : null}`}
      searchIndex = "file"
      tagSuggestions = {false}
      allFilesCount={fileCount}
      slug= {`author/${entity ? entity.handle : ''}`}
      page={page}
      step={PAGE_WIDTH}
      user={user}
      ItemRow={QuoteRow}
      loading={isLoading}
    />
  );
}

export default Page;