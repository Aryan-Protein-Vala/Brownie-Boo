# Brownie Boo!

An independent local storefront and campaign preview. Use Node.js 22.16 or later.

```sh
npm ci
npm run dev
```

Open [Site B](http://127.0.0.1:4173/). For the optimized server, run `npm run build` followed by `npm start`. Both servers bind to loopback.

## Hosted preview

Vercel hosts the product pages, box builder, browser-local bag and arcade game. The hosted homepage picks a different headline on each new load. A cookie tracks the remaining headlines so each browser sees all ten before the next cycle. Links from individual campaigns can set a headline with `?hero=A` through `?hero=J` without advancing the rotation. Paid checkout is disabled.

Boo Club, first-batch interest, product restock and contact forms post to FormSubmit when `BOO_FORMSUBMIT_RECIPIENT` is set to the inbox address or its activated FormSubmit token. Configure the value in Vercel for production or in `.env.local` for local testing. The first submission triggers a confirmation email. Activate the inbox using that email to receive submissions.

Set `BOO_HOSTED_PREVIEW=1` to run in hosted mode outside Vercel.

## Owner preview

Open [Staff](http://127.0.0.1:4173/admin) and use the key generated in `.local/admin-password.txt`. Set `BOO_PREVIEW_ADMIN_PASSWORD` to use your own key. SQLite stores local submissions, accounts, experiment assignments, and draft configuration in `.local/preview.sqlite`. You can point the server at a different private directory with `BOO_PREVIEW_DATA_DIR`.

The bag and box builder let visitors save their picks on the device. Account forms write to the local database. Local waitlist, drop, restock and contact forms also use that database when no FormSubmit recipient is set. Tracking looks up existing order records by reference and email. The owner view manages all nine draft SKUs, batch dates and allocations, discount codes, product notes, and experiment weights. There are no live orders, reservations, payments or delivery integrations. Draft commercial and product information stays private. Public commerce requires approved product and business data, operational providers, and a separate release.

The ten hero campaigns are available at `/?hero=A` through `/?hero=J`. These preview URLs skip new assignment and impression tracking. The local preview assigns active campaigns by weight and remembers the choice using a browser cookie. The local preview starts with campaigns G and J paused. The dashboard counts unique visitors assigned, exposed and clicked, plus sign-ups made through the local database.

## Campaign art

Lenis smooths wheel scrolling and ties the homepage to its GSAP timelines. The lineup moves sideways on larger screens, then the brownie tears open, the box unwraps, and the story gives way to The Drop while the frame holds. Mobile keeps the lineup in the reading flow. Reduced-motion and no-JavaScript visitors get the complete story in document order. Boo’s Brownie Break is an original bakery runner with a browser-local best score.

- `public/art/the-break.webp` and `public/art/the-break-mobile.webp` are responsive crops of the same built-in ImageGen campaign concept.
- The other WebP files are existing development assets from the Brownie Boo project. They illustrate packaging and brownie concepts. Replace this art with approved product photography before release.
- The mascot, icons, and page transitions are original vector and CSS work. The self-hosted fonts include their SIL Open Font License files.

### Hero image prompt

> Photoreal art-directed food campaign photograph for a premium, playful brownie boutique. Landscape 3:2 framing. Extreme close-up of a single thick square dark chocolate fudge brownie broken roughly in two, very large in frame; the jagged glossy moist dark interior faces camera straight on, papery crackled top catching cool softbox light. A little melted chocolate stretches between the two broken edges, a few crumbs suspended midair with realistic shadows and optical depth. Slightly tilted from lower left to upper right. The separated upper piece is about one third of main lower half, dynamically floating to upper right. Background is seamless solid studio plum #421b37, subtle falloff, dark all the way to edges; no table line, plates, hands, lettering, typography, packaging, watermark, decorative graphics or yellow. Rich near-black cocoa against cool berry shadows, moody hard side key, realistic magazine food macro with tack-sharp fine crumbs and texture, no plastic sheen. Wide margins around the floating brownie so it has breathing room. One visceral, believable hero photograph.

### References studied

- [Mammoth Murals](https://mammothmurals.com/)
- [Nevdra](https://nevdra.com/)
- [So Sorry Sugar](https://sosorrysugar.com/)
- [Awwwards web design skill](https://github.com/owenisas/awwwards-web-design)
