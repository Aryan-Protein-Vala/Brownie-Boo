"use client";

import { type ReactNode, useRef, useState } from "react";
import { Arrow, Wordmark } from "../../components/art";
import styles from "./logos.module.css";
import studio from "./studio.module.css";
import { StudioMark, studioDirections, type StudioDirection } from "./studio-marks";

type LogoId = "crumb" | "dessert" | "split" | "double" | "after" | "face";
type Direction = { id: LogoId; name: string; note: string };
type Candidate = Direction | StudioDirection;

const originalLettering: Direction[] = [
  { id: "crumb", name: "Crumb Stamp", note: "A bitten brownie stamp with the original boo! inside." },
  { id: "dessert", name: "Dessert Club", note: "A swoop of bakery-script brownie over the familiar boo!" },
  { id: "split", name: "Split Wrapper", note: "A wrapper with a torn seam and a skinny side label." },
];

const newLettering: Direction[] = [
  { id: "double", name: "Double Bite", note: "Two bites turn a brownie into a B. The full name sits alongside in block type." },
  { id: "after", name: "After Hours", note: "A loose, all-italic signature. Think late-night dessert menu." },
  { id: "face", name: "Snack Face", note: "A wink in a cracked brownie, with chunky new lettering underneath." },
];

const groups = [
  { title: "Keep the original boo!", directions: originalLettering },
  { title: "Start with fresh lettering", directions: newLettering },
];
const recommendation = studioDirections[0];

function Logo({ id }: { id: LogoId | "current" }) {
  if (id === "current") {
    return <div className={styles.currentMark} aria-hidden="true"><Wordmark displayType /></div>;
  }

  return (
    <svg className={styles.logo} viewBox="0 0 320 176" aria-hidden="true">
      {id === "crumb" && <>
        <path
          className={styles.solid}
          d="M71 29Q75 24 84 25L222 22C222 32 231 38 240 35C241 44 250 50 260 48L262 126Q262 144 245 148L79 151Q61 150 60 134L58 47Q58 34 71 29Z"
        />
        <path className={styles.cut} strokeWidth="1.5" d="M74 49Q74 40 84 39L209 37M249 62L250 123Q250 135 238 135L83 138Q73 138 73 129L72 117" />
        <text className={styles.reversed} x="159" y="65" textAnchor="middle" fontSize="15" fontWeight="700" letterSpacing="3.8">BROWNIE</text>
        <text className={`${styles.boo} ${styles.reversed}`} x="156" y="123" textAnchor="middle" fontSize="76">boo!</text>
        <path className={styles.stroke} strokeWidth="3" d="M267 25l8-5m-6 12 10 1" />
      </>}
      {id === "dessert" && <>
        <path className={styles.stroke} strokeWidth="1.8" d="M124 25C54 28 27 66 39 105C53 148 127 163 194 148C257 134 291 107 281 67C276 46 254 33 227 27" />
        <path className={styles.stroke} strokeWidth="1.4" d="M46 106C65 144 135 158 194 144M63 51C76 42 91 38 107 36M258 95l7-8m-4 15 10-4" />
        <text className={styles.script} x="154" y="65" textAnchor="middle" fontSize="57" transform="rotate(-9 154 65)">brownie</text>
        <text className={styles.boo} x="157" y="127" textAnchor="middle" fontSize="89" transform="rotate(-9 157 127)">boo!</text>
      </>}
      {id === "split" && <>
        <g transform="rotate(-6 160 88)">
          <path
            className={styles.stroke}
            strokeWidth="3.8"
            d="M44 38C92 39 116 35 153 36L273 36L266 49L274 61L267 74L274 85L267 98L274 111L268 123L274 137L45 140L50 126L43 114L50 101L43 89L49 77L42 65L49 53Z"
          />
          <path className={styles.solid} d="M52 47L96 46L98 130L53 131L58 124L51 113L58 101L51 89L57 78L50 65L56 53Z" />
          <path className={styles.stroke} strokeWidth="2.5" d="M104 47L106 129M254 47v82" />
          <text className={styles.reversed} fontSize="14" fontWeight="800" letterSpacing="2.1" textAnchor="middle" transform="translate(79 89) rotate(-90)">BROWNIE</text>
          <text className={styles.boo} x="178" y="116" textAnchor="middle" fontSize="82">boo!</text>
        </g>
      </>}
      {id === "double" && <>
        <path className={styles.solid} d="M25 34L71 33Q105 32 115 55C103 53 96 61 98 71C86 70 80 80 86 88C91 94 97 95 106 93C104 104 112 111 120 109Q116 139 81 143L24 143Q20 143 21 138L21 39Q21 34 25 34ZM47 55L47 78L61 78C78 78 82 56 62 55ZM47 98L47 121L65 121C83 121 84 98 65 98Z" />
        <path className={styles.stroke} strokeWidth="3.4" d="M107 76l5-3m5 8 6-1" />
        <text x="136" y="77" fontSize="32" fontWeight="800" letterSpacing="-1.4">BROWNIE</text>
        <text x="134" y="127" fontSize="55" fontWeight="800" letterSpacing="-1.7">BOO!</text>
      </>}
      {id === "after" && <>
        <g transform="rotate(-11 160 88)">
          <text className={styles.script} x="130" y="75" textAnchor="middle" fontSize="64">Brownie</text>
          <text className={styles.script} x="204" y="134" textAnchor="middle" fontSize="93">Boo!</text>
          <path className={styles.stroke} strokeWidth="2" d="M53 102C95 101 102 112 83 126C71 135 74 147 103 147C146 147 224 148 260 138" />
          <path className={styles.stroke} strokeWidth="1.5" d="M255 45l5-9m2 13 10-6" />
        </g>
      </>}
      {id === "face" && <>
        <path className={styles.solid} d="M116 32Q120 20 137 20L188 17Q203 17 211 28L224 68Q226 80 212 86Q164 101 117 90Q103 87 105 73Z" />
        <path className={styles.cut} strokeWidth="3" d="M111 54Q160 65 218 47M129 34l10 5 14-8 11 4 12-5m-21 47q9 9 19-1m13-5q5-7 11-2" />
        <ellipse className={styles.reversed} cx="140" cy="72" rx="3.5" ry="5.5" />
        <path className={styles.stroke} strokeWidth="4" d="M102 37l-9-6m130-6 7-9m-1 17 11-4" />
        <text x="160" y="140" textAnchor="middle" fontSize="41" fontWeight="800" letterSpacing="-1.1">BROWNIE BOO!</text>
      </>}
    </svg>
  );
}

function Proof({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.proof}>
      <p className={styles.proofLabel}>{label}</p>
      <div className={styles.proofBoard} data-tone="plum">
        {children}
      </div>
      <div className={styles.proofStrip} data-tone="pink">
        <span className={styles.stripCaption}>Small-size check</span>
        {children}
      </div>
    </div>
  );
}

export function LogoProofs() {
  const [featured, setFeatured] = useState<StudioDirection>(recommendation);
  const [selected, setSelected] = useState<Candidate>(recommendation);
  const [take, setTake] = useState(0);
  const comparison = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  function stageDirection(direction: StudioDirection) {
    setFeatured(direction);
    setTake((current) => current + 1);
    const screen = stage.current;
    if (!screen) return;

    const { top, bottom } = screen.getBoundingClientRect();
    const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
    if (top < headerBottom || bottom > window.innerHeight) {
      screen.focus({ preventScroll: true });
      screen.scrollIntoView({ block: "start" });
    }
  }

  function compare(direction: Candidate) {
    setSelected(direction);
    const section = comparison.current;
    if (section) {
      section.focus({ preventScroll: true });
      section.scrollIntoView();
    }
  }

  return (
    <>
      <section className={studio.studio} id="studio" aria-labelledby="studio-title">
        <div className={studio.screen} ref={stage} tabIndex={-1} role="img" aria-label={`${featured.name} logo preview`} data-mark={featured.id} data-playing={featured.motion && take > 0 ? "" : undefined}>
          <StudioMark id={featured.id} key={featured.id + take} />
        </div>
        <div className={studio.caption}>
          <div>
            <h2 id="studio-title">{featured.name}</h2>
            {featured.id === recommendation.id && <span className={studio.recommended}>My pick</span>}
          </div>
          <p>{featured.note}</p>
          <div className={studio.controls}>
            {featured.motion && (
              <button className={`${studio.control} ${studio.playControl}`} type="button" onClick={() => setTake((current) => current + 1)}>
                Play logo motion
                <svg viewBox="0 0 20 20" aria-hidden="true" fill="none">
                  <path d="M7 4.5Q11.4 6.8 15.2 10Q11.4 13 6.8 15.5Q7.1 10.2 7 4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </button>
            )}
            <button className={studio.control} type="button" onClick={() => compare(featured)}>Compare with current <Arrow /></button>
          </div>
        </div>
        <div className={studio.index} aria-label="New logo directions" role="group">
          {studioDirections.map((direction) => (
            <button
              className={studio.thumbButton}
              key={direction.id}
              type="button"
              aria-pressed={featured.id === direction.id}
              onClick={() => stageDirection(direction)}
            >
              <span className={studio.thumbnail} data-mark={direction.id}><StudioMark id={direction.id} /></span>
              <span className={studio.thumbName}>
                {direction.name}
                {direction.motion && <span className={studio.thumbHint}>Motion</span>}
              </span>
            </button>
          ))}
        </div>
      </section>
      <section className={styles.comparison} id="comparison" aria-labelledby="comparison-title" tabIndex={-1} ref={comparison}>
        <div className={styles.sectionHeader}>
          <h2 id="comparison-title">Side by side</h2>
          <div className={styles.proofLinks}>
            <a href="#studio" data-arrow="up">New studies <Arrow /></a>
            <a href="#directions" data-arrow="down">First round <Arrow /></a>
          </div>
        </div>
        <div className={styles.proofs}>
          <Proof label="Current header logo"><Logo id="current" /></Proof>
          <Proof label={selected.name}>
            {"motion" in selected ? <StudioMark id={selected.id} /> : <Logo id={selected.id} />}
          </Proof>
        </div>
        <p className={styles.selection} role="status">
          <strong>{selected.id === recommendation.id ? "My pick · " : ""}{selected.name}.</strong>{" "}
          {selected.id === recommendation.id
            ? "The joined o’s give it a silhouette you could spot across a shelf. It still reads at seal size, and the motion comes from the way the letters fit together."
            : selected.note}
        </p>
      </section>
      <section className={styles.directions} id="directions" aria-labelledby="directions-title">
        <div className={styles.sectionHeader}>
          <h2 id="directions-title">The first round</h2>
          <a href="#comparison" data-arrow="up">Back to comparison <Arrow /></a>
        </div>
        <div role="group" aria-labelledby="directions-title">
          {groups.map(({ title, directions }) => (
            <div className={styles.group} key={title}>
              <h3>{title}</h3>
              <ul className={styles.options}>
                {directions.map((direction) => (
                  <li key={direction.id}>
                    <button className={styles.option} type="button" aria-pressed={selected.id === direction.id} onClick={() => compare(direction)}>
                      <span className={styles.optionArt} data-tone="pink"><Logo id={direction.id} /></span>
                      <span className={styles.optionDetails}>
                        <span className={styles.optionName}>{direction.name}</span>
                        <span className={styles.optionNote}>{direction.note}</span>
                      </span>
                      <span className={styles.optionAction}>{direction.id === selected.id ? "Comparing" : "Compare"}{direction.id === selected.id ? <span aria-hidden="true">✓</span> : <Arrow />}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <a className={styles.returnLink} href="#comparison">Back to comparison <Arrow /></a>
      </section>
    </>
  );
}
