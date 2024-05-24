import stripe from '../helpers/stripe';

async function stripeToken() {
  const token = await stripe.tokens.create({
    card: {
      // number: '4000 0027 6000 3184',
      number: '4242424242424242',
      exp_month: '12',
      exp_year: '2026',
      cvc: '123',
    },
  });
  return token;
}

async function paymentMethod(tokenId) {
  const methodId = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      token: tokenId,
    },
  });
  return methodId;
}

async function payment(chargeBody, customer) {
  const { DEPLOYED_URL } = process.env;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: chargeBody.amount * 100,
    currency: 'rwf',
    payment_method: chargeBody.method,
    customer: customer.id,
    capture_method: 'automatic',
    confirm: true,
    metadata: chargeBody,
    error_on_requires_action: false,
    setup_future_usage: 'off_session',
    return_url: `${DEPLOYED_URL}/checkout/redirect`,
  });
  return paymentIntent;
}

async function stripeListener(event) {
  const { object } = event.data;
  if (event.type) {
    const body = {
      status: object.status,
      metadata: object.metadata,
      customer: object.customer,
    };
    return body;
  }
  return false;
}

async function getStatus(eventStatus) {
  if (eventStatus === 'succeeded') {
    return 'CONFIRMED';
  }
  if (eventStatus === 'requires_action') {
    return 'PAYMENT_REQUIRED';
  }
  if (eventStatus === 'requires_payment_method') {
    return 'PAYMENT_FAILED';
  }
  return 'PAYMENT_FAILED';
}

async function findOrCreateStripeCustomer(user) {
  const customers = await stripe.customers.list({
    email: user.email,
    limit: 1,
  });

  if (customers.data.length > 0) {
    return customers.data[0];
  }
  // If no customer exists, create a new customer
  const customer = await stripe.customers.create({
    name: user.names,
    email: user.email,
  });
  return customer;
}

export default {
  stripeToken,
  paymentMethod,
  payment,
  getStatus,
  stripeListener,
  findOrCreateStripeCustomer,
};
