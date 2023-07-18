function (user, context, callback) {
  // This gets put in the token and must be namespaced.
  const CONTEXT_ID_TOKEN_KEY = 'https://stripe.com/stripe_customer_id';
  user.app_metadata = user.app_metadata || {};

  if ('stripe_customer_id' in user.app_metadata) {
    context.idToken[CONTEXT_ID_TOKEN_KEY] = user.app_metadata.stripe_customer_id;
    return callback(null, user, context);
  }

  var stripe = require('stripe')(configuration.stripe_key);
  var userId = null;
  if (user.sub) userId = user.sub;
  if (user.user_id) userId = user.user_id;

  var customer = {
    email: user.email,
    name: user.name,
    metadata: {
      accountId: userId,
      accountEmail: user.email,
      accountName: user.name,
      accountPicture: user.picture,
      accountUpdatedAt: user.updated_at
    }
  };
  
  stripe.customers.create(customer, function(err, customer) {
    if (err) {
      return callback(err);
    }

    user.app_metadata.stripe_customer_id = customer.id;

    auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
      .then(function() {
        context.idToken[CONTEXT_ID_TOKEN_KEY] = user.app_metadata.stripe_customer_id;
        callback(null, user, context);
      })
      .catch(function(err) {
        callback(err);
      });
  });
}