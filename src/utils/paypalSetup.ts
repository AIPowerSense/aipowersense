/**
 * IMPORTANT SECURITY NOTE:
 * 
 * The PayPal secret key provided must NEVER be exposed in frontend code.
 * It should only be stored securely in your backend environment variables.
 * 
 * Example Node.js/Express backend setup:
 * 
 * .env (backend):
 * PAYPAL_CLIENT_ID=AW8LwOyHYamK0tA4exHDNjZWcDzSp2Oazkp5k63SxyBqApaUlf4e3wYBk-uH_CvEOQtKDF8eFTDeM1OO
 * PAYPAL_SECRET=EMhSJu2Tq4TUeEznCCj6GiMsu5Lg1wDAd-sJO8HsP1whnOL_3EF3oMv75LhtLZ4eRRXkORLYnLDyqmRf
 * PAYPAL_MODE=sandbox (or live for production)
 */

import axios from 'axios';

// Backend endpoint example for creating PayPal subscriptions
export async function createPayPalSubscription(subscriptionData: {
  planId: string;
  quantity: number;
  returnUrl: string;
  cancelUrl: string;
}) {
  try {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const secret = process.env.PAYPAL_SECRET;
    const mode = process.env.PAYPAL_MODE || 'sandbox';
    
    // Get access token
    const auth = Buffer.from(`${clientId}:${secret}`).toString('base64');
    const tokenResponse = await axios.post(
      `https://api.${mode}.paypal.com/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Create subscription
    const response = await axios.post(
      `https://api.${mode}.paypal.com/v1/billing/subscriptions`,
      {
        plan_id: subscriptionData.planId,
        subscriber: {
          name: {
            given_name: 'Subscriber',
          },
          email_address: 'subscriber@example.com',
        },
        application_context: {
          brand_name: 'Energy Intelligence Platform',
          locale: 'en-US',
          user_action: 'SUBSCRIBE_NOW',
          return_url: subscriptionData.returnUrl,
          cancel_url: subscriptionData.cancelUrl,
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('PayPal subscription error:', error);
    throw error;
  }
}

/**
 * SETUP INSTRUCTIONS:
 * 
 * 1. Install backend dependencies:
 *    npm install axios express dotenv cors
 * 
 * 2. Create backend endpoints:
 *    POST /api/paypal/create-subscription
 *    POST /api/paypal/verify-payment
 * 
 * 3. Update frontend PayPalButton.tsx to call these endpoints
 * 
 * 4. Set up PayPal plan IDs:
 *    - Log in to PayPal Business account
 *    - Create billing plans for each tier (Alpha, Sigma, Omega)
 *    - Copy plan IDs and update getPlanId() function in PayPalButton.tsx
 * 
 * 5. For production:
 *    - Generate new PayPal credentials from PayPal Developer Console
 *    - Update both CLIENT_ID and SECRET
 *    - Change PAYPAL_MODE to 'live'
 *    - Test thoroughly before going live
 */
