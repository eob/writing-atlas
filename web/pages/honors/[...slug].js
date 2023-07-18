import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import PrismaClient from '../../lib/PrismaClient'
import {tagsStaticProps, emptyStaticPaths} from '../../components/tag/Props'
import {HonorRow} from '../../components/tag/TagRow'
import {ListPageWrapper} from '../../components/lists/ListPageWrapper'
import {parseListSlug} from "../../components/lists/ParseListSlug";

export const PAGE_WIDTH = 20

export async function getStaticPaths() {
  return emptyStaticPaths()
}

/**
 * Load the list of tags
 *
 * @param params In the URL "/honors/[page]/[orderBy]
 *        page [Number] - which page of results to load
 *        orderBy [String] - specifies a preset setting for the order in which to display the results
 */
export async function getStaticProps({params}) {
  const prisma = PrismaClient()

  // Parse the URL arguments
  const urlArgs = parseListSlug(params)

  return tagsStaticProps({
    prisma,
    kind: "HONOR", 
    pageWidth: PAGE_WIDTH,
    ...urlArgs
  })
}

function TagsPage({
  tags,
  tagsCount,
  page,
  orderBy,
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
      notFoundNounPl = 'honors'
      searchNotFoundPrefix = 'No honors named'
      supertitle = {null}
      supertitleLink = '/honors'
      facetCategory = {null}
      titlePrefix = 'Honors'
      searchIndex = "honor"
      tagSuggestions = {false}
      allFilesCount={tagsCount}
      slug="honors"
      page={page}
      orderBy={orderBy}
      step={PAGE_WIDTH}
      user={user}
      ItemRow={HonorRow}
      loading={isLoading}
    />    
  );
}

export default TagsPage