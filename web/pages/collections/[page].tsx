import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import PrismaClient from '../../lib/PrismaClient'
import {tagsStaticProps, emptyStaticPaths} from '../../components/tag/Props'
import {CollectionRow} from '../../components/tag/TagRow'
import {ListPageWrapper} from '../../components/lists/ListPageWrapper'

export const PAGE_WIDTH = 20

export async function getStaticPaths() {
  return emptyStaticPaths()
}

export async function getStaticProps({params}) {
  const prisma = PrismaClient()
  return tagsStaticProps({
    prisma,
    kind: "COLLECTION", 
    pageWidth: PAGE_WIDTH,
    page: params ? params.page : 1
  })
}

function TagsPage({
  tags,
  tagsCount,
  page,
  notFound,
  noItemsFound,
}) {
  if (page == 1) {
    tags = [{
      name: "♥ Favorites",
      handle: "favorites",
      kind: "COLLECTION",
      highlight: true
    },
    ...(tags || [])]
  }
  const { user, isLoading } = useUser();
  return (
    <ListPageWrapper
      tag={null}
      items={tags}
     notFound={notFound}
     noItemsFound={noItemsFound}
      notFoundNounPl = 'collections'
      searchNotFoundPrefix = 'No collections named'
      supertitle = {null}
      supertitleLink = '/collections'
      facetCategory = {null}
      titlePrefix = 'Collections'
      searchIndex = "collection"
      tagSuggestions = {false}
      allFilesCount={tagsCount}
      slug="collections"
      page={page}
      step={PAGE_WIDTH}
      user={user}
      ItemRow={CollectionRow}
      loading={isLoading}
    />    
  );
}

export default TagsPage