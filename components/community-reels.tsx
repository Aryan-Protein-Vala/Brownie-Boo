"use client";

import { useState } from "react";
import { art } from "../lib/catalogue";
import { Arrow } from "./art";

const prompts = [
  { image: "ritual-960", title: "The first-bite face." },
  { image: "the-break-mobile", title: "The gooey close-up." },
  { image: "original-cut-640", title: "The last crumb." },
] as const;

export function CommunityReels() {
  const [active, setActive] = useState(0);

  function step(direction: number) {
    setActive((index) => (index + direction + prompts.length) % prompts.length);
  }

  return (
    <div
      className="reel-demo"
      role="group"
      aria-label="Brownie Boo reel prompts"
    >
      <div className="reel-stack">
        {prompts.map(({ image, title }, index) => (
          <figure
            className="reel-frame"
            data-reel-position={
              (index - active + prompts.length) % prompts.length
            }
            aria-hidden={index !== active}
            key={image}
          >
            <img src={art(image)} alt="" loading="lazy" decoding="async" />
            <figcaption>
              <span>Reel prompt</span>
              <strong>{title}</strong>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="reel-controls">
        <button
          className="reel-step reel-prev"
          type="button"
          aria-label="Previous reel prompt"
          onClick={() => step(-1)}
        >
          <Arrow />
        </button>
        <output aria-live="polite" aria-label="Current reel prompt">
          <span aria-hidden="true">
            {active + 1} / {prompts.length}
          </span>
          <span className="sr-only">{prompts[active].title}</span>
        </output>
        <button
          className="reel-step"
          type="button"
          aria-label="Next reel prompt"
          onClick={() => step(1)}
        >
          <Arrow />
        </button>
      </div>
    </div>
  );
}
