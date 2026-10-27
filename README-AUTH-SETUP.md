# Portfolio authentication setup

The sign-in and sign-up pages use Supabase Auth with the Supabase JavaScript v2 client.

## 1. Connect Supabase
1. Open the dedicated Supabase project for this portfolio.
2. Copy the Project URL and the publishable key (or legacy anon key) from Project Settings → API.
3. Replace the two placeholder values in `js/supabase-config.js`.
4. Never place a `service_role` key or a secret key in browser code.

## 2. Configure authentication URLs
In Supabase Authentication → URL Configuration:
- Set Site URL to the deployed Vercel URL.
- Add the deployed Vercel URL and local development URL to Redirect URLs.
- Choose whether email confirmation is required for new accounts.

## 3. Deploy
Commit the configuration change to GitHub. Vercel should rebuild automatically if the repository is linked to the project.

## Notes
- These pages provide account registration, email/password sign-in, and password-reset email requests.
- The portfolio itself remains public; these pages do not gate private content.
- Do not store private user data in public tables without Row Level Security (RLS) and ownership policies.
