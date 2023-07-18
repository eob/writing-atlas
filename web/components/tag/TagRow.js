import {ItemRow} from '../lists/ItemRow'
import { getItemName } from '../lists/Util'

export function CollectionRow({item, user, loading, offersHeart = false}) {
  return (
    <ItemRow 
      title={getItemName(item)}
      href={`/collection/${item.handle}`}
      key={item.handle}
      user={user}
      loading={loading}
      offersHeart={offersHeart}
      highlight={item.highlight}
    />    
  )
}

export function ListRow({item, user, loading, offersHeart = false}) {
  return (
    <ItemRow 
      title={getItemName(item)}
      href={`/list/${item.handle}`}
      key={item.handle}
      user={user}
      loading={loading}
    />    
  )
}

export function TagRow({item, user, loading, offersHeart = false}) {
  return (
    <ItemRow 
      title={getItemName(item)}
      href={`/tag/${item.handle}`}
      key={item.handle}
      user={user}
      loading={loading}
      offersHeart={offersHeart}
      fileCount={item.fileCount}
    />    
  )
}

export function HonorRow({item, user, loading, offersHeart = false}) {
  return (
    <ItemRow 
      title={getItemName(item)}
      href={`/honor/${item.handle}`}
      key={item.handle}
      user={user}
      loading={loading}
      offersHeart={offersHeart}
      fileCount={item.fileCount}
    />    
  )
}

export function RecommendationRow({item, user, loading, offersHeart = false}) {
  return (
    <ItemRow 
      title={getItemName(item)}
      href={`/recommendation/${item.handle}`}
      key={item.handle}
      user={user}
      loading={loading}
      offersHeart={offersHeart}
    />    
  )
}