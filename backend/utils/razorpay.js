const crypto = require('crypto');

function getRazorpayConfig() {
  const keyId = String(process.env.RAZORPAY_KEY_ID || '').trim();
  const keySecret = String(process.env.RAZORPAY_KEY_SECRET || '').trim();

  return {
    keyId,
    keySecret,
    configured: Boolean(keyId && keySecret),
  };
}

async function createRazorpayOrder({ amount, currency, receipt, notes = {} }) {
  const { keyId, keySecret, configured } = getRazorpayConfig();
  if (!configured) {
    throw new Error('Razorpay credentials are not configured');
  }

  const response = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
    },
    body: JSON.stringify({
      amount,
      currency,
      receipt,
      notes,
    }),
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = typeof data === 'string'
      ? data
      : data?.error?.description || data?.message || 'Unable to create Razorpay order';
    throw new Error(message);
  }

  return data;
}

function verifyPaymentSignature({ orderId, paymentId, signature }) {
  const { keySecret, configured } = getRazorpayConfig();
  if (!configured || !orderId || !paymentId || !signature) {
    return false;
  }

  const generatedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
}

module.exports = {
  createRazorpayOrder,
  getRazorpayConfig,
  verifyPaymentSignature,
};
