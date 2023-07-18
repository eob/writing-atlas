/*
 * GET: Returns all objectKind for that tagKind/tagHandle tha tare owned by the user
 * POST: Toggles the association of that tagKind/tagHandle and the provided objectKind
 */
import PrismaClient from '../../../../../lib/PrismaClient'
import {AddTag, AuthorizeAddTag} from '../../../../../common/db/AddTag'
import {GetTags, AuthorizeGetTags} from '../../../../../common/db/GetTags'

import { 
  withApiAuthRequired, 
  getSession ,
  getAccessToken
} from '@auth0/nextjs-auth0';

async function addTag(req, res, userId, tagKind) {
  const prisma = PrismaClient()
  try {
    if (! userId) {
      res.status(401).json({
        code: 401,
        error: "Login required"
      });
      return;
    }

    let {
      tagSubKind, tagName
    } = req.body
    // This throws an exception if the operation is not authorized.
    AuthorizeAddTag({tagKind});
    let tag = await AddTag(prisma, {
      tagKind,
      tagSubKind,
      tagName,
      userId
    })
    res.status(200).json(tag)
  } catch (error) {
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
}

async function getTags(req, res, userId, tagKind, tagSubKind) {
  const prisma = PrismaClient()
  try {
    if (! userId) {
      res.status(401).json({
        code: 401,
        error: "Login required"
      });
      return;
    }

    let {
      tagName,
      objectKind
    } = req.query

    // This throws an exception if the operation is not authorized.
    AuthorizeGetTags({tagKind, objectKind});

    let query = {
      kind: tagKind,
      filterFileCount: false,
      nameContains: tagName,
      subKind: tagSubKind
    }

    if (tagKind == "LIST") {
      query.kind = userId;
    }

    let result = await GetTags(prisma, query)
    res.status(200).json({data: result});
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
}

export default withApiAuthRequired(async function favorite(req, res) {
  const session = getSession(req, res);
  const userId = session.user.id;
  const {
    query: { tagKind, tagSubKind },
  } = req

  if (req.method == 'POST') {
    await addTag(req, res, userId, tagKind)
  } else if (req.method == 'GET') {
    await getTags(req, res, userId, tagKind, tagSubKind)
  } else {
    res.status(500).json({
      code: 500,
      error: 'Unknown HTTP Verb'
    });
  }
});
