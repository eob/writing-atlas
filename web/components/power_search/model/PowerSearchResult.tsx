import {ResultType} from './PowerSearchResultType'
import {TagI} from '../../tag/Tag'

type ColumnType = "String" | "Link" | "Tag"

export type ResultCell = {
    
}

export type LinkCell = {
  name: string
  link: string
}

export type StringCell = {
  value: string
}

export type TagCell = {
  tags: TagI[]
}

export type ResultRow = {
  link: string // Always shown as a "View" button at the row's right
  cells: ResultCell[] // Each can be cast into the appropriate ResultCell subtype based on the Column schema.
}

export type ResultColumn = {
  type: ColumnType
  name: string
}

export type PowerSearchResult = {
  // Contains an error message if not null / unknown
  error?: string

  // total number of results
  total: number

  // number in this result set
  count: number

  // the page of this result: 1 indexed!
  page: number

  // the index of this result: 0 indexed!
  // Note: This is technically redundant given the page, but nice to have the data multiple ways.
  index: number

  // window size of this result set
  window: number 

  // How to interpret each row
  schema: ResultColumn[]

  rows: ResultRow[]
}
