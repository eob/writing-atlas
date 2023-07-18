import {EntityRow} from '../../../components/entity/EntityRow'
import PrismaClient from '../../../lib/PrismaClient'
import {agencyStaticProps} from '../../../components/entity/Props'
import { useUser } from '@auth0/nextjs-auth0';
import {ListPageWrapper} from '../../../components/lists/ListPageWrapper'
import withPageAuthRequired from '../../../components/withPageAuthRequired'

const PAGE_WIDTH = 10;

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context) => {
    const prisma = PrismaClient()
    return agencyStaticProps({
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
      notFoundNounPl = 'authors or agents'
      supertitle = {`Agency`}
      supertitleLink = '/agencies'
      description = {entity ? entity.bio : null}
      titlePrefix = {entity ? entity.name : null}
      allFilesCount={fileCount}
      page={page}
      step={PAGE_WIDTH}
      user={user}
      ItemRow={EntityRow}
      loading={isLoading}
    />
  );
}

export default Page;