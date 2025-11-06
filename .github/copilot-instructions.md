# Municx Technology Site v6 - AI Coding Guide

## Project Overview
- Next.js site with PayPal integration and automated license key generation/delivery
- Uses Aurora glass theme with neural wave hero animation
- Key components: product pages, payment flow, license system, email notifications

## Architecture & Data Flow

### Payment Flow
1. User selects tier (`LITE`/`PRO`/`ENT`) → PayPal button triggers `/api/paypal/create`
2. After payment → PayPal redirects with `?paypal=success&token=<orderId>`
3. Capture endpoint processes payment and delivers license:
   ```typescript
   POST /api/paypal/capture
   → captureOrder(orderId)
   → generateLicense(tier) 
   → sendLicenseEmail(email, tier, key, downloadUrl)
   ```

### Environment & Configuration
- Prices defined in `lib/paypal.ts` (configurable without deployment)
- Critical ENV vars (see `.env.local` template in README):
  - PayPal credentials (`PAYPAL_CLIENT_ID`, `PAYPAL_SECRET`, `PAYPAL_ENV`)
  - SMTP settings for license delivery
  - Product download URLs 

## Development Workflow

### Setup
```bash
npm install
npm run dev  # http://localhost:3000
```

### Key Files
- `lib/paypal.ts` - PayPal API integration & pricing
- `lib/license.ts` - License key generation (`MXSUITE-{TIER}-XXXX-XXXX-XXXX`)
- `lib/mailer.ts` - SMTP-based license delivery
- `components/PayPalBuyButton.tsx` - Payment UI integration

### Patterns & Conventions
- API routes use Next.js App Router pattern in `app/api/`
- Strict typing for tier values: `type Tier = 'LITE'|'PRO'|'ENT'`
- Currency standardized to EUR
- License format: `MXSUITE-{TIER}-{RANDOM}-{RANDOM}-{RANDOM}`

## Integration Points
- PayPal REST API (sandbox/live modes)
- SMTP for license delivery emails
- External download URLs for software delivery

## Testing Notes
- Use PayPal sandbox mode for testing (`PAYPAL_ENV=sandbox`)
- Test license email delivery with real SMTP credentials
- Verify license key format for each tier