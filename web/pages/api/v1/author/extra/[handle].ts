/*
 * GET: Returns all objectKind for that tagKind/tagHandle tha tare owned by the user
 * POST: Toggles the association of that tagKind/tagHandle and the provided objectKind
 */
import PrismaClient from '../../../../../lib/PrismaClient'
import {authorExtraProps} from '../../../../../components/entity/Props'

import { 
  withApiAuthRequired, 
  getSession ,
} from '@auth0/nextjs-auth0';

async function doGet(req, res, handle) {
  const prisma = PrismaClient()
  let associates = await authorExtraProps(prisma, {handle})

  if ((! associates) || (associates.length == 0)) {
    res.status(200).json({
      data: {associates}
    });
    return
  }

  withApiAuthRequired(async function favorite(req, res) {
    const session = getSession(req, res);
    const user = session.user;
  
    if ((! user) || (! user.id)) {
      res.status(401).json({
        code: 401,
        error: "Login required!"
      });
      return;
    }
  
    if (! (user.plan == "comp")) {
      res.status(200).json({
        error: {
          type: "needs_upgrade",
          message: "Paid tier required",
        }
      });
      return;
    }
  
    try {    
      res.status(200).json({data: {
        associates
      }});
    } catch (error) {
      res.status(error.status || 500).json({
        code: error.code,
        error: error.message
      });
    }
  })(req, res);
}

export default async function favorite(req, res) {
  const {
    query: { handle  },
  } = req

  if (!handle) {
    res.status(200).json({data: {
      associates: []
    }});    
  }
  
  if (req.method == 'GET') {
    await doGet(req, res, handle)
  } else {
    res.status(500).json({
      code: 500,
      error: 'Unknown HTTP Verb'
    });
  }
};
