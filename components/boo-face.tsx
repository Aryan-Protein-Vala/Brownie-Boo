import type { ReactNode } from "react";

const leftEye = (
  <ellipse cx="99" cy="126" rx="5.2" ry="9" fill="currentColor" stroke="none" />
);
const rightEye = (
  <ellipse
    cx="160"
    cy="127"
    rx="5.2"
    ry="9"
    fill="currentColor"
    stroke="none"
  />
);
const smile = <path d="M119 144q11 12 23-1" />;
const happyEyes = <path d="M91 128q8-12 17 0m43 1q9-12 17 1" />;

type FaceDrawing = {
  eyes: ReactNode;
  mouth: ReactNode;
  blush?: boolean;
  doodle?: ReactNode;
};

const faces = {
  smile: {
    eyes: (
      <>
        {leftEye}
        {rightEye}
      </>
    ),
    mouth: smile,
  },
  wink: {
    eyes: (
      <>
        {leftEye}
        <path className="boo-wink" d="m151 125 9-4 8 4" />
      </>
    ),
    mouth: smile,
  },
  shy: {
    eyes: <path d="M92 125q5 9 14 6m45 1q8 5 15-4" />,
    mouth: <path d="M125 153q6 3 11-1" strokeWidth="3.5" />,
    blush: true,
  },
  grin: {
    eyes: happyEyes,
    mouth: (
      <path
        d="M113 142q16 9 32-2c-3 16-21 22-32 2Z"
        fill="currentColor"
        strokeWidth="2.5"
      />
    ),
  },
  gasp: {
    eyes: (
      <>
        <ellipse cx="99" cy="125" rx="9" ry="12" />
        <ellipse cx="160" cy="126" rx="9" ry="12" />
      </>
    ),
    mouth: <ellipse cx="132" cy="152" rx="8" ry="10" />,
    doodle: <path d="m239 21 6-13m-9 22 .5-.8" />,
  },
  smirk: {
    eyes: (
      <>
        {leftEye}
        <path d="M147 123q10 6 22 1m-19-8 13-7" />
      </>
    ),
    mouth: <path d="M120 148q15 4 26-8" />,
  },
  sleepy: {
    eyes: <path d="M89 124q9 10 20 1m42 1q9 10 18 1" />,
    mouth: <ellipse cx="130" cy="151" rx="4.5" ry="6.5" />,
    doodle: <path d="m232 34 12-1-10 12 13-1m7-26 12-1-10 12 12-1" />,
  },
  starry: {
    eyes: (
      <path
        d="m99 115 3 8 8 3-8 3-3 8-3-8-8-3 8-3Zm61 0 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"
        fill="currentColor"
        strokeWidth="2"
      />
    ),
    mouth: smile,
    doodle: <path d="m44 16 3 7 7 3-7 2-2 7-3-7-7-3 7-2Z" />,
  },
  lovestruck: {
    eyes: (
      <path
        d="M99 137C72 121 94 109 99 120c6-11 26 1 0 17Zm61 1c-27-16-5-28 0-17 6-11 26 1 0 17Z"
        fill="#f6a6c3"
        stroke="none"
      />
    ),
    mouth: <path d="M119 147q12 11 23-2" />,
    doodle: <path d="M242 32c-17-8-7-19 0-12 6-9 17 1 0 12Z" />,
    blush: true,
  },
  cheeky: {
    eyes: happyEyes,
    mouth: (
      <>
        <path
          d="M117 145q15 5 29-1c-2 11-21 16-29 1Z"
          fill="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M135 151q5-2 10 1c1 12-13 14-13 3Z"
          fill="#ef9aba"
          stroke="none"
        />
      </>
    ),
  },
  suspicious: {
    eyes: (
      <>
        <path d="m89 120 21 5m40 1 19-5m-80-8 17 2" />
        <path d="M99 124v6m62-5v5" />
      </>
    ),
    mouth: <path d="m121 149 21-4" />,
    doodle: <path d="M243 19q1-8 9-8c10 0 11 9 5 13-4 2-6 4-6 8m-1 7h.1" />,
  },
  dizzy: {
    eyes: (
      <path
        d="M99 125c6-6 10 7 3 10-10 6-19-8-10-15 6-5 12-4 16 1m52 5c5-7 11 5 4 10-10 6-20-7-12-15 5-5 12-5 16-1"
        strokeWidth="3.5"
      />
    ),
    mouth: <path d="M119 149q7-7 12-1 6 6 13-1" />,
    doodle: <path d="M77 29q45-25 91-15t16 15m-8-5 1 8 8 1" />,
  },
  kiss: {
    eyes: <path d="M90 127q7-10 18-2m43 3q8-11 18-3" />,
    mouth: <path d="M125 144q9-6 12 1-2 4-7 5 6-1 8 4-2 6-12 2" />,
    doodle: (
      <path d="M231 116q-17-5-12-12c2-3 6-3 9 0 2-6 9-8 11-2q2 6-8 14Z" />
    ),
  },
} satisfies Record<string, FaceDrawing>;

export type BooExpression = keyof typeof faces;

export const booReactions = Object.keys(faces).filter(
  (face): face is Exclude<BooExpression, "smile"> => face !== "smile",
);

export function BooFace({ expression }: { expression: BooExpression }) {
  const { eyes, mouth, blush, doodle }: FaceDrawing = faces[expression];

  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="82" cy="142" rx="9" ry="4" fill="#e282a4" />
      <ellipse cx="177" cy="145" rx="9" ry="4" fill="#e282a4" />
      <g color="#fff1e9" stroke="currentColor" strokeWidth="4.5">
        {eyes}
        {mouth}
      </g>
      {blush && (
        <path
          className="boo-blush"
          d="m72 146 4-9m3 12 5-11m3 11 5-8m75 9 4-9m3 12 5-11m3 11 5-8"
          stroke="#f6a6c3"
          strokeWidth="2.8"
        />
      )}
      {doodle && (
        <g
          className="boo-doodle"
          stroke="var(--boo-doodle, #a02b60)"
          strokeWidth="3"
        >
          {doodle}
        </g>
      )}
    </g>
  );
}
