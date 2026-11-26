"use client";

import { type ReactNode, useRef, useState } from "react";
import { Arrow, Wordmark } from "../../components/art";
import styles from "./logos.module.css";

type LogoId = "stack" | "one-line" | "bakery" | "crumb" | "dessert" | "split" | "double" | "after" | "face" | "sunday-best";
type Direction = { id: LogoId; name: string; note: string };
const simpleWordmarks: Direction[] = [
  { id: "stack", name: "Straight Stack", note: "A clean two-line wordmark with the original boo! lettering." },
  { id: "one-line", name: "One Line", note: "Lowercase, compact, and easy to fit across a wrapper or header." },
  { id: "bakery", name: "Bakery Type", note: "A classic serif stack with a little extra weight on Boo!" },
];

const originalLettering: Direction[] = [
  { id: "crumb", name: "Crumb Stamp", note: "A bitten brownie stamp with the original boo! inside." },
  { id: "dessert", name: "Dessert Club", note: "A swoop of bakery-script brownie over the familiar boo!" },
  { id: "split", name: "Split Wrapper", note: "A wrapper with a torn seam and a skinny side label." },
];

const newLettering: Direction[] = [
  { id: "sunday-best", name: "Sunday Best", note: "A dressier dessert-counter mark with a sweeping B." },
  { id: "double", name: "Double Bite", note: "Two bites turn a brownie into a B. The full name sits alongside in block type." },
  { id: "after", name: "After Hours", note: "A loose, all-italic signature. Think late-night dessert menu." },
  { id: "face", name: "Snack Face", note: "A wink in a cracked brownie, with chunky new lettering underneath." },
];

const groups = [
  { title: "New wordmarks", directions: simpleWordmarks },
  { title: "Keep the original boo!", directions: originalLettering },
  { title: "Start with fresh lettering", directions: newLettering },
];
const recommendation = simpleWordmarks[0];

function Logo({ id }: { id: LogoId | "current" }) {
  if (id === "current") {
    return <div className={styles.currentMark} aria-hidden="true"><Wordmark displayType /></div>;
  }

  return (
    <svg className={styles.logo} viewBox="0 0 320 176" aria-hidden="true">
      {id === "stack" && <>
        <text x="69" y="56" fontSize="38" fontWeight="700" letterSpacing="-1.4">brownie</text>
        <text className={styles.boo} x="67" y="141" fontSize="103">boo!</text>
      </>}
      {id === "one-line" && (
        <text x="160" y="105" textAnchor="middle" fontSize="45" fontWeight="660" letterSpacing="-1.65">
          brownie <tspan fontWeight="800">boo!</tspan>
        </text>
      )}
      {id === "bakery" && (
        <g fontFamily="Georgia, serif" fontWeight="bold" textAnchor="middle">
          <text x="160" y="70" fontSize="46" letterSpacing="-1.75">Brownie</text>
          <text x="160" y="134" fontSize="77" letterSpacing="-3.3">Boo!</text>
        </g>
      )}
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
      {id === "sunday-best" && <>
        <text x="157" y="37" fontSize="15" textAnchor="middle" fontWeight="680" letterSpacing="4.7">BROWNIE</text>
        <path fillRule="evenodd" d="M81 59C64 57 52 63 48 74C46 79 47 83 45 84C42 85 41 80 43 75C49 62 61 55 80 54C101 51 126 50 131 65C135 78 122 88 106 92C127 92 134 101 130 114C126 131 105 141 84 143C61 145 48 139 49 128C50 120 58 114 66 115L65 117C60 118 57 122 57 127C56 134 65 137 75 135C84 119 93 81 96 62C92 60 86 59 81 59ZM111 62C109 73 106 83 104 90C114 88 118 80 119 73C120 67 117 63 111 62ZM103 94C98 114 91 130 84 136C99 134 112 125 115 112C118 101 113 95 103 94Z" />
        <path fillRule="evenodd" d="M166 88C185 87 192 101 187 116C182 132 169 142 153 142C137 142 129 131 133 117C138 99 151 90 166 88ZM166 91C158 92 151 102 147 116C144 126 144 139 152 139C160 139 168 127 172 114C175 103 175 90 166 91ZM221 88C240 87 247 101 242 116C237 132 223 142 208 142C192 142 183 131 188 117C192 100 205 90 221 88ZM221 91C213 92 205 102 202 116C199 126 199 139 207 139C215 139 223 127 227 114C230 103 230 90 221 91Z" />
        <path d="M181 101C191 105 200 99 204 94M67 142C94 156 149 153 175 147C203 140 220 142 231 148" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M261 68C263 57 268 53 275 54C281 54 282 59 280 66L260 119L257 118ZM258 125C264 125 267 130 265 135C263 140 256 143 252 140C247 137 247 133 250 129C252 127 255 125 258 125Z" />
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
  const [selected, setSelected] = useState(recommendation);
  const comparison = useRef<HTMLElement>(null);

  function compare(direction: Direction) {
    setSelected(direction);
    const section = comparison.current;
    if (section) {
      section.focus({ preventScroll: true });
      section.scrollIntoView();
    }
  }

  return (
    <>
      <section className={styles.comparison} id="comparison" aria-labelledby="comparison-title" tabIndex={-1} ref={comparison}>
        <div className={styles.sectionHeader}>
          <h2 id="comparison-title">Side by side</h2>
          <a href="#directions" data-arrow="down">See the options <Arrow /></a>
        </div>
        <div className={styles.proofs}>
          <Proof label="Current header logo"><Logo id="current" /></Proof>
          <Proof label={selected.name}><Logo id={selected.id} /></Proof>
        </div>
        <p className={styles.selection} role="status">
          <strong>{selected.id === recommendation.id ? "My pick · " : ""}{selected.name}.</strong>{" "}
          {selected.id === recommendation.id
            ? "It keeps the familiar boo! and gives both lines room to breathe. It reads clearly on a wrapper or in the header."
            : selected.note}
        </p>
      </section>
      <section className={styles.directions} id="directions" aria-labelledby="directions-title">
        <div className={styles.sectionHeader}>
          <h2 id="directions-title">Logo options</h2>
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
