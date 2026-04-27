# The Fish Hub website

Professional seafood business website starter for **thefishhub.lk**.

## What is included
- Premium homepage for The Fish Hub
- Seafood catalog and gallery
- Quote request form
- Email sending API route using Gmail SMTP
- Contact section with phone, WhatsApp, email and delivery area
- Ready for Vercel deployment

## 1. Install
```bash
npm install
```

## 2. Add environment variables
Copy `.env.example` to `.env.local` and fill in the values.

For Gmail:
1. Turn on 2-Step Verification on the Gmail account.
2. Create an App Password for Mail.
3. Put that App Password in `SMTP_PASS`.

## 3. Run locally
```bash
npm run dev
```

## 4. Deploy to Vercel
- Push this project to GitHub
- Import the repo into Vercel
- Add the same environment variables in Vercel Project Settings
- Deploy

## 5. Connect your domain
Inside Vercel:
- Open your project
- Go to **Settings > Domains**
- Add `thefishhub.lk`
- Vercel will show the DNS records to add

Inside your domain registrar:
- Open DNS management for `thefishhub.lk`
- Add the records Vercel shows you
- Save and wait for propagation

## Notes
- The quote form sends emails to `ORDER_TO_EMAIL`
- The phone numbers and seafood list are already filled with your current details
- Replace or add more seafood photos inside `public/images`
