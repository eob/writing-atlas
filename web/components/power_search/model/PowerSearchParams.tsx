import {ResultType} from './PowerSearchResultType'

export type Reference = {
  kind: string
  handle: string
  name: string
}

export type StoryFilters = {
  hasRepresentationInformation: boolean
  hasRightsInformation: boolean
  isEarlyLook: boolean

  name: string
  keywords: string
  tags: Reference[]

  publicationYearMin: number
  publicationYearMax: number
}

export type AuthorFilters = {
  name: string
  keywords: string
  tags: Reference[]
  gender: Reference[] // tagged input
  nationality: Reference[] // tagged input
  ethnicity: Reference[] // tagged input
}

export type PowerSearchParams = {
  type: string
  storyFilters: StoryFilters
  authorFilters: AuthorFilters
}
