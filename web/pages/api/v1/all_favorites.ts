import PrismaClient from '../../../lib/PrismaClient'
import {GetFiles} from '../../../common/db/GetFiles'

import { 
  withApiAuthRequired, 
  getSession ,
  getAccessToken
} from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function allFavorites(req, res) {
  const session = getSession(req, res);
  const userId = session.user.sub;
  const prisma = PrismaClient()
  try {
    if (! userId) {
      res.status(401).json({
        code: 401,
        error: "Login required"
      });
      return;
    }
    let files = await GetFiles(prisma, {
      tagPrivateTo: userId,
      tagHandle: 'favorite',
      tagKind: 'LIST'
    });
    res.status(200).json({data: files});
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
});
