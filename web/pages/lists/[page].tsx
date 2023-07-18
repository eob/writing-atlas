import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import PrismaClient from '../../lib/PrismaClient'
import {tagsStaticProps} from '../../components/tag/Props'
import {ListRow} from '../../components/tag/TagRow'
import {ListPageWrapper} from '../../components/lists/ListPageWrapper'
import withPageAuthRequired from '../../components/withPageAuthRequired'
import { 
  getSession
} from '@auth0/nextjs-auth0';

export const PAGE_WIDTH = 20

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context) => {
    const session = getSession(context.req, context.res);
    const userId = session.user.id || session.user.sub;
    let page = context.params ? parseInt(`${context.params.page}`) : 1;
    if (isNaN(page)) {
      page = 1
    }
    const prisma = PrismaClient()
    return tagsStaticProps({
      prisma,
      kind: "LIST", 
      filterFileCount: false,
      fileTagPrivateTo: userId,
      pageWidth: PAGE_WIDTH,
      page: page
    })
  },
});

function TagsPage({
  tags,
  tagsCount,
  page,
  notFound,
  noItemsFound,
}) {
  const { user, isLoading } = useUser();
  return (
    <ListPageWrapper
      tag={null}
      items={tags}
      notFound={notFound}
      noItemsFound={noItemsFound}
      notFoundNounPl = 'lists'
      searchNotFoundPrefix = 'No lists named'
      supertitle = {null}
      supertitleLink = '/lists'
      facetCategory = {null}
      titlePrefix = 'My Lists'
      tagSuggestions = {false}
      allFilesCount={tagsCount}
      slug="lists"
      page={page}
      step={PAGE_WIDTH}
      user={user}
      ItemRow={ListRow}
      loading={isLoading}
    />    
  );
}

export default TagsPage