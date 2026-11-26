import { headers } from "next/headers";
import { Arrow, BiteEdge, Drips, DropMeltMask, Spark } from "../components/art";
import { ExpressiveBoo } from "../components/expressive-boo";
import { Waitlist } from "../components/forms";
import { Family, Hero, Texture } from "../components/home-motion";
import { HomeFilm } from "../components/home-film";
import { BrownieRun } from "../components/brownie-run";
import { SiteLink } from "../components/shell";
import { art, packs, variants } from "../lib/catalogue";
import { hasLocalServices } from "../lib/preview-mode";
import { formSubmitEndpoint, hasCustomerForms } from "../lib/formsubmit";
import "./home-film.css";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ hero?: string }>;
}) {
  const query = await searchParams;
  const requestHeaders = await headers();
  const forced = variants.find(
    ({ id }) =>
      id === (typeof query.hero === "string" ? query.hero.toUpperCase() : ""),
  );
  const variant =
    forced ??
    variants.find(({ id }) => id === requestHeaders.get("x-boo-hero")) ??
    variants[4];

  return (
    <HomeFilm>
      <Hero
        key={variant.id}
        initial={variant}
        preview={Boolean(forced) || !hasLocalServices}
      />
      <Family />
      <div className="film-bite">
        <div className="film-bite-stage">
          <Texture />
          <section className="sizes">
            <Drips />
            <BiteEdge />
            <div className="sizes-title">
              <p className="tag">Pick your portion</p>
              <h2>
                <span className="film-line">
                  <span data-enter="up">Sometimes</span>
                </span>
                <span className="film-line">
                  <em data-enter="down">size does matter.</em>
                </span>
              </h2>
            </div>
            <div className="size-options">
              {packs.map(({ grams, name, note }, index) => (
                <SiteLink
                  className="size-row"
                  href={`/shop?size=${grams}`}
                  key={grams}
                >
                  <span
                    aria-hidden="true"
                    className={`size-cookie size-cookie-${index}`}
                  ></span>
                  <span className="size-name">
                    {name}
                    <small>{note}</small>
                  </span>
                  <strong>{grams} g</strong>
                  <Arrow />
                </SiteLink>
              ))}
              <p className="form-fine">
                Grams are brownie weight. The emotional baggage is extra.
              </p>
            </div>
          </section>
        </div>
      </div>
      <div className="film-box">
        <section className="box-feature">
          <Drips className="section-drip box-edge" />
          <div className="box-words">
            <h2>
              <span className="film-line">
                <span data-enter="down">Seeing other Boos?</span>
              </span>
              <span className="film-line">
                <em data-enter="up">Make it a trio.</em>
              </span>
            </h2>
            <p>
              Pick three brownies for your Boo Box. Finally, a seating chart
              where nobody’s weird uncle has to go next to you.
            </p>
            <SiteLink className="action action-ink" href="/build-a-box">
              Build Your Boo Box
            </SiteLink>
          </div>
          <figure className="box-visual">
            <img
              src={art("drop-1120")}
              alt="Concept wrappers in pink, purple and dark chocolate arranged together"
              width="1120"
              height="747"
              loading="lazy"
            />
            <span
              className="wrapper-fold wrapper-fold-top"
              aria-hidden="true"
            />
            <span
              className="wrapper-fold wrapper-fold-bottom"
              aria-hidden="true"
            />
            <Spark />
          </figure>
        </section>
      </div>
      <div className="film-finale">
        <DropMeltMask />
        <div className="film-finale-stage">
          <section className="story-feature">
            <Drips className="section-drip story-edge" />
            <figure className="story-print">
              <img
                src={art("ritual-960")}
                alt="Hands breaking a chocolate brownie"
                width="960"
                height="640"
                loading="lazy"
              />
            </figure>
            <p className="tag">Our Story</p>
            <h2>
              <span className="film-line">
                <span data-enter="down">We take life</span>
              </span>
              <span className="film-line">
                <span data-enter="up">with a pinch of salt.</span>
              </span>
              <span className="film-line">
                <em data-enter="down">And a lot of chocolate.</em>
              </span>
            </h2>
            <div className="story-bottom">
              <p>
                The world already has enough people turning snacks into
                homework. We made three fudgy brownies with three protein
                blends. There’ll be no quiz.
              </p>
              <SiteLink className="text-link" href="/our-story">
                Read our story <Arrow />
              </SiteLink>
              <SiteLink className="text-link" href="/ingredients">
                Read the ingredients <Arrow />
              </SiteLink>
            </div>
          </section>
          <section className="drop-feature">
            <Drips className="section-drip drop-edge" />
            <figure>
              <img
                src={art("melt-1280")}
                alt="Glossy ribbons of melted chocolate"
                width="1280"
                height="854"
                loading="lazy"
              />
            </figure>
            <div className="drop-content">
              <p className="tag">The First Drop</p>
              <h2>
                <span className="film-line">
                  <span data-enter="down">The first drop</span>
                </span>
                <span className="film-line">
                  <span data-enter="up">
                    <em>will text back.</em>
                  </span>
                </span>
              </h2>
              <p>
                When the first brownie batch has a confirmed date, you’ll hear
                from us. No need to decode a story like.
              </p>
              <SiteLink href="/drops" className="action action-pink">
                Catch the Drop
              </SiteLink>
            </div>
          </section>
        </div>
      </div>
      <section className="club" id="boo-club">
        <Drips className="section-drip club-edge" />
        <div className="club-copy">
          <p className="tag">The Boo Club</p>
          <h2>
            <span className="film-line">
              <span data-enter="up">Get first bite</span>
            </span>
            <span className="film-line">
              <em data-enter="down">privileges.</em>
            </span>
          </h2>
          <p>
            Give us your email and we’ll give you the brownie gossip. Nobody’s
            adding you to a group chat.
          </p>
          {hasCustomerForms ? (
            <Waitlist
              endpoint={formSubmitEndpoint}
              variant={forced ? undefined : variant.id}
              compact
            />
          ) : (
            <SiteLink href="/drops" className="action action-ink">
              See Upcoming Drops
            </SiteLink>
          )}
        </div>
        <figure className="club-boo">
          <ExpressiveBoo />
          <figcaption>I bring snacks. I am snacks.</figcaption>
        </figure>
      </section>
      <BrownieRun />
    </HomeFilm>
  );
}
