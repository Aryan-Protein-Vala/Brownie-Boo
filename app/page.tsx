import { headers } from "next/headers";
import { Arrow, BiteEdge, Boo, Drips, Spark } from "../components/art";
import { Waitlist } from "../components/forms";
import { Family, Hero, Texture } from "../components/home-motion";
import { HomeFilm } from "../components/home-film";
import { BrownieRun } from "../components/brownie-run";
import { SiteLink } from "../components/shell";
import { art, packs, variants } from "../lib/catalogue";
import { hasLocalServices } from "../lib/preview-mode";
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
      <Hero initial={variant} preview={Boolean(forced) || !hasLocalServices} />
      <Family />
      <div className="film-bite">
        <div className="film-bite-stage">
          <Texture />
          <section className="sizes">
            <Drips />
            <BiteEdge />
            <div className="sizes-title">
              <p className="tag">The pack sizes</p>
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
                Weights refer to the finished brownie.
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
                <span data-enter="down">Commitment issues?</span>
              </span>
              <span className="film-line">
                <em data-enter="up">Get them all.</em>
              </span>
            </h2>
            <p>
              Finally, something worth committing to. Pick three chocolate
              brownies or mix your own box.
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
                <span data-enter="down">Taking life</span>
              </span>
              <span className="film-line">
                <span data-enter="up">unseriously.</span>
              </span>
              <span className="film-line">
                <em data-enter="down">Chocolate? Very seriously.</em>
              </span>
            </h2>
            <div className="story-bottom">
              <p>
                There’s enough to overthink already. We made a chocolate brownie
                with protein that fits between whatever life has put on your
                calendar.
              </p>
              <SiteLink className="text-link" href="/our-story">
                How it started <Arrow />
              </SiteLink>
              <SiteLink className="text-link" href="/ingredients">
                What’s inside <Arrow />
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
                  <span data-enter="down">Good things come</span>
                </span>
                <span className="film-line">
                  <span data-enter="up">
                    to those who <em>don’t wait.</em>
                  </span>
                </span>
              </h2>
              <p>
                You can leave the group chat on read. We’ll tell you when a
                batch has a date.
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
          <p>One group chat you’ll actually want updates from.</p>
          {hasLocalServices ? (
            <Waitlist variant={forced ? undefined : variant.id} compact />
          ) : (
            <SiteLink href="/drops" className="action action-ink">
              See Upcoming Drops
            </SiteLink>
          )}
        </div>
        <figure className="club-boo">
          <Boo wink />
          <figcaption>I’m small. My personality isn’t.</figcaption>
        </figure>
      </section>
      <BrownieRun />
    </HomeFilm>
  );
}
