import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import PrismaClient from '../../lib/PrismaClient'
import {tagsStaticProps, emptyStaticPaths} from '../../components/tag/Props'
import {TagRow} from '../../components/tag/TagRow'
import {ListPageWrapper} from '../../components/lists/ListPageWrapper'
import {parseListSlug} from "../../components/lists/ParseListSlug";

export const PAGE_WIDTH = 20

const tagsetKeys = [
  'All',
  'Audience',
  'Author Demographics',
  'Demographics',
  'Denouement',
  'Dynamic',
  'Event',
  'Gender and Sexuality',
  'Genre',
  'Geography',
  'Narrative Framework',
  'Narrative Style',
  'Narrative Structure',
  'Language',
  'Locations',
  'Protagonist',
  'Race and Ethnicity',
  'Setting',
  'Structure',
  'Style',
  'Time Period',
  'Time Setting',
  'Topic'
]
const tagsetValues = [...tagsetKeys]
const tagsetInitial = 'All'

export async function getStaticPaths() {
  return emptyStaticPaths()
}

/**
 * Load the list of tags
 *
 * @param params In the URL "/tags/[page]/[orderBy]
 *        page [Number] - which page of results to load
 *        orderBy [String] - specifies a preset setting for the order in which to display the results
 */
export async function getStaticProps({params}) {
  const prisma = PrismaClient()

  // Parse the URL arguments
  const urlArgs = parseListSlug(params)

  return tagsStaticProps({
    prisma,
    kind: "TAG", 
    pageWidth: PAGE_WIDTH,
    ...urlArgs
  })
}

function TagsPage({
  tags,
  tagsCount,
  page,
  notFound,
  noItemsFound,
  orderBy
}) {
  const { user, isLoading } = useUser();
  return (
    <ListPageWrapper
      tag={null}
      items={tags}
     notFound={notFound}
     noItemsFound={noItemsFound}
      notFoundNounPl = 'tags'
      searchNotFoundPrefix = 'No tags named'
      supertitle = {null}
      supertitleLink = '/tags'
      facetCategory = {null}
      titlePrefix = 'Tag'
      searchIndex = "tag"
      tagSuggestions = {false}
      allFilesCount={tagsCount}
      slug="tags"
      page={page}
      orderBy={orderBy}
      step={PAGE_WIDTH}
      user={user}
      ItemRow={TagRow}
      loading={isLoading}
    />    
  );
}

export default TagsPage