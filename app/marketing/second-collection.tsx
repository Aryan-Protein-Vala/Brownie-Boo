import { Boo, Spark, Wordmark } from "../../components/art";
import { slideUrl } from "./campaigns";
import { Carousel, DownloadMark } from "./carousel";
import s from "./second-collection.module.css";

export const secondPack = "/marketing/boo-second-collection.zip";
type Layout = "film" | "game" | "news" | "comic";

export const secondCollection: {
  slug: string;
  layout: Layout;
  name: string;
  type: string;
  concept: string;
  caption: string;
  frames: { heading: string; line: string; alt: string }[];
}[] = [
  {
    slug: "last-corner",
    layout: "film",
    name: "The Last Corner",
    type: "Roommate thriller",
    concept: "The mystery of missing food in a shared fridge becomes a whodunit about the one brownie corner everybody wanted.",
    caption: "A full interrogation over one square of chocolate. The suspect says it was a clean cut. We have crumbs. Follow @browniebooclub for the first drop.",
    frames: [
      { heading: "The Last Corner", line: "One fridge. Three flatmates. No witnesses.", alt: "A dark film poster for The Last Corner, illustrated with a rich brownie broken in half. One fridge. Three flatmates. No witnesses." },
      { heading: "The evidence", line: "One empty tin. Two suspiciously clean spoons.", alt: "A fictional thriller poster shows traces of chocolate with the evidence, one empty tin and two suspiciously clean spoons." },
      { heading: "The culprit?", line: "I did it. I’d do it again.", alt: "A final brownie thriller poster shows Boo confessing to taking the corner. I did it. I’d do it again." },
    ],
  },
  {
    slug: "bangalore-five-minutes",
    layout: "game",
    name: "Bengaluru Speedrun",
    type: "Arcade select screen",
    concept: "The group-chat ETA stretches in traffic. The brownie is the one part of the trip you can finish on your own schedule.",
    caption: "The map says five minutes. It has been five minutes for an entire podcast episode. At least the brownie has a finish line. Follow @browniebooclub for the first drop.",
    frames: [
      { heading: "Bengaluru Speedrun", line: "ETA · 5 min. Still 5 min.", alt: "A plum-and-pink arcade game menu for Bengaluru traffic. The car's ETA stays five minutes while brownie mode is ready." },
    ],
  },
  {
    slug: "otp-afterparty",
    layout: "news",
    name: "The OTP Afterparty",
    type: "Satirical front page",
    concept: "A verification code arrives after its session expires. A mock breaking story gives the time spent waiting to a brownie instead.",
    caption: "Your code is valid for 30 seconds. It spent all 30 on the way here. Brownie Boo would like to thank the loading screen for the snack break.",
    frames: [
      { heading: "OTP arrives after session expires", line: "Local snacker finishes brownie while portal says to please wait.", alt: "A pink satirical newspaper with the headline OTP arrives after session expires. Below, Boo finishes a brownie while the portal says to please wait." },
    ],
  },
  {
    slug: "parcel-at-gate",
    layout: "comic",
    name: "The parcel at the gate",
    type: "Three-panel comic",
    concept: "The endless approval messages from a housing society end when the resident identifies the delivery as a box of brownies.",
    caption: "Three approvals, one intercom call, and a surprisingly urgent lift ride. Some parcels simply deserve a personal escort. First-batch updates in bio.",
    frames: [
      { heading: "Parcel at the gate.", line: "Can you approve it in the app?", alt: "Comic panel one. Boo is interrupted by a housing society gate message asking for approval of a parcel." },
      { heading: "What’s in the box?", line: "It says Brownie Boo on the label.", alt: "Comic panel two. The gate attendant reports that the box says Brownie Boo." },
      { heading: "I’ll come down.", line: "Tell the lift this is personal.", alt: "Comic panel three. Boo rushes downstairs to personally collect the brownie parcel." },
    ],
  },
];

type Campaign = (typeof secondCollection)[number];

function Art({ campaign, index }: { campaign: Campaign; index: number }) {
  const { layout, frames, slug } = campaign;
  const { heading, line, alt } = frames[index];
  return (
    <div className={s.art} data-second-export={slideUrl(slug, index)} role="img" aria-label={alt}>
      <div className={s[layout]} data-frame={index + 1} aria-hidden="true">
        {layout === "film" && (
          <>
            <img src={index === 1 ? "/art/double-cut-640.webp" : "/art/the-break.webp"} alt="" loading="lazy" />
            <small>Boo Pictures presents</small>
            {index === 2 && <Boo className={s.filmSuspect} expression="smirk" />}
            <div className={s.filmTitle}><strong>{heading}</strong><p>{line}</p></div>
            <div className={s.filmCredit}><Wordmark /><span>A Brownie Boo! production</span><b>ACT {index + 1} / 3</b></div>
          </>
        )}
        {layout === "game" && (
          <>
            <div className={s.gameTop}><span>⏵ CITY MODE</span><span>1 PLAYER</span></div>
            <strong>{heading}</strong>
            <div className={s.gameRoad}><div /><div /><div /><Boo expression="cheeky" /></div>
            <div className={s.gameMenu}><span>00 / Car</span><del>{line}</del><span>01 / Brownie break</span><b>► READY</b></div>
            <div className={s.gameBottom}>BROWNIE BOO!<span>@BROWNIEBOOCLUB</span></div>
          </>
        )}
        {layout === "news" && (
          <>
            <div className={s.paperName}><em>The Daily Crumb</em><span>FICTIONAL EDITION</span></div>
            <strong>{heading}</strong>
            <div className={s.newsStory}>
              <div><p>{line}</p><span>“Please try again later,” said the portal, again.</span><Wordmark /></div>
              <Boo expression="sleepy" />
            </div>
            <footer>TECH DESK <span>@browniebooclub</span></footer>
          </>
        )}
        {layout === "comic" && (
          <>
            <div className={s.comicTop}><span>THE SOCIETY GATE</span><span>{index + 1} / 3</span></div>
            <div className={s.panel}>
              <div className={s.speech}><strong>{heading}</strong><p>{line}</p></div>
              {index === 1 ? <img src="/art/drop-1120.webp" alt="" loading="lazy" /> : <Boo expression={index === 0 ? "suspicious" : "gasp"} />}
              <Spark />
            </div>
            <div className={s.comicBottom}><Wordmark /><span>@browniebooclub</span></div>
          </>
        )}
      </div>
    </div>
  );
}

export function SecondCollection() {
  return (
    <section className={s.collection} id="more-posts" tabIndex={-1} aria-labelledby="more-posts-title">
      <header className={s.heading}>
        <div><p className="tag">More Apple-to-Orange</p><h2 id="more-posts-title">Boo made <em>a scene.</em></h2></div>
        <a className={s.download} href={secondPack} download><DownloadMark /> Download the new posts</a>
      </header>
      <div className={s.showcase}>
        {secondCollection.map((campaign) => {
          const { slug, name, type, caption, concept, frames, layout } = campaign;
          return (
            <article className={s.campaign} data-layout={layout} key={slug} id={slug} aria-labelledby={`${slug}-title`}>
              <div className={s.cardCopy}>
                <p className="tag">{type}</p>
                <h3 id={`${slug}-title`}>{name}</h3>
                <p>{concept}</p>
                <details>
                  <summary>Caption{frames.length > 1 && " & slide files"}</summary>
                  <p>{caption}</p>
                  {frames.length > 1 && <ul>{frames.map((frame, index) => (
                    <li key={frame.heading}><a href={slideUrl(slug, index)} download>Slide {index + 1}</a></li>
                  ))}</ul>}
                </details>
              </div>
              <Carousel slug={slug} name={name} count={frames.length}>
                {frames.map((frame, index) => <li key={frame.heading}><Art campaign={campaign} index={index} /></li>)}
              </Carousel>
            </article>
          );
        })}
      </div>
    </section>
  );
}
