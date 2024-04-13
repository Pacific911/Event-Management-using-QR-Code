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

async function payment(chargeBody) {
  const { DEPLOYED_URL } = process.env;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: chargeBody.amount * 100,
    currency: 'rwf',
    payment_method: chargeBody.method,
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

export default {
  stripeToken,
  paymentMethod,
  payment,
  getStatus,
  stripeListener,
};
