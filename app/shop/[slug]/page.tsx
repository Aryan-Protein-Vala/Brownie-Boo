import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Drips, FamilySeam } from "../../../components/art";
import { Waitlist } from "../../../components/forms";
import { ProductControls } from "../../../components/shop";
import { SiteLink } from "../../../components/shell";
import { art, findProduct, packs, products } from "../../../lib/catalogue";
import { formSubmitEndpoint, hasCustomerForms } from "../../../lib/formsubmit";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ size?: string }>;
};
export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = findProduct((await params).slug);
  return { title: product?.name ?? "Brownie" };
}

export default async function ProductPage({ params, searchParams }: Props) {
  const product = findProduct((await params).slug);
  if (!product) notFound();
  const { size } = await searchParams;
  const initialGrams =
    packs.find(({ grams }) => String(grams) === size)?.grams ?? 50;
  return (
    <article className={`product-page tint-${product.theme}`}>
      <div className="product-top">
        <figure className="product-hero">
          <img
            src={art(product.wrapper)}
            alt={`${product.name} brownie and packaging concept`}
            width="960"
            height="640"
            fetchPriority="high"
          />
          <FamilySeam className="product-photo-side" />
          <Drips className="section-drip product-photo-bottom" />
          <figcaption>Packaging concept</figcaption>
        </figure>
        <div className="product-intro">
          <SiteLink href="/shop" className="tag product-back">
            All Boos
          </SiteLink>
          <h1>
            {product.split[0]}
            <br />
            <em>{product.split[1]}</em>
          </h1>
          <p>{product.description}</p>
          <ProductControls
            key={initialGrams}
            product={product}
            initialGrams={initialGrams}
          />
        </div>
      </div>
      <section className="product-detail">
        <Drips className="section-drip product-edge" />
        <figure className="torn-photo">
          <img
            src={art(product.cut)}
            alt="Close-up of the brownie crumb in the packaging concept"
            width="640"
            height="430"
            loading="lazy"
          />
        </figure>
        <div>
          <h2>
            Inside
            <br />
            <em>the Boo.</em>
          </h2>
          <dl>
            <dt>Protein sources</dt>
            <dd>{product.ingredients}</dd>
            <dt>Known allergens in the formulation</dt>
            <dd>{product.allergens}</dd>
          </dl>
          <p>
            Verified nutrition, full ingredients and cross-contact information
            will be available before release.
          </p>
          <SiteLink className="text-link" href="/ingredients">
            Ingredients & Nutrition
          </SiteLink>
          {hasCustomerForms && (
            <details className="restock">
              <summary>Get restock updates for this Boo</summary>
              <Waitlist
                endpoint={formSubmitEndpoint}
                topic={`restocks: ${product.slug}`}
              />
            </details>
          )}
        </div>
      </section>
    </article>
  );
}
