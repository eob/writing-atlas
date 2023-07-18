/*
 * GET: Returns all objectKind for that tagKind/tagHandle tha tare owned by the user
 * POST: Toggles the association of that tagKind/tagHandle and the provided objectKind
 */
import PrismaClient from '../../../../../../../lib/PrismaClient'
import {AuthorizeSetTagAssociation, AuthorizeGetTagAssociation, SetTagAssociation, GetTagAssociation} from '../../../../../../../common/db/TagAssociation'

import { 
  withApiAuthRequired, 
  getSession ,
  getAccessToken
} from '@auth0/nextjs-auth0';

async function setTagMembership(req, res, userId, tagKind, tagHandle, objectKind) {
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
      tagValue, tagSubKind, tagName, objectHandle
    } = req.body

    // This throws an exception if the operation is not authorized.
    AuthorizeSetTagAssociation({uid: userId, tagValue, tagName, tagHandle, tagKind, tagSubKind, objectKind, objectHandle});

    await SetTagAssociation(prisma, {
      tagHandle,
      tagKind,
      tagSubKind,
      tagName,
      tagValue,
      objectKind,
      objectHandle,
      privateTo: userId,
    })
    res.status(200).json({tagHandle: tagHandle, tagKind: tagKind, tagName: tagName, tagValue: tagValue, objectKind: objectKind, objectHandle: objectHandle, userId: userId});
  } catch (error) {
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
}

async function getTagMembership(req, res, userId, tagKind, tagHandle, objectKind) {
  const prisma = PrismaClient()
  try {
    if (! userId) {
      res.status(401).json({
        code: 401,
        error: "Login required"
      });
      return;
    }

    // This throws an exception if the operation is not authorized.
    AuthorizeGetTagAssociation({tagHandle, tagKind, objectKind});

    let result = await GetTagAssociation(prisma, {
      objectKind,
      tagKind,
      tagHandle,
      userId
    });
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
    query: { tagKind, tagHandle, objectKind },
  } = req

  if (req.method == 'POST') {
    await setTagMembership(req, res, userId, tagKind, tagHandle, objectKind)
  } else if (req.method == 'GET') {
    await getTagMembership(req, res, userId, tagKind, tagHandle, objectKind)
  } else {
    res.status(500).json({
      code: 500,
      error: 'Unknown HTTP Verb'
    });
  }
});
