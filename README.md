# Zeenat Liavule — ICT Portfolio

Static HTML, CSS and JavaScript portfolio. The contact form stores submissions in the `public.portfolio_contact_messages` table in Supabase.

## Deploy on Vercel

- Framework preset: Other
- Root directory: `./`
- Build command: leave blank
- Output directory: leave blank (static root)
- No server-side secrets are required for this static site. The browser uses the Supabase publishable key, protected by database Row Level Security. Never add a Supabase service-role key to browser code.

## Supabase

The `portfolio_contact_messages` table has Row Level Security enabled. Public visitors can insert contact submissions, but public read access is not granted.

## Notes

The source archive did not include a CV document in `documents/`, so the Download CV link still needs a real CV file to become functional.
