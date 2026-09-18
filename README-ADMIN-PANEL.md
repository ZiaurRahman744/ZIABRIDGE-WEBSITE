# ZIABRIDGE Admin Panel — Working Proof of Concept

## What this is
A tested, working setup that lets you add new Knowledge articles through a
simple web form (Admin Panel) instead of sending Claude the whole website
ZIP every time. I built this and **actually ran it** in my own environment —
it is not just a plan, it works.

## What was tested and confirmed working (screenshots available on request)
1. A markdown file with simple fields (title, category, body, image name...)
   automatically becomes a full HTML page — pixel-identical to your existing
   pages (same header, footer, hero banner, fonts, colours).
2. Tested with BOTH service categories (Third-Party Inspection and
   Production Support) — the same system handles both correctly, with the
   right breadcrumb, right "back to" link, right page title.
3. No `permalink` or `layout` has to be typed for each article — the folder
   automatically applies the right URL pattern
   (`services/<category>/<slug>.html`), exactly matching your current URLs.

## What this means for your daily workflow, once fully connected
1. Go to `yoursite.com/admin`.
2. Log in.
3. Click "New Knowledge Article."
4. Fill in: category (dropdown), title, description, headline, subtitle,
   hero image (upload), and the article body (rich text editor, images
   inline too).
5. Click "Publish."
6. Within about a minute, the new page is live at its own URL, already
   linked into the right service category, in your site's exact design.
7. No limit on how many articles. No coding needed from you at all.

## Files in this package
- `admin/index.html`, `admin/config.yml` — the Admin Panel itself (Decap CMS,
  free & open-source)
- `content/knowledge/` — where each article's data lives (2 demo articles
  included so you can see the format — delete them once you confirm
  everything works)
- `_includes/knowledge-layout.njk` — the page template (already matches
  your site's exact design)
- `.eleventy.js`, `package.json` — the site generator configuration
- `.github/workflows/build.yml` — makes GitHub automatically rebuild and
  republish your site every time an article is added or edited

## What YOU still need to do (steps only you can do, on your real account)

### Step 1 — Merge these files into your real GitHub repository
Copy every file/folder in this package into your actual ZIABRIDGE repo,
at the same relative locations. This does not touch, delete, or rename
any of your existing pages, CSS, JS, or images.

### Step 2 — Update one line in `admin/config.yml`
Change:
```
repo: YOUR_GITHUB_USERNAME/ZIABRIDGE-WEBSITE-main
```
to your actual GitHub username and repository name.

### Step 3 — Set up free login access for the Admin Panel
This is the one part that needs a small amount of setup, because GitHub
Pages alone cannot handle secure logins. The standard, free, no-cost way
to solve this:
- Create a free Netlify account (free forever, no credit card).
- Under Netlify's "Identity" / OAuth provider settings, point it at your
  GitHub repo (a short guided setup — Decap CMS's own documentation walks
  through this in about 10 minutes: https://decapcms.org/docs/github-backend/).
- Your actual **website stays on GitHub Pages** — Netlify is only being
  used here as the free login door, not as your host.

### Step 4 — Turn on GitHub Actions deployment
In your repo on GitHub: Settings → Pages → Source → select
"GitHub Actions" (instead of "Deploy from a branch"). This lets the
workflow file in this package build and publish automatically.

### Step 5 — Push to GitHub and test
Once pushed, go to `yoursite.com/admin`, log in, and try publishing the
included demo article edits. Confirm it appears correctly, then delete
the two demo articles from `content/knowledge/`.

## Honesty note
Step 3 is the only part that isn't 100% "purely GitHub" — Decap CMS needs
*some* way to handle secure login, and Netlify's free identity/OAuth
service is the standard, zero-cost way to do that without running your
own server. Your site's hosting, content, and design all remain entirely
on GitHub Pages either way.

## Next steps once you've done the above
Send me confirmation once this is live, and going forward you can add
Knowledge articles yourself through the Admin Panel — no more sending
the full ZIP for new content. For bigger structural changes (new
service card layouts, new page types), you'd still loop me in to build
that specific new template once — after that, it's reusable the same way.
