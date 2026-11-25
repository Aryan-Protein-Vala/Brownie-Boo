import type { Metadata } from "next";
import { Arrow, Drips } from "../../components/art";
import { SiteLink } from "../../components/shell";
import { art, packs, products } from "../../lib/catalogue";

export const metadata: Metadata = { title: "The Boo Family" };

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
            Meet the <em>Boos.</em>
          </h1>
        </div>
        <div>
          <p>
            Three types worth getting involved with. Pick your chocolate brownie
            and a size to suit the situation.
          </p>
          <div className="shop-filters" aria-label="Browse by pack size">
            <SiteLink className={!selected ? "is-active" : ""} href="/shop">
              All sizes
            </SiteLink>
            {packs.map(({ grams }) => (
              <SiteLink
                key={grams}
                className={selected?.grams === grams ? "is-active" : ""}
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
        Packaging concepts. Orders open with a confirmed drop.{" "}
        <SiteLink href="/drops">Check Upcoming Drops</SiteLink>
      </p>
    </section>
  );
}
