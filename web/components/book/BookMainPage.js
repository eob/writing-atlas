import BookDescriptionTab from './BookDescriptionTab'
import {SideTabs} from '../../lib/hf-react'
import Link from 'next/link'

export default function BookMainPage({book, author}) {
  let isShort = (book.fileType == 'shortStory')

  let wordCount = '?'
  try {
    if (book.textStatistics.wordCount) {
      wordCount = `${(parseInt(book.textStatistics.wordCount) / 1000).toFixed(1)}k`    
    }  
  } catch {
  }

  let fleschScore = '?'
  try {
    fleschScore = pickTerm(book.textStatistics.fleschScore, FLESCH)
  } catch {
  }

  let gradeLevelScore = '?'
  try {
    gradeLevelScore = pickTerm(book.textStatistics.gradeLevelScore, GRADE)
  } catch {
  }
  const stats = [
    {title: 'Words', value: wordCount },
    {title: 'Flesch Reading Ease', value: fleschScore },
    {title: 'Grade Level', value: gradeLevelScore }
  ]

  let panels = [
    <BookDescriptionTab book={book} author={author} stats={stats} />,
  ]

  const tabs = {
    slug: 'bookSection',
    labels: ['Description'],
    keys: ['description'],
    asHref: `/story/${book.handle}`,
    panels: panels
  }

  return <SideTabs {...tabs} Link={Link} />
}