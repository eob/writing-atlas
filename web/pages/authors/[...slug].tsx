import PrismaClient from '../../lib/PrismaClient'
import { useUser } from '@auth0/nextjs-auth0';
import {AuthorRow} from '../../components/entity/EntityRow'
import {entityStaticProps, emptyStaticPaths} from '../../components/entity/Props'
import {ListPageWrapper} from '../../components/lists/ListPageWrapper'
import {parseListSlug} from '../../components/lists/ParseListSlug'

export const PAGE_WIDTH = 10

/**
 * Load the list of authors
 *
 * @param params In the URL "/authors/[page]/[orderBy]
 *        page [Number] - which page of results to load
 *        orderBy [String] - specifies a preset setting for the order in which to display the results
 */
export async function getStaticProps({params}) {
  const prisma = PrismaClient()

  // Parse the URL arguments
  const urlArgs = parseListSlug(params)

  return entityStaticProps({
    prisma,
    entityType: "PERSON", 
    entitySubType: "AUTHOR",
    pageWidth: PAGE_WIDTH,
    ...urlArgs
  })
}

export async function getStaticPaths() {
  return emptyStaticPaths()
}

function EntitiesPage({
  entities,
  entitiesCount,
  page,
  orderBy,
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
      notFoundNounPl = 'authors'
      searchNotFoundPrefix = 'No stories tagged'
      supertitle = {null}
      supertitleLink = '/authors'
      facetCategory = 'collectionHandles'
      titlePrefix = 'Authors'
      searchIndex = "author"
      tagSuggestions = {false}
      allFilesCount={entitiesCount}
      slug="authors"
      page={page}
      step={PAGE_WIDTH}
      user={user}
      ItemRow={AuthorRow}
      loading={isLoading}
      orderBy={orderBy}
    />
  );
}

export default EntitiesPage;
