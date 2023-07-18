import { CardTitleFooter } from '../../lib/hf-react'
import BookStats from './BookStats'
import {Tag} from '../tag/Tag'
import marked from "marked"
import {Related} from  "../related/related-box"
export default function BookDescriptionTab({stats, book}) {
  let isShort = (book.fileType == 'shortStory')
  let sections = []

  // if (! isShort) {
  //   sections.push(
  //     <CardTitleFooter title="Key Stats">
  //       <BookStats border={false} stats={stats}></BookStats>
  //     </CardTitleFooter>
  //   )
  // }

  if (book.logline) {
    sections.push(
      <CardTitleFooter title={"Logline"}>
          <p dangerouslySetInnerHTML={{
            __html: book.logline
          }} />
      </CardTitleFooter>
    )
  }

  if (book.summary) {
    sections.push(
      <CardTitleFooter title={isShort ? "Summary" : "Book Jacket"}>
        <p dangerouslySetInnerHTML={{
            __html: book.summary
          }} />
      </CardTitleFooter>
    )
  }
  
  let tags = []
  let collections = []
  let honors = []

  if (book.file_tags) {
    tags = book.file_tags.map(x => x.tag).filter(x => x.kind == "TAG")
    collections = book.file_tags.map(x => x.tag).filter(x => x.kind == "COLLECTION")
    honors = book.file_tags.map(x => x.tag).filter(x => x.kind == "HONOR")
  }

  if (collections && collections.length) {
    sections.push(
      <CardTitleFooter title={"Collections"}>
        {collections.map(t => <Tag key={t.handle} handle={t.handle} label={t.name} kind={t.kind} color="green" />)}
      </CardTitleFooter>
    )  
  }


  if (honors && honors.length) {
    sections.push(
      <CardTitleFooter title={"Honors"}>
        {honors.map(t => <Tag key={t.handle} handle={t.handle} label={t.name} kind={t.kind} color="red" />)}
      </CardTitleFooter>
    )  
  }

  if (tags && tags.length) {
    sections.push(
      <CardTitleFooter title={"Tags"}>
        <div className="flex flex-wrap">
          {tags.map(t => <Tag key={t.handle} handle={t.handle} label={t.name} kind={t.kind}nav color="green" />)}
        </div>
      </CardTitleFooter>
    )  
  }

  // if (book.fileRelationsAsSubject) {
  //   sections.push(
  //     <CardTitleFooter title={"Related Stories"}>
  //       <Related caption="You might also be interested in these books:" files={book.fileRelationsAsSubject} handle={book.handle} />
  //     </CardTitleFooter>
  //   )  
  // }

  return sections
}