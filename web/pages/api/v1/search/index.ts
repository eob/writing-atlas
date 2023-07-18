/*
 * GET: Returns all objectKind for that tagKind/tagHandle tha tare owned by the user
 * POST: Toggles the association of that tagKind/tagHandle and the provided objectKind
 */
import PrismaClient from '../../../../lib/PrismaClient'
import { PowerSearch } from '../../../../components/power_search/model/PowerSearch';
import { randResults } from '../../../../components/power_search/mock/RandomCells';
import GetEntitiesFromBook from '../../../../common/db/GetAuthorFromBook'

import {
  withApiAuthRequired,
  getSession
} from '@auth0/nextjs-auth0';
import { GetFiles, GetFilesParams } from '../../../../common/db/GetFiles';
import { GetFilesCount } from '../../../../common/db/GetFilesCount';
import { Prisma } from '@prisma/client';
import { PowerSearchResult, ResultColumn, ResultRow } from '../../../../components/power_search/model/PowerSearchResult';
import { GetEntities, GetEntitiesParams } from '../../../../common/db/GetEntities';
import { GetEntitiesCount } from '../../../../common/db/GetEntitiesCount';
import { TagI } from '../../../../components/tag/Tag';

function _tags(o, field) {
  return {
    tags: o[field].map((ft) => {
      return {
        label: ft.tag.name,
        handle: ft.tag.handle,
        kind: ft.tag.kind
      }
    })
  }
}

function filesResult(files, count: number, page: number, pageWidth: number): PowerSearchResult {
  const schema: ResultColumn[] = [
    {name: "Title", type: "String"},
    {name: "Author", type: "Link"},
    {name: "Tags", type: "Tag"},
  ]
  const rows: ResultRow[] = files.map((x) => {
    let entities = GetEntitiesFromBook(x)
    return {
      link: `/stories/${x.handle}`,
      cells: [
        {value: x.name},
        entities.author ? {
          value: entities.author.name,
          link: `/authors/${entities.author.handle}`
        } : null,
        _tags(x, "file_tags")
      ]
    }
  })

  return {
    total: count,
    count: rows.length,
    page: page,
    index: ((page - 1) * pageWidth),
    window: pageWidth,
    schema,
    rows
  }
}


function entitiesResult(entities, slug: string, count: number, page: number, pageWidth: number): PowerSearchResult {
  const schema: ResultColumn[] = [
    {name: "Name", type: "String"}
  ]
  const rows: ResultRow[] = entities.map((x) => {
    return {
      link: `/${slug}/${x.handle}`,
      cells: [
        {value: x.name}
      ]
    }
  })
  return {
    total: count,
    count: rows.length,
    page: page,
    index: ((page - 1) * pageWidth),
    window: pageWidth,
    schema,
    rows
  }
}

async function doSearch(req, res, userId, search: PowerSearch) {
  const prisma = PrismaClient()
  try {
    if (! userId) {
      res.status(401).json({
        code: 401,
        error: "Login required"
      });
      return;
    }

    if ((!search.page) || (search.page < 1)) {
      search.page = 1
    }
    if ((!search.pageWidth) || (search.pageWidth < 1) || (search.pageWidth > 50)) {
      search.pageWidth = 25;
    }
    let searchResults = null;

    const resultType = search.getResultType();
    if (resultType == "Stories") {
      const AUTHOR_FILTERS = {
        ethnicity: [],
        gender: [],
        nationality: [],
        tags: []
      };
      const {
        ethnicity,
        gender,
        nationality,
        tags
      } = Object.assign(AUTHOR_FILTERS, search?.params?.authorFilters);

      const authorTags = [ethnicity, gender, nationality, tags];

      const params: GetFilesParams = {
        page: search.page,
        take: search.pageWidth,
        tags: search.params?.storyFilters?.tags as any[],
        authorTags: authorTags as any[]
      }
      const files = await GetFiles(prisma, params)
      let count = await GetFilesCount(prisma, params)
      searchResults = filesResult(files, count, search.page, search.pageWidth);
    } else if (resultType == "Authors") {
      const params: GetEntitiesParams = {
        page: search.page,
        take: search.pageWidth,
        entitySubType: "AUTHOR",
      }
      const entities = await GetEntities(prisma, params);
      let count = await GetEntitiesCount(prisma, params)
      searchResults = entitiesResult(entities, "author", count, search.page, search.pageWidth);
    } else if (resultType == "Publishers") {
      const params: GetEntitiesParams = {
        page: search.page,
        take: search.pageWidth,
        entitySubType: "PUBLISHER",
      }
      const entities = await GetEntities(prisma, params);
      let count = await GetEntitiesCount(prisma, params)
      searchResults = entitiesResult(entities, "publisher", count, search.page, search.pageWidth);
    } else {
      res.status(500).json({
        code: 500,
        error: `Unsupported result type: ${resultType}`
      });
      return;
    }
    res.status(200).json(searchResults)
  } catch (error) {
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
}

export default withApiAuthRequired(async function favorite(req, res) {
  const session = getSession(req, res);
  const userId = session.user.id;
  if (req.method == 'POST') {
    const search = new PowerSearch(undefined, req.body)
    await doSearch(req, res, userId, search)
  } else {
    res.status(500).json({
      code: 500,
      error: 'Unknown HTTP Verb'
    });
  }
});
