import { 
  withApiAuthRequired, 
  getSession ,
  getAccessToken
} from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function apiKey(req, res) {
  const session = getSession(req, res);
  res.status(200).json({ token: session.idToken });
});
