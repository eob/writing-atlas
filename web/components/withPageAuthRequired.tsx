import { WithPageAuthRequiredOptions, withPageAuthRequired as withPageAuthRequiredBase } from '@auth0/nextjs-auth0';

function isPaidTier(user) {
  return (user["plan"] == "comp")
}

export default function withPageAuthRequired(opts?: WithPageAuthRequiredOptions) {
  let authFn = withPageAuthRequiredBase(opts)
  return async(ctx) => {
    let result = await authFn(ctx) as any;
    // @yaeleiger: no need for paid tier if going to /lists, which should be available to anyone with an account
    if (result && result.props && result.props.user && (isPaidTier(result.props.user) || ctx.req.url==='/lists')) {
      return result
    } else if (result && result.redirect) {
      return result;
    } else {
      return { redirect: { destination: `/beta`, permanent: false } };
    }
  }
}
