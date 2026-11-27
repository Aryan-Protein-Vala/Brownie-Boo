# Brownie Boo!

> Chocolate first. Protein plot twist.

Brownie Boo’s storefront, campaign gallery, and test-kitchen journal. Come for the fudgy chocolate brownie. Stay because somebody put the paneer thief on a separate bill.

<img src="public/art/the-break.webp" alt="A dark chocolate brownie breaking in two against a plum backdrop" width="720">

[Open the hosted preview](https://brownie-boo.vercel.app)

## Get the crumbs going

Use Node.js **22.16 or later**.

```sh
npm ci
npm run dev
```

Open [Brownie Boo on localhost](http://127.0.0.1:4173). For the production build, run `npm run build` and then `npm start`. Both servers bind to loopback. Run `npm run typecheck` for a TypeScript check.

## Take a bite

| Where | What’s inside |
| --- | --- |
| `/` | Ten homepage openings. The brownie still gets the last word. |
| `/shop` and `/build-a-box` | Three brownie concepts, a pick-your-own box, and a bag that remembers your picks on this device. |
| `/marketing` | Apple-to-Orange campaigns. Everyday drama gets a brownie punchline. Download individual PNGs or grab either pack with captions and alt text. |
| `/blog` | **The Crumb Files**, from what makes a brownie fudgy to the numbers on the back of the wrapper. |
| `/pfps` and `/logos` | Boo in thirteen moods and a peek at the wordmark sketches. |
| `/drops` and `/early-access` | First-batch status and a seat in the Boo Club. |

The homepage also has **Boo’s Brownie Break**, a bakery runner with a best score saved on your device. Paid checkout is still in development. Product photos and wrappers in this preview are concepts.

## Behind the counter

| Environment variable | Where it comes in |
| --- | --- |
| `BOO_FORMSUBMIT_RECIPIENT` | Inbox address or activated FormSubmit token for Boo Club, drop, restock, and contact forms. FormSubmit emails the inbox for activation on the first submission. |
| `BOO_HOSTED_PREVIEW` | Set to `1` to run with Vercel’s hosted-preview behaviour outside Vercel. |
| `BOO_PREVIEW_ADMIN_PASSWORD` | Custom password for the local staff view at `/admin`. The default key is generated in `.local/admin-password.txt`. |
| `BOO_PREVIEW_DATA_DIR` | Private directory for local SQLite data. Defaults to `.local`. |
| `BOO_PUBLIC_SITE_URL` | Set to the final HTTPS origin in the production environment and rebuild when the public pages are ready for search. |

Keep local settings in `.env.local`. Put hosted settings in the Vercel project environment.

The local staff view manages nine draft SKUs, batch allocations, discount codes, notes, and homepage experiment weights. SQLite holds local account and form records, experiment assignments, and draft settings in `.local/preview.sqlite` by default. When FormSubmit is unconfigured, local forms use SQLite. The order tracker looks up existing records by reference and email. Public ordering depends on approved product data and configured payment and delivery services.

### Try a different opening line

Use `/?hero=A` through `/?hero=J` for a specific campaign. Direct campaign links skip experiment assignment and impression tracking. The hosted preview rotates through all ten headlines in a cookie before starting the next cycle. The local preview uses weighted assignments, starts with G and J paused, and counts unique assignments, impressions, clicks, and local sign-ups.

### Let search find the crumbs

The production origin enables canonical URLs, social previews, article structured data, and the public sitemap at `/sitemap.xml`. Search crawlers, including OAI-SearchBot, can read the public pages. Local development, Vercel branch previews, and utility pages carry `noindex`.

Edit article copy and sources in [`lib/journal.ts`](lib/journal.ts). Search metadata lives in [`lib/search.ts`](lib/search.ts), with [a sitemap](app/sitemap.ts) and [crawler rules](app/robots.ts).

## The little details

- The homepage uses Lenis and GSAP for the lineup, brownie break, box reveal, and drop sequence. Mobile keeps the lineup in the reading flow. Reduced-motion and no-JavaScript visitors can still read the full story.
- The [campaign gallery](app/marketing) uses native vertical scrolling and swipeable horizontal carousels. Its downloadable artwork lives in [`public/marketing`](public/marketing).
- The mascot, icons, and page transitions are original vector and CSS work. The self-hosted fonts include their [SIL Open Font License files](public/fonts).
- [The break](public/art/the-break.webp) and its [mobile crop](public/art/the-break-mobile.webp) come from one ImageGen campaign concept. The rest of the WebP art depicts brownie and wrapper concepts for the preview.

<details>
<summary>Original hero image prompt</summary>

> Photoreal art-directed food campaign photograph for a premium, playful brownie boutique. Landscape 3:2 framing. Extreme close-up of a single thick square dark chocolate fudge brownie broken roughly in two, very large in frame; the jagged glossy moist dark interior faces camera straight on, papery crackled top catching cool softbox light. A little melted chocolate stretches between the two broken edges, a few crumbs suspended midair with realistic shadows and optical depth. Slightly tilted from lower left to upper right. The separated upper piece is about one third of main lower half, dynamically floating to upper right. Background is seamless solid studio plum #421b37, subtle falloff, dark all the way to edges; no table line, plates, hands, lettering, typography, packaging, watermark, decorative graphics or yellow. Rich near-black cocoa against cool berry shadows, moody hard side key, realistic magazine food macro with tack-sharp fine crumbs and texture, no plastic sheen. Wide margins around the floating brownie so it has breathing room. One visceral, believable hero photograph.

</details>

Design references include [Mammoth Murals](https://mammothmurals.com/), [Nevdra](https://nevdra.com/), [So Sorry Sugar](https://sosorrysugar.com/), and the [Awwwards web design skill](https://github.com/owenisas/awwwards-web-design).
