import type { SVGProps } from "react";
import { wordmarkPaths } from "../lib/wordmark";
import { BooFace, type BooExpression } from "./boo-face";

export function Arrow() {
  return (
    <svg
      aria-hidden="true"
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        pathLength="1"
        d="M3.4 12.4C7.6 11.2 13 12.9 20 11.8m-7-6.1c2.3 2.6 4.4 4.5 7 6.1-2.2 1.6-4.8 4-6.8 6.6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Bag() {
  return (
    <svg
      aria-hidden="true"
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5.7 8.1 18.6 7.7 20.2 20.3Q12 21.5 3.9 20.1ZM8.8 9.8 8.6 6.5c0-4.2 6.1-4.5 6.4-.6l.2 3.6M7 13.2l-.4 3.4"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Spark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 70 70" fill="none" {...props}>
      <path
        d="M34 2C31 22 30 29 4 36c23 1 29 9 33 31 3-20 9-27 29-33-22-2-27-11-32-32Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Boo({
  wink = false,
  expression,
  pose,
  className,
}: {
  wink?: boolean;
  expression?: BooExpression;
  pose?: "runner";
  className?: string;
}) {
  const face = expression ?? (wink ? "wink" : "smile");
  return (
    <svg
      className={className}
      data-expression={expression}
      viewBox="0 0 280 242"
      role="img"
      aria-label={
        expression
          ? "Boo the brownie"
          : wink
            ? "Boo the brownie, winking"
            : "Boo the brownie, smiling"
      }
    >
      {pose === "runner" ? (
        <g fill="none" stroke="#310e25" strokeWidth="9" strokeLinecap="round">
          <path
            className="runner-leg runner-leg-back"
            d="M152 187q-5 18 9 25l15 1"
          />
          <path
            className="runner-arm runner-arm-back"
            d="m205 119 25 3 14-20"
          />
          <path
            className="runner-leg runner-leg-front"
            d="M92 188q19 15 6 29l-16 3"
          />
          <path
            className="runner-arm runner-arm-front"
            d="M44 127q-16 10-27-6"
          />
        </g>
      ) : (
        <path
          d="M48 141c-15 5-26-3-31-16m207 11c20 3 30-10 34-23M95 192c-4 16-18 24-27 21m95-16c2 16 12 25 26 23"
          fill="none"
          className="boo-limbs"
          stroke="var(--boo-limb, #310e25)"
          strokeWidth="8"
          strokeLinecap="round"
        />
      )}
      <path
        d="M65 45c-9 3-18 12-22 27L29 138c-5 26 5 43 30 50 49 13 95 16 148 3 15-4 22-15 21-31l-4-57c-1-18-7-32-26-41-30-17-91-26-133-17Z"
        fill="#4a1b28"
        stroke="#310e25"
        strokeWidth="5"
      />
      <path
        d="M62 48c-14 8-15 15-19 28-4 12 4 20 19 24 50 11 104 14 158 1-2-17-9-29-24-38C168 47 98 36 62 48Z"
        fill="#925341"
        stroke="#310e25"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="m69 68 17 3 8-8m24 21 11-8 24 4 14-6m17 13 8-2 8 4m-92-32 13 2"
        fill="none"
        stroke="#522430"
        strokeWidth="4"
        strokeLinecap="round"
        opacity=".8"
      />
      <path
        d="M56 166c19 8 42 9 56 8m-65-41 7 5m144 32 13-5"
        fill="none"
        stroke="#ad694e"
        strokeWidth="4"
        strokeLinecap="round"
        opacity=".8"
      />
      <BooFace key={face} expression={face} />
      <path
        d="m232 43 10-13m2 31 15-4M46 31l-8-9"
        fill="none"
        stroke="#9f365d"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({ displayType = false }: { displayType?: boolean }) {
  if (displayType) {
    return (
      <span className="wordmark wordmark--display" aria-hidden="true">
        <span className="transition-type wordmark-brownie">brownie</span>
        <span className="transition-type wordmark-boo">boo!</span>
        <svg viewBox="0 0 100 56" fill="none">
          <path
            d="M9 37l5-1.7M11 43l5-.4M96 8l3-3"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  }
  return (
    <svg className="wordmark" viewBox="0 0 210 112" aria-hidden="true">
      <path d={wordmarkPaths[0]} fill="var(--mark-brownie, #fff1f7)" />
      <path d={wordmarkPaths[1]} fill="var(--mark-boo, #f3aacb)" />
      <path
        d="M18 76l7-3m-3 16 8-1M188 18l6-7"
        fill="none"
        stroke="var(--mark-boo, #f3aacb)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MenuMark({ close = false }: { close?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    >
      {close ? (
        <path d="M5 5.5c4.1 3.9 8 8.7 13.8 13m.4-13.7C15 10.9 9.2 15.8 5 19" />
      ) : (
        <>
          <path d="M3.8 8.1c4.4-1.2 10.2-1.3 16.6-.4" />
          <path d="M4.8 15.2c4.5-.9 9.7-.3 14.1-.7" />
        </>
      )}
    </svg>
  );
}

export function ScrollStamp() {
  return (
    <svg
      aria-hidden="true"
      className="scroll-stamp"
      viewBox="0 0 56 64"
      fill="none"
    >
      <path
        className="scroll-stamp-ring"
        d="M40 7c-9-5-19-5-28 2C3 16 2 27 5 38c3 9 15 15 26 14 13-1 21-10 21-23 0-7-4-16-11-21"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        className="scroll-stamp-arrow"
        d="M27 15c-1 8 1 16 0 26m-8-9c2 4 5 6 8 9 3-4 6-6 10-10"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="scroll-stamp-spark"
        d="m39 13 3-5m0 8 6-3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const biteEdgeStart =
  "M0 102 C57 126 96 121 132 87 C170 43 203 51 245 77 C289 105 327 113 371 75 C409 42 445 49 487 73 C531 96 561 89 608 59 C653 32 687 47 732 64 C776 87 810 70 853 45 C908 12 954 34 1000 6 V144 H0 Z";
export function BiteEdge() {
  return (
    <svg
      className="bite-edge"
      viewBox="0 0 1000 144"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className="edge-ink"
        data-bite-edge
        d={biteEdgeStart}
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const dripCurve =
  "C1409 25 1388 17 1364 27C1343 36 1333 61 1313 55C1290 48 1304 29 1270 24C1236 19 1205 42 1181 33C1159 24 1147 21 1126 26C1088 35 1091 78 1069 82C1040 87 1051 39 1012 37C982 34 968 49 941 42C909 34 899 16 870 18C830 20 817 35 789 33C756 30 761 19 730 20C685 21 701 54 676 59C651 65 658 30 620 28C580 27 565 53 538 44C512 35 486 24 449 26C408 28 398 49 367 46C341 43 338 28 310 30C270 33 271 71 247 66C226 62 234 29 200 26C160 23 150 44 122 39C89 34 80 21 53 20C34 19 18 25 0 29";

export function Drips({ className = "drips" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 1440 84"
      preserveAspectRatio="none"
    >
      <path d={`M0 0H1440V28${dripCurve}Z`} fill="currentColor" />
      <path
        d={`M1440 28${dripCurve}`}
        fill="none"
        className="edge-ink"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SketchCount({ plus = false }: { plus?: boolean }) {
  return (
    <svg
      className="sketch-count"
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
    >
      <path d="M3 10.5c4.1-.7 8 .2 14-1" />
      {plus && <path d="M10.4 3.2c-.9 3.9.2 8.1-.6 13.5" />}
    </svg>
  );
}

export function FamilySeam({
  className = "family-panel-seam",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox="0 0 51 720"
      preserveAspectRatio="none"
    >
      <path
        d="M0 0H28C36 24 19 42 21 69C23 91 41 109 40 128C39 149 15 156 19 181C23 203 37 210 35 230C32 254 14 258 17 280C18 301 46 320 41 344C36 361 21 372 23 395C25 418 40 430 40 449C40 474 12 484 18 510C20 533 36 546 33 570C29 590 12 600 19 624C25 648 42 659 44 681C45 701 30 710 33 720H0Z"
        fill="currentColor"
      />
      <path
        d="M28 0C36 24 19 42 21 69C23 91 41 109 40 128C39 149 15 156 19 181C23 203 37 210 35 230C32 254 14 258 17 280C18 301 46 320 41 344C36 361 21 372 23 395C25 418 40 430 40 449C40 474 12 484 18 510C20 533 36 546 33 570C29 590 12 600 19 624C25 648 42 659 44 681C45 701 30 710 33 720"
        fill="none"
        className="edge-ink"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
