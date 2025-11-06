# Municx Technology — v6

Aurora glass theme, neural wave hero, PayPal checkout with automated license email, and an English /vision page.

## Local dev
```
npm install
npm run dev
```
Open http://localhost:3000

## Environment
Create `.env.local` (also add in Vercel Settings → Environment Variables):
```
NEXT_PUBLIC_BASE_URL=https://municxsystems.com

# PayPal
PAYPAL_CLIENT_ID=YOUR_CLIENT_ID
PAYPAL_SECRET=YOUR_SECRET
PAYPAL_ENV=sandbox  # later: live

# SMTP for license email
FROM_EMAIL=contact@municxsystems.com
SMTP_HOST=smtp.YOURHOST.tld
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@municxsystems.com
SMTP_PASS=YOUR_PASSWORD

# Downloads
DOWNLOAD_URL_LITE=https://municxsystems.com/downloads/municx-suite-lite.zip
DOWNLOAD_URL_PRO=https://municxsystems.com/downloads/municx-suite-pro.zip
DOWNLOAD_URL_ENT=https://municxsystems.com/downloads/municx-suite-enterprise.zip
```

## How checkout works
- `/api/paypal/create` creates an order and redirects the buyer to PayPal.
- After payment, PayPal returns with `?paypal=success&token=<orderId>`.
- `/api/paypal/capture` captures, generates a license, and emails the key + download link.

## Notes
- Prices are set in `lib/paypal.ts` (change anytime).
- Replace placeholder download URLs when your files are ready.
