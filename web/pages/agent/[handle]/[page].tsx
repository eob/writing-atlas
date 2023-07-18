import BookRow from '../../../components/book/BookRow'
import PrismaClient from '../../../lib/PrismaClient'
import {agentStaticProps, emptyStaticPaths} from '../../../components/entity/Props'
import { useUser } from '@auth0/nextjs-auth0';
import {ListPageWrapper} from '../../../components/lists/ListPageWrapper'
import {EntityRow} from '../../../components/entity/EntityRow'
import withPageAuthRequired from '../../../components/withPageAuthRequired'

const PAGE_WIDTH = 10;

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context) => {
    const prisma = PrismaClient()
    return agentStaticProps({
      prisma,
      handle: String(context.params.handle),
      pageWidth: PAGE_WIDTH,
      page: context.params ? parseInt(`${context.params.page}`) : 1
    })
  },
});

function Page({
  entity,
  entities,
  notFound, 
  noItemsFound,
  fileCount = 0,
  page
}) {
  const { user, isLoading } = useUser();
  return (
    <ListPageWrapper
      tag={null}
      items={entities}
     notFound={notFound}
     noItemsFound={noItemsFound}
      headerProps={{showBooks: true}} 
      notFoundNounPl = 'authors or agencies'
      searchNotFoundPrefix = 'No authors or agencies found for this agent'
      supertitle = {`Agent`}
      supertitleLink = '/agents'
      description = {entity ? entity.bio : null}
      facetCategory = {null}
      titlePrefix = {entity ? entity.name : null}
      searchIndex = "file"
      tagSuggestions = {false}
      allFilesCount={fileCount}
      slug= {`author/${entity ? entity.handle : ''}`}
      page={page}
      step={PAGE_WIDTH}
      user={user}
      ItemRow={EntityRow}
      loading={isLoading}
    />
  );
}

export default Page;