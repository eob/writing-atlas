// api/custom-login.js
import { handleCallback, getSession } from '@auth0/nextjs-auth0';
import { CreateOrUpdateUserOnLogin } from '../../../common/db/UserLogin'
import PrismaClient from '../../../lib/PrismaClient'

export default async function login(req, res) {
  const prisma = PrismaClient()

  try {
    await handleCallback(req, res, {
      afterCallback: async (req, res, session, options) => {
        // This will execute before the response is written.
        try {
          if (session) {
            const {user} = session; 
            if (user) {
              const {
                name, picture, locale, email, sub, given_name:firstName, family_name:lastName, nickname:nickName
              } = user;
              let dbUser = await CreateOrUpdateUserOnLogin(prisma, {
                name, picture, locale, email, sub, firstName, lastName, nickName
              });
              session.user.id = dbUser.id;
              session.user.plan = dbUser.plan;
            }      
          }  
        } catch(e) {
          console.log(e);
        }
        // It is very important to return this. This callback was intended to be used as a way to
        // modify the session.
        return session;
      }
    });
  } catch (error) {
    res.status(error.status || 400).end(error.message);
  }
}