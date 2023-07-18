import PrismaClient from '../../lib/PrismaClient'
import { useUser } from '@auth0/nextjs-auth0';
import BookRow from '../../components/book/BookRow'
import {entityStaticProps, emptyStaticPaths} from '../../components/entity/Props'
import {ListPageWrapper} from '../../components/lists/ListPageWrapper'
import {parseListSlug} from '../../components/lists/ParseListSlug'

export const PAGE_WIDTH = 10

export async function getStaticProps({params}) {
  return {props: {}}
}

export async function getStaticPaths() {
  return emptyStaticPaths()
}

function StoriesPage() {
  const { user, isLoading } = useUser();
  return (
    <ListPageWrapper
      tag={null}
      items={[]}
      notFound={false}
      noItemsFound={true}
      notFoundNounPl = 'stories'
      searchNotFoundPrefix = 'No stories tagged'
      supertitle = {null}
      supertitleLink = '/stories'
      facetCategory = 'collectionHandles'
      titlePrefix = 'Stories'
      searchIndex = "file"
      tagSuggestions = {false}
      allFilesCount={1} // @eric-zhizu: As long as it's non-zero, the search box appears
      slug="stories"
      page={1}
      step={PAGE_WIDTH}
      user={user}
      ItemRow={BookRow}
      loading={isLoading}
    />
  );
}

export default StoriesPage;
