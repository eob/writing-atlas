import PrismaClient from '../../lib/PrismaClient'
import { useUser } from '@auth0/nextjs-auth0';
import {AgencyRow} from '../../components/entity/EntityRow'
import {entityStaticProps, emptyStaticPaths} from '../../components/entity/Props'
import {ListPageWrapper} from '../../components/lists/ListPageWrapper'

export const PAGE_WIDTH = 10

export async function getStaticProps({params}) {
  const prisma = PrismaClient()
  return await entityStaticProps({
    prisma,
    entityType: "ORG", 
    entitySubType: "AGENCY",
    pageWidth: PAGE_WIDTH,
    filterFileCount: false,
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
  notFound,
  noItemsFound,
}) {
  const { user, isLoading } = useUser();
  return (
    <ListPageWrapper
      tag={null}
      items={entities}
     notFound={notFound}
     noItemsFound={noItemsFound}
      notFoundNounPl = 'agencies'
      searchNotFoundPrefix = 'No agencies'
      supertitle = {null}
      supertitleLink = '/agencies'
      facetCategory = 'agencyHandles'
      titlePrefix = 'Agencies'
      searchIndex = "agency"
      tagSuggestions = {false}
      allFilesCount={entitiesCount}
      slug="agencies"
      page={page}
      step={PAGE_WIDTH}
      user={user}
      ItemRow={AgencyRow}
      loading={isLoading}
    />
  );
}

export default Page;
