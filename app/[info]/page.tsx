import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Arrow, Boo, Drips, SketchCount } from "../../components/art";
import { Account, Contact, Track, Waitlist } from "../../components/forms";
import { SiteLink } from "../../components/shell";
import { art, products, questions } from "../../lib/catalogue";
import { hasLocalServices } from "../../lib/preview-mode";

const titles = {
  "our-story": "Our Story",
  ingredients: "Ingredients & Nutrition",
  drops: "Upcoming Drops",
  "early-access": "The Boo Club",
  faq: "Frequently Asked Questions",
  contact: "Contact Us",
  account: "Customer Account",
  track: "Order Tracking",
  privacy: "Privacy Policy",
  terms: "Terms and Conditions",
  shipping: "Shipping and Refund Policy",
};

type Route = keyof typeof titles;
type Props = { params: Promise<{ info: string }> };
function isRoute(info: string): info is Route {
  return Object.hasOwn(titles, info);
}
export function generateStaticParams() {
  return Object.keys(titles).map((info) => ({ info }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const info = (await params).info;
  return { title: isRoute(info) ? titles[info] : "All crumbs" };
}

function Page({
  label,
  heading,
  children,
  theme = "paper",
  copy,
}: {
  label: string;
  heading: ReactNode;
  children: ReactNode;
  theme?: string;
  copy?: string;
}) {
  return (
    <section className={`info-page tint-${theme}`}>
      <div className="info-intro">
        <p className="tag">{label}</p>
        <h1>{heading}</h1>
        {copy && <p>{copy}</p>}
      </div>
      {children}
    </section>
  );
}

function Legal({ kind }: { kind: "privacy" | "terms" | "shipping" }) {
  const docs = {
    privacy: [
      [
        "What this preview stores",
        hasLocalServices
          ? "Email addresses submitted to the Boo Club, messages sent through the contact form, and any accounts you create are stored on the machine running Site B. Passwords are stored as hashes. Your bag stays in this browser."
          : "Your bag stays in this browser. This storefront preview does not collect sign-ups, contact messages or account details.",
      ],
      [
        hasLocalServices ? "How it’s used" : "Your bag",
        hasLocalServices
          ? "We use submitted information to run the preview, remember your sign-in and bag, and count which hero campaigns lead to sign-ups. The hero cookie carries a random identifier. Email and payment providers are disconnected."
          : "We save your brownie picks on this device so they’re here when you come back.",
      ],
      [
        "Your choices",
        hasLocalServices
          ? "You can clear browser storage to remove your bag and cookies. Use the contact form for a request about saved preview records."
          : "You can clear browser storage to reset your bag.",
      ],
    ],
    terms: [
      [
        "The storefront preview",
        "Formulations and packaging are in development. Product visuals are illustrative concepts.",
      ],
      [
        "Bags and early access",
        hasLocalServices
          ? "Adding food to a bag saves your picks on this device. Joining the Boo Club or registering interest lets us record your preferences. Both are free and carry no obligation to buy."
          : "Adding brownies to your bag saves your picks on this device. It carries no obligation to buy.",
      ],
      [
        "When the shop opens",
        "Verified product information, prices and commercial terms will be available before orders open.",
      ],
    ],
    shipping: [
      [
        "Production and dispatch",
        "Brownie Boo plans to make brownies in scheduled batches. Confirmed release dates, expected dispatch and available destinations will appear with each drop.",
      ],
      [
        "Shipping, cancellations and refunds",
        "Shipping options and refund terms will be published before checkout opens. Paid ordering is currently closed.",
      ],
    ],
  };
  return (
    <Page label="Brownie Boo! Site B" heading={titles[kind]}>
      <div className="legal-copy">
        {docs[kind].map(([heading, copy]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            <p>{copy}</p>
          </section>
        ))}
        <SiteLink href="/contact" className="text-link">
          Contact Brownie Boo <Arrow />
        </SiteLink>
      </div>
    </Page>
  );
}

export default async function Info({ params }: Props) {
  const route = (await params).info;
  if (!isRoute(route)) notFound();

  switch (route) {
    case "our-story":
      return (
        <article className="origin">
          <header>
            <p className="tag">Our Story</p>
            <h1>
              Taking life’s problems unseriously.
              <br />
              <em>Taking chocolate very seriously.</em>
            </h1>
          </header>
          <figure className="origin-photo">
            <Drips className="section-drip origin-photo-top" />
            <img
              src={art("ritual-960")}
              alt="Two hands splitting a brownie in an illustrative campaign photograph"
              width="960"
              height="640"
            />
            <Drips className="section-drip origin-photo-bottom" />
          </figure>
          <div className="origin-copy">
            <h2>
              More chocolate.
              <br />
              <em>Less overthinking.</em>
            </h2>
            <div>
              <p>
                Pointless meetings. The group project nobody replied to. That
                text you probably shouldn’t send. Life gives us plenty to
                overthink.
              </p>
              <p>
                We’re working on chocolate brownies with three protein blends.
                Something to keep in your bag, eat between meetings, or have for
                dessert on a Tuesday. That part we take seriously.
              </p>
              <SiteLink className="action action-ink" href="/shop">
                Meet the Boos
              </SiteLink>
            </div>
          </div>
        </article>
      );
    case "ingredients":
      return (
        <Page
          label="Ingredients & Nutrition"
          heading={
            <>
              What’s inside <em>your Boo?</em>
            </>
          }
          copy="Relationship history is complicated. Here’s what goes into each Boo."
          theme="lilac"
        >
          <div className="ingredients-ledger">
            {products.map((product) => (
              <article key={product.slug}>
                <h2>
                  <SiteLink href={`/shop/${product.slug}`}>
                    {product.name}
                  </SiteLink>
                </h2>
                <p>{product.ingredients}.</p>
                <p>
                  <strong>Known allergens</strong> {product.allergens}.
                </p>
              </article>
            ))}
            <section>
              <h2>Nutrition and labels</h2>
              <p>
                We’re confirming exact values, final ingredient lists,
                cross-contact, storage and shelf life for each formulation.
                We’ll share verified information before orders open.
              </p>
              <SiteLink href="/faq" className="text-link">
                Browse the FAQ <Arrow />
              </SiteLink>
            </section>
          </div>
        </Page>
      );
    case "drops":
      return (
        <Page
          label="Upcoming Drops"
          heading={
            <>
              Good things come
              <br />
              to those who <em>don’t wait.</em>
            </>
          }
          copy={
            hasLocalServices
              ? "You can leave the group chat on read. We’ll send the batch news."
              : "The first batch is in the works. This is where the drop dates will land."
          }
          theme="lilac"
        >
          <div className="drop-page-scene">
            <figure className="torn-photo">
              <img
                src={art("drop-1120")}
                alt="Illustrative wrappers for Brownie Boo’s first lineup"
                width="1120"
                height="747"
              />
            </figure>
            <div>
              <h2>The first batch.</h2>
              <p>
                Meet the three formulations ahead of our first scheduled batch.
                Release dates, available packs, prices and dispatch estimates
                will be shared once confirmed.
              </p>
              {hasLocalServices ? (
                <>
                  <p>
                    Leave your email to register interest in the first batch.
                  </p>
                  <Waitlist topic="reservation interest: drop-001" />
                </>
              ) : (
                <SiteLink href="/shop" className="text-link">
                  Meet the Boos <Arrow />
                </SiteLink>
              )}
            </div>
          </div>
        </Page>
      );
    case "early-access":
      return (
        <Page
          label="The Boo Club"
          heading={
            <>
              Get first bite
              <br />
              <em>privileges.</em>
            </>
          }
          copy="One group chat you’ll actually want updates from."
          theme="rose"
        >
          <div className="join-page">
            <div>
              {hasLocalServices ? (
                <>
                  <Waitlist />
                  <p className="form-fine">
                    Preview sign-ups are stored locally.
                  </p>
                </>
              ) : (
                <>
                  <p>Sign-ups open closer to the first drop.</p>
                  <SiteLink href="/drops" className="text-link">
                    See Upcoming Drops <Arrow />
                  </SiteLink>
                </>
              )}
            </div>
            <Boo wink />
          </div>
          <section className="club-community">
            <h2>
              Show us your <em>Boo.</em>
            </h2>
            <p>
              Got a brownie ritual or a flavour you want us to make? Boo wants
              to hear it.
            </p>
            <SiteLink href="/contact" className="text-link">
              Tell Boo <Arrow />
            </SiteLink>
          </section>
        </Page>
      );
    case "faq":
      return (
        <Page
          label="FAQ"
          heading={
            <>
              Nosy? <em>We like it.</em>
            </>
          }
          theme="paper"
        >
          <div className="faq-list">
            {questions.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <SketchCount plus />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
            <SiteLink className="text-link" href="/contact">
              Ask something else <Arrow />
            </SiteLink>
          </div>
        </Page>
      );
    case "contact":
      return (
        <Page
          label="Contact"
          heading={
            <>
              Hey, <em>Brownie Boo.</em>
            </>
          }
          copy={
            hasLocalServices
              ? "Questions, ideas, and unusually strong opinions about chocolate are welcome. Your note is saved in this local preview."
              : "The contact form opens with the shop. We’re looking forward to your unusually strong opinions about chocolate."
          }
          theme="rose"
        >
          {hasLocalServices && <Contact />}
        </Page>
      );
    case "account":
      return (
        <Page
          label="Account"
          heading={
            <>
              Hello, <em>Boo.</em>
            </>
          }
          copy={
            hasLocalServices
              ? "Use a local account to try out signing in."
              : "Customer accounts open with the shop."
          }
          theme="lilac"
        >
          {hasLocalServices && <Account />}
        </Page>
      );
    case "track":
      return (
        <Page
          label="Order Tracking"
          heading={
            <>
              Where’s <em>my Boo?</em>
            </>
          }
          copy={
            hasLocalServices
              ? "Enter your order reference and the email used for that order."
              : "You’ll be able to track your order here once checkout opens."
          }
          theme="paper"
        >
          {hasLocalServices && <Track />}
        </Page>
      );
    case "privacy":
    case "terms":
    case "shipping":
      return <Legal kind={route} />;
  }
}
