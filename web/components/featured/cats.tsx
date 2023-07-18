/* "CATS" stands for "categories"
 *
 *  For each CAT there is:
 *    - block: if 1, falls under "theme"; if 2, falls under "curation/awards"
 *      - on home page, all categories under block 1 are displayed first before block 2
 *    - kind: kind of category, e.g., "TAG", "AUTHOR", "HONOR", "IFYOULIKE"
 *      - corresponds roughly to Airtable fields
 *    - title: Name of the category
 *    - subKinds: subcategories under this category
 *    - image: name of stock photo to display with this category card
 *      - images under web/public/images/topics
 *    - take: the number of records to take from the database
 *    - slug
 *    - names
 *    - width
 *    - entityType
 *    - entitySubType
 */
export const CATS = [
  {
    block: 1,
    kind: "TAG",
    title: "Genre",
    subKinds: ["Genre"],
    image: "tag--genre",
    take: 20
  },
  {
    block: 1,
    kind: "TAG",
    title: "Topics",
    subKinds: ["Topic", null],
    image: "tag--topics",
    take: 20
  },
  {
    block: 1,
    kind: "TAG",
    title: "Characters",
    subKinds: ["Demographics", "Protagonist"],
    image: "tag--characters",
    take: 20
  },
  {
    block: 1,
    kind: "TAG",
    title: "Ending",
    subKinds: ["Denouement"],
    image: "tag--ending",
    take: 20
  },
  { 
    block: 1,
    kind: "TAG",
    title: "Location",
    image: "tag--location",
    subKinds: ["Geography"],
    take: 20
  },
  {
    block: 1,
    kind: "TAG",
    title: "Time Period",
    subKinds: ["Time Period", "Time Setting"],
    image: "tag--time-period",
    take: 20
  },
  {
    block: 2,
    width: 2,
    kind: "IFYOULIKE",
    title: "Read if you Like...",
    image: "tag--ifyoulike",
    take: 40,
    slug: "recommendation"
  },
  {
    block: 2,
    kind: "HONOR",
    width: 1,
    title: "Honors",
    slug: "honor",
    image: "tag--honors",
    // links: [
    //   {handle: "best-american-short-stories", name: "Best American Short Stories"},
    //   {handle: "best-american-mystery-stories", name: "Best American Mystery Stories"},
    //   {handle: "best-american-science-fiction-fantasy", name: "Best American Sci-Fi and Fantasy"},
    //   {handle: "o-henry-award", name: "O'Henry Award"},
    //   {handle: "hugo-award-for-best-short-story", name: "Hugo Award"},
    //   {handle: "nebula-award-for-best-short-story", name: "Nebula Award"},
    //   {handle: "ellie-award", name: "Ellie Award"}
    // ]
  },
  {
    block: 2,
    width: 1,
    kind: "ENTITY",
    entityType: "PERSON",
    entitySubType: "AUTHOR",
    title: "Authors",
    slug: "author",
    image: "tag--authors",
    names: [
      "Stephen King",
      "P. Djèlí Clark",
      "Sofia Samatar",
      "Yoon Ha Lee",
      "Sarah Shun-Lien Bynum",
      "Sam J. Miller",
      "Roxane Gay",
      "Rebecca Roanhorse",
      "Nathan Englander",
      "N.K. Jemisin",
      "Maurice Broaddus",
      "Maria Dahvana Headley",
      "Ken Liu",
      "Kelly Link",
      "Karen Russell",
      "Jhumpa Lahiri",
      "Jess Walter",
      "George Saunders",
      "Emma Cline",
      "Elizabeth Bear",
      "Edwidge Danticat",
      "E. Lily U",
      "Curtis Sittenfeld",
      "Chimamanda Ngozi Adichie",
      "Charlie Jane Anders",
      "Carrie Vaughn",
      "Caroline M. Yoachim",
      "Carmen Maria Machado",
      "Annie Proulx",
      "Alyssa Wong",
      "Alice Munro",
      "A. Merc Rustad",
      "Sarah Shun-Lien Bynum",
      "Seanan McGuire",
      "Ted Chiang",
      "Tim Pratt",
      "Vandana Singh",
      "Yiyun Li"
    ]
  },
  {
    block: 2,
    width: 1,
    kind: "COLLECTION",
    title: "Curations",
    slug: "collection",
    image: "tag--curations",
    take: 10,
    // links: [
    //   {handle: "tor-com-short-stories", name: "TOR.com Short Stories"},
    //   {handle: "amazon-original-stories", name: "Amazon Original Stories"},
    //   {handle: "electric-literature-s-recommended-reading", name: "Electric Literature's Recommended Reading"},
    //   {handle: "words-without-borders", name: "Words without Borders"},
    //   {handle: "sunday-times-short-stories", name: "Sunday Times Short Stories"}
    // ]
  },
  {
    block: 2,
    width: 1,
    kind: "ENTITY",
    entityType: "ORG",
    entitySubType: "PUBLICATION",
    title: "Publications",
    slug: "publication",
    image: "tag--publications",
    // links: [
    //   {handle: "amazon-original-stories", name: "Amazon Original Stories"},
    //   {handle: "beneath-ceaseless-skies", name: " Beneath Ceaseless Skies"}, 
    //   {handle: "clarkesworld-magazine", name: " Clarkesworld Magazine"}, 
    //   {handle: "fiyah", name: " FIYAH"}, 
    //   {handle: "harper-s-magazine", name: "Harper's Magazine"}, 
    //   {handle: "granta", name: "Granta"}, 
    //   {handle: "lightspeed", name: "Lightspeed"}, 
    //   {handle: "new-england-review", name: "New England Review"}, 
    //   {handle: "tor-com", name: "TOR.com"}, 
    //   {handle: "nightmare", name: "Nightmare"}, 
    //   {handle: "paris-review", name: "Paris Review"}, 
    //   {name: "Strange Horizons", handle: "strange-horizons"}, 
    //   {name: "The Atlantic Monthly", handle: "the-atlantic-monthly"}, 
    //   {name: "The Magazine of Fantasy & Science Fiction", handle: "the-magazine-of-fantasy-science-fiction"}, 
    //   {name: "Tin House", handle: "tin-house"}, 
    //   {name: "The New Yorker", handle: "the-new-yorker"}, 
    //   {name: "Uncanny Magazine", handle: "uncanny-magazine"}, 
    //   {name: "Virginia Quarterly Review", handle: "virginia-quarterly-review"}, 
    //   {name: "Asimov's Science Fiction", handle: "asimov-s-science-fiction"}, 
    //   {name: "Apex Magazine", handle: "apex-magazine"}, 
    //   {name: "AGNI", handle: "agni"}, 
    // ]
  }
]