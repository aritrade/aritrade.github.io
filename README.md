# Aritra De — personal site

Vite + React + TypeScript static site for [Aritra De](https://github.com/aritrade).  
Live (GitHub Pages): **https://aritrade.github.io/**

## 1. Run locally

```bash
cd aritra-personal-site   # or wherever you cloned this repo
npm install
npm run dev
```

Open the URL Vite prints (usually `http://127.0.0.1:5173/`).

```bash
npm run build    # writes static files to dist/
npm run preview  # optional local preview of the production build
```

Do **not** hand-edit files inside `dist/`. That folder is generated and deployed by CI.

## 2. Content map (one source of truth)

All visible copy lives in **`src/data/content.ts`**. Ordinary updates do not need JSX changes.

| What to change | Where in `content.ts` |
| --- | --- |
| Name, headline, hero lede | `profile.name`, `profile.positioning`, `profile.heroLede` |
| Phone | `profile.phone` (display) and `profile.phoneTel` (`tel:` digits, e.g. `+919147116011`) |
| Email | `profile.email` |
| Links (LinkedIn, GitHub, Medium, Credly, Topmate, Calendly) | `profile.links.*` |
| Expertise lines (hero) | `expertise` array — add, edit, or delete a string |
| Hero numbers (`11+`, `40`) | `heroMetrics` — `display`, `value`, `label` |
| About paragraphs / pillars | `about.paragraphs`, `about.highlights`, `about.pullQuote` |
| Education | `education` |
| Jobs | `experience` — push a role object to add; delete an object to remove |
| Skills | `skills` |
| Certifications | `certifications.featured`, `certifications.resumeOnly`, `certifications.credlyCount` |
| Projects | `projects` |
| Writing | `writing` |
| Mentoring / Topmate | `mentoring` |
| Gallery captions / photos | `gallery` (see below) |
| Section titles & decks | `sections` |
| Nav labels | `nav` |
| Small UI labels (CTAs, etc.) | `ui` |

Layout and styling stay in `src/App.tsx` and `src/index.css`. Only touch those for design changes.

## 3. Photos

**Add a photo**

1. Put a JPEG in `public/` (example: `public/gallery-summit.jpg`).
2. In `gallery` inside `content.ts`, add:

```ts
{
  src: "/gallery-summit.jpg",
  alt: "Short description",
  label: "Short label",
  aspect: "portrait", // or "landscape" | "square"
},
```

**Remove a photo**

1. Delete that object from `gallery`.
2. Optionally delete the file from `public/`.

Hero portrait uses `/aritra-de.jpg` via the first gallery entry and the hero `<img>` in `App.tsx` (same file). Replace `public/aritra-de.jpg` to change the portrait without code edits.

## 4. Publishing (keep the site current)

Five-step loop:

1. Edit `src/data/content.ts` (and/or drop photos in `public/`).
2. Run `npm run dev` and check the page locally.
3. `git add` the changed files (never `dist/` or `node_modules/`).
4. `git commit` with a short message, then `git push origin main`.
5. GitHub Actions builds and deploys Pages automatically (workflow: `.github/workflows/pages.yml`).

Live URL: **https://aritrade.github.io/**

If Pages does not go live after the first push, open the repo → **Settings → Pages** and confirm Source is **GitHub Actions**.

### Repo / base path

This project is published as the **user site** repo `aritrade.github.io`, so Vite `base` is `/` in `vite.config.ts`.  
If you ever move it to a project repo (e.g. `aritra-personal-site`), set `base: "/aritra-personal-site/"` and update that config before building.

## 5. What not to do

- Do not invent employers, metrics, quotes, or certifications.
- Do not commit secrets, `.env`, or `node_modules`.
- Do not upload a hand-zipped `dist/` as the long-term update path — use the content file + push loop above.
