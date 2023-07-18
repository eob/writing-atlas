import {
  StringCell,
  LinkCell,
  TagCell,
  PowerSearchResult,
  ResultRow,
  ResultCell,
  ResultColumn
} from '../model/PowerSearchResult'
import {TagI, TagKind} from '../../tag/Tag'

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const VOWEL = 'aeiou'
const CONS = 'bcdfghjklmnprstvwz'

function sound(): string {
  const a = UPPER.charAt(Math.floor(Math.random() * UPPER.length));
  const b = VOWEL.charAt(Math.floor(Math.random() * VOWEL.length));
  const c = CONS.charAt(Math.floor(Math.random() * CONS.length));
  return `${a}${b}${c}`
}

function phrase(words: number = 1): string {
  const num = Math.floor(Math.random() * words)
  var ret = []
  for (let i = 0; i < num; i++) {
    ret.push(sound())
  }
  return ret.join(" ")
}

function slugify(phrase: string): string {
  return phrase.toLowerCase().replace(/\s/g, '-');
}

export function randString(): StringCell {
  return {value: phrase(3)}
}

export function randLink(): LinkCell {
  return {name: phrase(3), link: '#'}
}

export function randTag(kind: TagKind): TagCell {
  const num = Math.floor(Math.random() * 2)
  var tags = [];
  for (let i = 0; i < num; i++) {
    const name = phrase(3);
    tags.push({
      label: name,
      handle: slugify(name),
      kind: kind
    })
  }
  return {tags}
}

export function randResults(num: number): PowerSearchResult {
  // Always have a name and a tag thing.
  let cols: ResultColumn[] = [
    {type: "String", name: "Name"},
    {type: "Link", name: "Wikipedia Page"},
    {type: "Tag", name: "Tags"},
  ]
  // Maybe one or more links and tags
  for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
    if ((i % 2) == 0) {
      cols.push(
        {type: "Link", name: phrase()},
      )
    } else {
      cols.push(
        {type: "Tag", name: phrase()}
      )
    }
  }

  let rows: ResultRow[] =[];
  for (let i = 0; i < num; i++) {
    let row: ResultCell[] = [];
    for (let j = 0; j < cols.length; j++) {
      if (cols[j].type == "String") {
        row.push(randString())
      } else if (cols[j].type == "Tag") {
        row.push(randTag("TAG"))
      } else if (cols[j].type == "Link") {
        row.push(randLink())
      } 
    }
    rows.push({
      link: "#",
      cells: row
    })
  }

  return {
    total: num * 10,
    count: rows.length,
    index: 0,
    page: 0,
    window: rows.length,
    schema: cols,
    rows: rows
  }
}