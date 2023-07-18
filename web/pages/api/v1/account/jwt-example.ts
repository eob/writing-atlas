
import { NextJwtVerifier } from '@serverless-jwt/next';
const verifyJwt = NextJwtVerifier({
  issuer: process.env.AUTH0_ISSUER_BASE_URL,
  audience: process.env.AUTH0_CLIENT_ID
});

const requireScope = (scope, apiRoute) =>
  verifyJwt(async (req, res) => {
    if (scope) {
      const { claims } = (req as any).identityContext;
      if (!claims || !claims.scope || claims.scope.indexOf(scope) === -1) {
        return res.status(403).json({
          error: 'access_denied',
          error_description: `Token does not contain the required '${scope}' scope`
        });
      }  
    }
    return apiRoute(req, res);
  });

const api = (req, res) => {
  try {
    let shows = {}
    res.status(200).json({ foo: 3 });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
}

export default requireScope(null, api);