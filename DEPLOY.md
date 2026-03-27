# Obsidian Studio — Deploy Guide

## Prerequisites
- Node.js 18+
- Git installed
- GitHub account
- Vercel account (free tier is fine)

---

## Step 1 — Run locally first

```bash
cd obsidian-studio
npm install
npm run build   # confirms no TypeScript or build errors
npm run dev     # preview at http://localhost:3000
```

If `npm run build` passes with no errors, you're ready to deploy.

---

## Step 2 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — Obsidian Studio"
```

Go to github.com → New repository → name it `obsidian-studio` → Create.

Then connect and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/obsidian-studio.git
git branch -M main
git push -u origin main
```

---

## Step 3 — Deploy to Vercel

### Option A — Vercel CLI (fastest)
```bash
npm install -g vercel
vercel login
vercel          # follow prompts — auto-detects Next.js
vercel --prod   # deploy to production
```

### Option B — Vercel Dashboard
1. Go to vercel.com → Add New Project
2. Import your GitHub repo `obsidian-studio`
3. Framework: **Next.js** (auto-detected)
4. Root directory: `./` (leave as default)
5. Click **Deploy**

Vercel will give you a URL like `obsidian-studio.vercel.app` immediately.

---

## Step 4 — Add your custom domain

1. In Vercel dashboard → your project → **Settings → Domains**
2. Add `obsidianstudio.ng` (or your domain)
3. Vercel shows you DNS records to add:
   - `A` record → `76.76.21.21`
   - `CNAME www` → `cname.vercel-dns.com`
4. Add these at your domain registrar (Qservers, WhoGoHost, etc.)
5. DNS propagates in 5–60 minutes — Vercel auto-provisions SSL

---

## Step 5 — Environment variables (optional)

If you add a contact form backend later:

1. Vercel dashboard → your project → **Settings → Environment Variables**
2. Add `NEXT_PUBLIC_SITE_URL` = `https://obsidianstudio.ng`
3. Add any API keys (Resend, SendGrid, etc.)
4. Redeploy: `vercel --prod`

---

## Step 6 — Update BASE_URL before going live

In `src/app/layout.tsx`, change:
```ts
const BASE_URL = "https://obsidianstudio.ng";
```
to your actual domain.

Also update `src/app/sitemap.ts` and `src/app/robots.ts` with the same URL.

---

## After deploy — checklist

- [ ] Visit `/sitemap.xml` — confirm all 5 pages listed
- [ ] Visit `/robots.txt` — confirm sitemap URL is correct
- [ ] Open DevTools → Network → confirm images are WebP/AVIF
- [ ] Check mobile on real device (not just DevTools)
- [ ] Submit sitemap to Google Search Console:
      `https://search.google.com/search-console`
- [ ] Test OG tags: `https://opengraph.xyz`
- [ ] Add `/public/og-image.jpg` (1200×630px) for social sharing previews

---

## Automatic deploys

Every `git push` to `main` triggers a new Vercel deployment automatically.
Preview deployments are created for every pull request.

---

## Performance targets (after real images added)

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 90+ |
| Lighthouse SEO | 100 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID | < 100ms |

Use `npx @unlighthouse/cli` to audit all pages at once.
