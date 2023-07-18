import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import PrismaClient from '../../lib/PrismaClient'
import {tagsStaticProps, emptyStaticPaths} from '../../components/tag/Props'
import {RecommendationRow} from '../../components/tag/TagRow'
import {ListPageWrapper} from '../../components/lists/ListPageWrapper'

export const PAGE_WIDTH = 20

export async function getStaticPaths() {
  return emptyStaticPaths()
}

export async function getStaticProps({params}) {
  const prisma = PrismaClient()
  return tagsStaticProps({
    prisma,
    kind: "IFYOULIKE", 
    pageWidth: PAGE_WIDTH,
    page: params ? params.page : 1
  })
}

function TagsPage({
  tags,
  tagsCount,
  page,
  noItemsFound,
  notFound,
}) {
  // if (page == 1) {
  //   tags = [{
  //     name: "Favorites",
  //     handle: "favorites",
  //     kind: "COLLECTION",
  //     highlight: true
  //   },
  //   ...tags]
  // }
  const { user, isLoading } = useUser();
  return (
    <ListPageWrapper
      tag={null}
      items={tags}
     notFound={notFound}
     noItemsFound={noItemsFound}
      notFoundNounPl = 'recommendations'
      searchNotFoundPrefix = 'No recommendations named'
      supertitle = {null}
      supertitleLink = '/recommendations'
      facetCategory = {null}
      titlePrefix = 'Read if you like...'
      searchIndex = "recommendation"
      tagSuggestions = {false}
      allFilesCount={tagsCount}
      slug="recommendations"
      page={page}
      step={PAGE_WIDTH}
      user={user}
      ItemRow={RecommendationRow}
      loading={isLoading}
    />    
  );
}

export default TagsPage