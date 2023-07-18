/*
 * GET: Returns all objectKind for that tagKind/tagHandle tha tare owned by the user
 * POST: Toggles the association of that tagKind/tagHandle and the provided objectKind
 */
import PrismaClient from '../../../../lib/PrismaClient'

import { 
  withApiAuthRequired, 
  getSession ,
} from '@auth0/nextjs-auth0';

async function doGet(req, res, id) {
  const prisma = PrismaClient()

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
  
    if (!(
      (user.email == "edward.benson@gmail.com") || 
      (user.email == "jenny8lee@gmail.com")
    )) {
      res.status(200).json({
        error: {
          type: "needs_upgrade",
          message: "Admin access required",
        }
      });
      return;
    }
  
    const updateUser = await prisma.user.update({
      where: {
        id
      },
      data: {
        plan: 'comp'
      },
    })

    try {    
      res.status(200).json({data: {
        status: 'OK'
      }});
    } catch (error) {
      res.status(error.status || 500).json({
        code: error.code,
        error: error.message
      });
    }
  })(req, res);
}

export default async function users(req, res) {
  const {
    body: { id },
  } = req
  
  if (req.method == 'POST') {
    await doGet(req, res, id)
  } else {
    res.status(500).json({
      code: 500,
      error: 'Unknown HTTP Verb'
    });
  }
};
