import { publicMetadata } from "../../lib/search";
import { Arrow, Drips } from "../../components/art";
import { SiteLink } from "../../components/shell";
import { art, packs, products } from "../../lib/catalogue";

export const metadata = publicMetadata({
  path: "/shop",
  title: "Chocolate Brownies with Protein",
  description: "Meet The Original Boo, Double Trouble, and Boujee Boo. Explore Brownie Boo’s three chocolate brownie concepts, their protein sources, and first-batch plans.",
  image: "/art/drop-1120.webp",
});

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ size?: string }>;
}) {
  const query = await searchParams;
  const selected = packs.find(({ grams }) => String(grams) === query.size);
  return (
    <section className="shop-page">
      <header className="shop-intro">
        <div>
          <p className="tag">Shop All</p>
          <h1>
            What’s <em>your type?</em>
          </h1>
        </div>
        <div>
          <p>
            Three chocolate brownies, all very available. Pick your Boo and
            choose how serious you want to get about the pack size.
          </p>
          <div className="shop-filters" aria-label="Browse by pack size">
            <SiteLink
              className={selected ? "ink-action" : "ink-action is-active"}
              href="/shop"
            >
              All sizes
            </SiteLink>
            {packs.map(({ grams }) => (
              <SiteLink
                key={grams}
                className={
                  selected?.grams === grams
                    ? "ink-action is-active"
                    : "ink-action"
                }
                href={`/shop?size=${grams}`}
              >
                {grams} g
              </SiteLink>
            ))}
          </div>
        </div>
      </header>
      <div className="shop-index">
        {products.map((product) => (
          <SiteLink
            key={product.slug}
            className={`shop-item tint-${product.theme}`}
            href={`/shop/${product.slug}${selected ? `?size=${selected.grams}` : ""}`}
          >
            <Drips className="section-drip shop-edge" />
            <span className="shop-item-name">{product.name}</span>
            <span className="shop-item-meta">
              {selected
                ? `${selected.name} · ${selected.grams} g`
                : product.ingredients}
            </span>
            <span className="shop-item-photo">
              <img
                src={art(product.wrapper)}
                alt={`${product.name} concept packaging`}
                width="960"
                height="640"
                loading="lazy"
              />
            </span>
            <Arrow />
          </SiteLink>
        ))}
      </div>
      <p className="shop-note">
        <Drips className="section-drip shop-edge" />
        The wrappers are still getting dressed. Orders open with a confirmed
        drop. <SiteLink href="/drops">See upcoming drops</SiteLink>
      </p>
    </section>
  );
}
