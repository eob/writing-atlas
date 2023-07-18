import {tagStaticProps } from '../../../components/tag/Props'
import PrismaClient from '../../../lib/PrismaClient'
import { useUser } from '@auth0/nextjs-auth0';
import BookRow from '../../../components/book/BookRow'
import {ListPageWrapper} from '../../../components/lists/ListPageWrapper'
import withPageAuthRequired from '../../../components/withPageAuthRequired'
import { 
  getSession
} from '@auth0/nextjs-auth0';

export const PAGE_WIDTH = 10

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context) => {
    const prisma = PrismaClient()
    const session = getSession(context.req, context.res);
    const userId = session.user.id || session.user.sub;
    let page = context.params ? parseInt(`${context.params.page}`) : 1;
    if (isNaN(page)) {
      page = 1
    }
    return tagStaticProps({
      prisma,
      tagType: "LIST",
      tagHandle: context.params.handle,
      pageWidth: PAGE_WIDTH,
      fileTagPrivateTo: userId,
      page: page,
      allowEmpty: true
    })
  },
});

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

  const dynamicItemLoadUrl = ((page < 2) && (handle == 'favorites')) ? '/api/v1/all_favorites' : null;

  return (
    <ListPageWrapper
      tag={tag}
      items={files}
     notFound={notFound}
     noItemsFound={noItemsFound}
      notFoundNounPl = 'stories'
      searchNotFoundPrefix = 'No stories in list'
      supertitle = {`List`}
      supertitleLink = '/lists'
      facetCategory = 'listHandles'
      titlePrefix = ''
      tagSuggestions = {false}
      allFilesCount={fileCount}
      slug= {`list/${tag ? tag.handle : ''}`}
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
