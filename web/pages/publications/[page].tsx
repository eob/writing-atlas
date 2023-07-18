import PrismaClient from '../../lib/PrismaClient'
import { useUser } from '@auth0/nextjs-auth0';
import {PublicationRow} from '../../components/entity/EntityRow'
import {entityStaticProps, emptyStaticPaths} from '../../components/entity/Props'
import {ListPageWrapper} from '../../components/lists/ListPageWrapper'

export const PAGE_WIDTH = 10

export async function getStaticProps({params}) {
  const prisma = PrismaClient()
  return entityStaticProps({
    prisma,
    entityType: "ORG", 
    entitySubType: "PUBLICATION",
    pageWidth: PAGE_WIDTH,
    page: params ? params.page : 1
  })
}

export async function getStaticPaths() {
  return emptyStaticPaths()
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
      notFoundNounPl = 'publications'
      searchNotFoundPrefix = 'No publications'
      supertitle = {null}
      supertitleLink = '/publications'
      facetCategory = 'publicationHandles'
      titlePrefix = 'Publications'
      searchIndex = "publication"
      tagSuggestions = {false}
      allFilesCount={entitiesCount}
      slug="publications"
      page={page}
      step={PAGE_WIDTH}
      user={user}
      ItemRow={PublicationRow}
      loading={isLoading}
    />
  );
}

export default Page;
