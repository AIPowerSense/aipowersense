# PayPal Integration Setup Guide

## Overview
PayPal integration has been added to the pricing buttons and Deploy Now CTA section. The implementation includes:

- **PayPal Buttons Component** (`src/components/PayPalButton.tsx`) - Reusable component for PayPal buttons
- **Environment Configuration** (`.env.local`) - Stores PayPal Client ID
- **Backend Setup Guide** (`src/utils/paypalSetup.ts`) - Backend implementation examples

## Quick Start

### 1. Environment Setup
Your `.env.local` file is already configured with:
```
VITE_PAYPAL_CLIENT_ID=AW8LwOyHYamK0tA4exHDNjZWcDzSp2Oazkp5k63SxyBqApaUlf4e3wYBk-uH_CvEOQtKDF8eFTDeM1OO
```

### 2. Frontend Integration
The following buttons now support PayPal payments:

**Pricing Page (Solutions.tsx):**
- **Alpha Plan** - Free Tier (Start Pilot button)
- **Sigma Plan** - $2,499/month (Deploy Now button) - Uses PayPal
- **Omega Plan** - Custom (Contact Sales link)

**Deploy Now CTA Section:**
- PayPal button for Enterprise deployment
- Alternative Contact Sales button

### 3. Backend Implementation (REQUIRED)

Your PayPal Secret Key is: `EMhSJu2Tq4TUeEznCCj6GiMsu5Lg1wDAd-sJO8HsP1whnOL_3EF3oMv75LhtLZ4eRRXkORLYnLDyqmRf`

⚠️ **SECURITY**: This key should ONLY be stored in your backend `.env` file, never in frontend code.

#### Create Backend Endpoints
1. **POST `/api/paypal/create-subscription`**
   - Creates a subscription on PayPal side
   - Returns approval link

2. **POST `/api/paypal/verify-payment`**
   - Verifies payment after user approval
   - Confirms subscription is active

See `src/utils/paypalSetup.ts` for example Node.js implementation.

### 4. Create PayPal Billing Plans

1. Log in to [PayPal Developer Dashboard](https://developer.paypal.com)
2. Go to Billing Plans section
3. Create 3 plans:
   - **Alpha Plan** - Free trial (optional)
   - **Sigma Plan** - $2,499/month billing
   - **Omega Plan** - Custom pricing

4. Copy the Plan IDs and update `getPlanId()` in `src/components/PayPalButton.tsx`:
```typescript
const planIds: { [key: string]: string } = {
  'alpha': 'YOUR_ALPHA_PLAN_ID',
  'sigma': 'YOUR_SIGMA_PLAN_ID',
  'omega': 'YOUR_OMEGA_PLAN_ID',
};
```

### 5. Testing

**In Sandbox Mode:**
- Use test account credentials from PayPal Dashboard
- Navigate to pricing or deploy sections
- Click PayPal buttons to test flow

**Switching to Production:**
1. Generate production credentials in PayPal Dashboard
2. Update `.env.local`:
   ```
   VITE_PAYPAL_CLIENT_ID=your_production_client_id
   VITE_API_URL=https://your-production-api.com
   ```
3. Update backend `.env`:
   ```
   PAYPAL_CLIENT_ID=your_production_client_id
   PAYPAL_SECRET=your_production_secret
   PAYPAL_MODE=live
   ```

## File Changes

- ✅ `src/components/PayPalButton.tsx` - New PayPal button component
- ✅ `src/pages/Solutions.tsx` - Updated pricing cards and CTA
- ✅ `.env.local` - PayPal credentials
- ✅ `src/utils/paypalSetup.ts` - Backend setup examples

## Important Notes

1. **Client ID** - Safe to expose in frontend (used for rendering buttons)
2. **Secret Key** - MUST stay in backend only
3. **HTTPS Required** - PayPal requires HTTPS in production
4. **Plan IDs** - Get these from PayPal Developer Dashboard after creating billing plans
5. **Return URLs** - Configure success/cancel URLs in your backend

## Support Resources

- [PayPal Checkout Integration](https://developer.paypal.com/docs/checkout/overview/)
- [PayPal Subscriptions](https://developer.paypal.com/docs/subscriptions/overview/)
- [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)

## Next Steps

1. Set up your backend with the provided endpoints
2. Create PayPal billing plans and get their IDs
3. Update `getPlanId()` with your plan IDs
4. Test thoroughly in sandbox mode
5. Deploy to production
