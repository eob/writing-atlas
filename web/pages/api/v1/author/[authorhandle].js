import fetch from 'isomorphic-unfetch';

import {initAuth0WithScope} from '../../../../lib/auth0';
import config from '../../../../lib/config';

const auth0 = initAuth0WithScope('read:tags')

export default async function tag(req, res) {
  try {
    const tokenCache = auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken({
      scopes: ['read:tags']
    });
    const {
      query: { authorhandle },
    } = req
    const url = `${config.API_BASE_URL}/api/v1/author/${authorhandle}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const tags = await response.json();
    res.status(response.status).json(tags);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
}
