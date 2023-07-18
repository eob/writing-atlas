import {ItemRow} from '../lists/ItemRow'
import { Tag } from '../tag/Tag'

export function AuthorRow({item, user, loading, offersHeart = false}) {
  return (
    <ItemRow 
      title={item.name}
      href={`/author/${item.handle}`}
      key={item.handle}
      user={user}
      loading={loading}
      heartSubKind="entity"
      heartHandle={item.handle}
      offersHeart={offersHeart}
      fileCount={item.fileCount}
    />    
  )
}

export function EntityRow({item, user, loading, offersHeart = false}) {
  let url = ''
  let tag = null
  if (item && item.entitySubType == 'AUTHOR') {
    url = `/author/${item.handle}`
    tag = <Tag {...{
      label: "Author",
      handle: "author",
      kind: "AUTHOR"
    }} />
  } else if (item && item.entitySubType == 'AGENT') {
    url = `/agent/${item.handle}`
    tag = <Tag {...{
      label: "Agent",
      handle: "agent",
      kind: "AGENT"
    }} />
  } else if (item && item.entitySubType == 'AGENCY') {
    url = `/agency/${item.handle}`
    tag = <Tag {...{
      label: "Agency",
      handle: "agency",
      kind: "AGENCY"
    }} />
  }

  return (
    <ItemRow 
      title={item.name}
      href={url}
      key={item.handle}
      user={user}
      loading={loading}
      heartSubKind="entity"
      heartHandle={item.handle}
      offersHeart={offersHeart}
      tag={tag}
    />    
  )
}

export function AgentRow({item, user, loading, offersHeart = false}) {
  return (
    <ItemRow 
      title={item.name}
      href={`/agent/${item.handle}`}
      key={item.handle}
      user={user}
      loading={loading}
      heartSubKind="entity"
      heartHandle={item.handle}
      offersHeart={offersHeart}
    />    
  )
}

export function AgencyRow({item, user, loading, offersHeart = false}) {
  return (
    <ItemRow 
      title={item.name}
      href={`/agency/${item.handle}`}
      key={item.handle}
      user={user}
      loading={loading}
      heartSubKind="entity"
      heartHandle={item.handle}
      offersHeart={offersHeart}
    />    
  )
}

export function PublicationRow({item, user, loading, offersHeart = false}) {
  return (
    <ItemRow 
      title={item.name}
      href={`/publication/${item.handle}`}
      key={item.handle}
      user={user}
      loading={loading}
      heartSubKind="entity"
      heartHandle={item.handle}
      offersHeart={offersHeart}
    />    
  )
}

export function PublisherRow({item, user, loading, offersHeart = false}) {
  return (
    <ItemRow 
      title={item.name}
      href={`/publisher/${item.handle}`}
      key={item.handle}
      user={user}
      loading={loading}
      heartSubKind="entity"
      heartHandle={item.handle}
      offersHeart={offersHeart}
    />    
  )
}
  
