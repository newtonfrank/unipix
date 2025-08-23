# Unixpix
A legal-compliant, display-only multi-source free image finder built on Next.js (App Router + TypeScript). It fetches images from Unsplash, Pexels, and Pixabay and redirects users to the original provider page to download.

## Features
- Combined **Trending/Featured** homepage (interleaves Unsplash, Pexels curated, Pixabay popular).
- **Search** page querying all providers in parallel; interleaved results.
- Per-card **provider badge**, **author credit**, and **Go to original** button.
- **Unsplash** download tracking via official `download_location` endpoint.
- No hosting of originals—images are hotlinked from provider CDNs.
- **Compliance** page with attribution and links to provider terms.

## Getting Started
1. Create `.env.local` from `.env.example` and fill your keys.
2. Install deps and run:
```bash
pnpm i    # or npm i / yarn
pnpm dev  # or npm run dev
```
Then open http://localhost:3000

## Environment Variables
- `UNSPLASH_ACCESS_KEY` (required)
- `PEXELS_API_KEY` (required)
- `PIXABAY_API_KEY` (required)
- `APP_NAME` (default: Unixpix) — used for UTM on Unsplash links.

## Notes on Compliance
- We **do not** mirror or bulk-redistribute originals.
- We **always** show provider attribution and author details.
- Unsplash links include `utm_source=<APP_NAME>&utm_medium=referral`.

## Deploy
This project is Vercel-ready. Add the env vars in your project settings, then deploy.
# unipix
