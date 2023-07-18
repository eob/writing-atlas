# Billing

Billing is handled via stripe. The best tutorial is [this one](https://stripe.com/docs/billing/subscriptions/fixed-price). 

## Products, and Prices

Via Stripe, there are products (e.g. Basic Plan, Pro Plan) and prices (e.g. $10/mo, $100/year). The actual object that the user subscribes to is a price, not a product.

In the RBC test data:

- Basic Plan (prod_ITzOr7Kv3GNbLa) -> $0.50 / mo (price_1Ht1Q6J8kHh2FyYyMfH1DWqX) 
- Pro Plan (prod_IQeQWrw0nzKDq8) -> $1.00 / mo (price_1Hpn7cJ8kHh2FyYyv1g7h1je)

## Signup Flow

The user selects a Product+Price, then creates a Subscription object. This results in :

- An Invoice object, and a PaymentIntent object
- A Customer object associated with the PaymentMethod object

We create a Stripe customer automatically via Auth0 upon login.
