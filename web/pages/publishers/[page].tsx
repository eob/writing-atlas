import PrismaClient from '../../lib/PrismaClient'
import { useUser } from '@auth0/nextjs-auth0';
import {PublisherRow} from '../../components/entity/EntityRow'
import {entityStaticProps, emptyStaticPaths} from '../../components/entity/Props'
import {ListPageWrapper} from '../../components/lists/ListPageWrapper'

export const PAGE_WIDTH = 10

export async function getStaticProps({params}) {
  const prisma = PrismaClient()
  return await entityStaticProps({
    prisma,
    entityType: "ORG", 
    entitySubType: "PUBLISHER",
    pageWidth: PAGE_WIDTH,
    page: params ? params.page : 1
  })
}

export async function getStaticPaths() {
  return await emptyStaticPaths()
}

function Page({
  entities,
  entitiesCount,
  page,
  noItemsFound,
  notFound,
}) {
  const { user, isLoading } = useUser();
  return (
    <ListPageWrapper
      tag={null}
      items={entities}
     notFound={notFound}
     noItemsFound={noItemsFound}
      notFoundNounPl = 'publishers'
      searchNotFoundPrefix = 'No publishers'
      supertitle = {null}
      supertitleLink = '/publishers'
      facetCategory = 'publisherHandles'
      titlePrefix = 'Publishers'
      searchIndex = "publisher"
      tagSuggestions = {false}
      allFilesCount={entitiesCount}
      slug="publishers"
      page={page}
      step={PAGE_WIDTH}
      user={user}
      ItemRow={PublisherRow}
      loading={isLoading}
    />
  );
}

export default Page;
