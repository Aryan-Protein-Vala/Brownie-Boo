import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Arrow, Boo, Drips, SketchCount } from "../../components/art";
import { Account, Contact, Track, Waitlist } from "../../components/forms";
import { SiteLink } from "../../components/shell";
import { art, products, questions } from "../../lib/catalogue";
import { hasLocalServices } from "../../lib/preview-mode";
import { formSubmitEndpoint, hasCustomerForms } from "../../lib/formsubmit";

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
  const docs: Record<typeof kind, [string, ReactNode][]> = {
    privacy: [
      [
        "What goes in the cookie jar",
        hasLocalServices
          ? "Your bag stays in this browser. Local preview accounts and campaign assignments are stored on the machine running Site B."
          : "Your bag stays in this browser. A cookie keeps track of which homepage headlines you’ve seen so we can serve you a different one next time.",
      ],
      [
        "When you write to Boo",
        formSubmitEndpoint ? (
          <>
            We use the email address you submit for the updates you request or
            to reply to your message. FormSubmit processes your submission and
            delivers it to our inbox.{" "}
            <a href="https://formsubmit.co/privacy.pdf">
              FormSubmit’s privacy policy
            </a>
          </>
        ) : hasLocalServices ? (
          "Waitlist sign-ups and contact messages are stored on the machine running Site B."
        ) : (
          "Sign-ups and contact messages open closer to the first drop."
        ),
      ],
      [
        "Your call",
        hasCustomerForms
          ? "You can clear browser storage to reset your bag. Use the contact form to ask about your submission or to stop receiving updates."
          : "You can clear browser storage to reset your bag.",
      ],
    ],
    terms: [
      [
        "A peek inside the wrapper",
        "Formulations and packaging are in development. Product visuals are illustrative concepts.",
      ],
      [
        "Bags, sign-ups and zero commitment",
        hasCustomerForms
          ? "Adding brownies to your bag saves your picks on this device. Boo Club sign-ups and drop and restock interest are free and carry no obligation to buy."
          : "Adding brownies to your bag saves your picks on this device. It carries no obligation to buy.",
      ],
      [
        "Before we take orders",
        "Verified product information, prices and commercial terms will be available before orders open.",
      ],
    ],
    shipping: [
      [
        "How the brownies get moving",
        "Brownie Boo plans to make brownies in scheduled batches. Confirmed release dates, expected dispatch and available destinations will appear with each drop.",
      ],
      [
        "Shipping and refunds",
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
          Ask Boo <Arrow />
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
              It started with a brownie.
              <br />
              <em>Obviously.</em>
            </h2>
            <div>
              <p>
                People will put “quick” in a meeting invite and then steal an
                hour of your life. Somehow the snack is the thing that comes
                with homework. We had notes.
              </p>
              <p>
                So we made three fudgy chocolate brownies with different protein
                blends. Park one in your desk drawer. Eat one over the sink.
                Tell your group chat you made them if you must.
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
              Boo’s <em>ingredient receipts.</em>
            </>
          }
          copy="Since everyone’s a detective now, here are the protein sources and known allergens for each Boo."
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
              <h2>The actual numbers</h2>
              <p>
                We’re confirming exact values, final ingredient lists,
                cross-contact, storage and shelf life for each formulation. A
                sugar-free recipe is in development. We’ll share verified
                nutrition and ingredients before orders open.
              </p>
              <SiteLink href="/faq" className="text-link">
                Read the FAQ <Arrow />
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
              At least this drop
              <br />
              <em>will text back.</em>
            </>
          }
          copy={
            hasCustomerForms
              ? "When the brownies have a date, we’ll put it here. You can stop reading into our stories."
              : "First batch in the works. This is where the confirmed date will land."
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
              <h2>
                Drop 001. <em>It’s complicated.</em>
              </h2>
              <p>
                Three Boos are lined up for our first batch. The date, pack
                availability, prices and dispatch estimates go here once they’re
                confirmed.
              </p>
              {hasCustomerForms ? (
                <>
                  <p>
                    Leave an email for first-batch updates. We promise to use
                    our words.
                  </p>
                  <Waitlist
                    endpoint={formSubmitEndpoint}
                    topic="reservation interest: drop-001"
                  />
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
          copy="A little brownie gossip for your inbox. No one here is asking “wyd” at 1 a.m."
          theme="rose"
        >
          <div className="join-page">
            <div>
              {hasCustomerForms ? (
                <Waitlist endpoint={formSubmitEndpoint} />
              ) : (
                <>
                  <p>
                    The list opens closer to the first drop. Even gossip needs a
                    release date.
                  </p>
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
              Spill <em>the cocoa.</em>
            </h2>
            <p>
              A flavour you’d defend in court? A deeply suspicious way you eat
              brownies? We’d like to hear both.
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
              Since you’re <em>asking.</em>
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
              Ask Boo directly <Arrow />
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
              Dear Boo, <em>hear me out.</em>
            </>
          }
          copy={
            hasCustomerForms
              ? "Questions, flavour pitches, or a strong opinion about corner pieces? Put it in writing."
              : "The contact form opens with the shop. Save your corner-piece thesis for us."
          }
          theme="rose"
        >
          {hasCustomerForms && <Contact endpoint={formSubmitEndpoint} />}
        </Page>
      );
    case "account":
      return (
        <Page
          label="Account"
          heading={
            <>
              Back for <em>another bite?</em>
            </>
          }
          copy={
            hasLocalServices
              ? "Try signing in with a local preview account. The brownies aren’t judging your password."
              : "Accounts open with the shop. Until then, no password to forget."
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
              Boo, <em>where are you?</em>
            </>
          }
          copy={
            hasLocalServices
              ? "Enter your order reference and the email you used. We’ll do the detective work."
              : "You’ll be able to follow your order here once checkout opens. No need to turn on read receipts."
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
