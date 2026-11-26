"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";
import { scrollToScene } from "./smooth-scroll";
import { biteEdgeStart, dropMeltStart } from "./art";

function headerHeight() {
  return (
    document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0
  );
}

const biteRipple =
  "M0 62 C66 -2 106 6 132 76 C149 130 199 119 247 76 C289 39 337 21 374 78 C397 119 456 105 490 58 C533 -1 568 21 610 58 C655 102 702 114 736 48 C773 -6 816 11 857 42 C908 75 950 70 1000 24 V144 H0 Z";
const biteEnd =
  "M0 29 C55 45 103 47 140 30 C181 11 211 15 252 26 C294 36 332 47 374 32 C414 13 450 15 491 27 C534 42 567 45 609 26 C659 4 697 22 734 30 C780 43 822 24 865 15 C915 4 951 13 1000 26 V144 H0 Z";

export function HomeFilm({ children }: { children: ReactNode }) {
  const film = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const home = film.current;
    if (!home) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        stage: "(min-height: 620px) and (min-width: 360px)",
      },
      ({ conditions }) => {
        if (!conditions?.motion) return;

        const bite = home.querySelector<HTMLElement>(".film-bite");
        const split = home.querySelector<HTMLElement>(".film-break");
        const reels = home.querySelector<HTMLElement>(".community-reels");
        const box = home.querySelector<HTMLElement>(".film-box");
        const finale = home.querySelector<HTMLElement>(".film-finale");
        if (!bite || !split || !reels || !box || !finale) return;

        const cleanup: (() => void)[] = [];
        home.dataset.film = conditions.stage ? "staged" : "flow";

        function reveal(
          scope: HTMLElement,
          trigger: HTMLElement,
          start: string,
        ) {
          const lines = [
            ...scope.querySelectorAll<HTMLElement>("[data-enter]"),
          ];
          const scene = gsap.timeline({
            scrollTrigger: { trigger, start, once: true },
          });
          for (const [index, line] of lines.entries()) {
            const sign = line.dataset.enter === "down" ? -1 : 1;
            scene.fromTo(
              line,
              { yPercent: 108 * sign },
              {
                yPercent: 0,
                duration: 0.78,
                ease: "power3.out",
                immediateRender: false,
              },
              index * 0.13,
            );
          }
        }

        function track(section: HTMLElement) {
          return gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              start: () => `top top+=${headerHeight()}`,
              end: "bottom bottom",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }

        if (conditions.stage) {
          const texture = track(bite);
          texture
            .fromTo(split, { "--dolly": 0 }, { "--dolly": 1, duration: 0.4 }, 0)
            .fromTo(
              split,
              { "--tear": 0 },
              { "--tear": 1, ease: "power2.inOut", duration: 0.36 },
              0.07,
            )
            .fromTo(
              bite,
              { "--bite-cover": 0 },
              { "--bite-cover": 1, ease: "power2.inOut", duration: 0.43 },
              0.45,
            );
          const edge = bite.querySelector("[data-bite-edge]");
          if (edge) {
            texture
              .fromTo(
                edge,
                { attr: { d: biteEdgeStart } },
                { attr: { d: biteRipple }, ease: "sine.inOut", duration: 0.19 },
                0.45,
              )
              .to(
                edge,
                { attr: { d: biteEnd }, ease: "sine.inOut", duration: 0.24 },
                0.64,
              );
          }
          const reelTitle = reels.querySelectorAll<HTMLElement>("[data-enter]");
          const reelTitleStart = { opacity: 0, yPercent: 124 };
          gsap.set(reelTitle, reelTitleStart);
          texture.fromTo(
            reelTitle,
            reelTitleStart,
            {
              opacity: 1,
              yPercent: 0,
              immediateRender: false,
              duration: 0.16,
              stagger: 0.035,
              ease: "power2.out",
            },
            0.74,
          );
          const stack = reels.querySelector(".reel-stack");
          if (stack) {
            texture.fromTo(
              stack,
              { yPercent: 22, rotate: -9, scale: 0.82 },
              {
                yPercent: 0,
                rotate: 0,
                scale: 1,
                duration: 0.27,
                ease: "power2.out",
              },
              0.61,
            );
          }
          texture.to({}, { duration: 0.055 }, 0.945);

          function focusBite(event: FocusEvent) {
            const target = event.target;
            const trigger = texture.scrollTrigger;
            if (
              !(target instanceof HTMLElement) ||
              !target.matches(":focus-visible") ||
              !trigger
            )
              return;
            const onReels = reels?.contains(target);
            if (
              (onReels && trigger.progress < 0.92) ||
              (!onReels && trigger.progress > 0.44)
            ) {
              const position = onReels ? 0.95 : 0.33;
              scrollToScene(
                trigger.start + position * (trigger.end - trigger.start),
                true,
              );
            }
          }
          bite.addEventListener("focusin", focusBite);
          cleanup.push(() => bite.removeEventListener("focusin", focusBite));

          const unwrap = track(box);
          unwrap
            .fromTo(
              box,
              { "--unfold": 0 },
              { "--unfold": 1, ease: "power3.inOut", duration: 0.78 },
              0,
            )
            .fromTo(
              box,
              { "--wrapper-angle": 0 },
              { "--wrapper-angle": 1, duration: 1 },
              0,
            );

          const paper = finale.querySelector<HTMLElement>(".story-feature");
          const drop = finale.querySelector<HTMLElement>(".drop-feature");
          const melt = finale.querySelector("[data-drop-melt]");
          if (paper && drop && melt) {
            const cut = track(finale);
            cut
              .fromTo(
                melt,
                { attr: { transform: dropMeltStart } },
                {
                  attr: { transform: "translate(0.57 0) scale(1.12 1)" },
                  duration: 0.21,
                  ease: "power2.in",
                },
                0.19,
              )
              .to(
                melt,
                {
                  attr: { transform: "translate(-0.18 0) scale(0.82 1)" },
                  duration: 0.25,
                  ease: "power3.out",
                },
                0.4,
              )
              .fromTo(
                paper,
                { "--paper-turn": 0 },
                { "--paper-turn": 1, ease: "power2.inOut", duration: 0.43 },
                0.26,
              )
              .fromTo(
                drop,
                { "--melt-pull": 0 },
                { "--melt-pull": 1, duration: 0.76 },
                0.24,
              );
            const dropLines = [
              ...drop.querySelectorAll<HTMLElement>("[data-enter]"),
            ];
            const dropDetails = drop.querySelectorAll<HTMLElement>(
              ".drop-content > :not(h2)",
            );
            gsap.set(dropDetails, { opacity: 0 });
            for (const [index, line] of dropLines.entries()) {
              const entrance = {
                opacity: 0,
                yPercent: index === 0 ? -130 : 130,
              };
              gsap.set(line, entrance);
              cut.fromTo(
                line,
                entrance,
                {
                  opacity: 1,
                  yPercent: 0,
                  ease: "power3.out",
                  duration: 0.18,
                  immediateRender: false,
                },
                0.49 + index * 0.06,
              );
            }
            cut.fromTo(
              dropDetails,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.13,
                stagger: 0.02,
                ease: "power2.out",
                immediateRender: false,
              },
              0.65,
            );
            // Give the shot time to land before the next section enters.
            cut.to({}, { duration: 0.1 }, 0.9);

            function catchFocus(event: FocusEvent) {
              const target = event.target;
              const trigger = cut.scrollTrigger;
              if (
                !(target instanceof HTMLElement) ||
                !target.matches(":focus-visible") ||
                !trigger
              )
                return;
              const onDrop = Boolean(target.closest(".drop-feature"));
              const progress = trigger.progress;
              if ((onDrop && progress < 0.75) || (!onDrop && progress > 0.22)) {
                const position = onDrop ? 0.82 : 0.06;
                scrollToScene(
                  trigger.start + position * (trigger.end - trigger.start),
                  true,
                );
              }
            }
            finale.addEventListener("focusin", catchFocus);
            cleanup.push(() =>
              finale.removeEventListener("focusin", catchFocus),
            );
            reveal(paper, finale, "top 78%");
          }
        } else {
          const drop = finale.querySelector<HTMLElement>(".drop-feature");
          const paper = finale.querySelector<HTMLElement>(".story-feature");
          if (drop) reveal(drop, drop, "top 76%");
          if (paper) reveal(paper, paper, "top 77%");
        }

        reveal(split, split, "top 64%");
        reveal(box, box, "top 72%");
        const club = home.querySelector<HTMLElement>(".club");
        if (!conditions.stage) reveal(reels, reels, "top 78%");
        if (club) {
          reveal(club, club, "top 77%");
          const mascot = club.querySelector("figure");
          if (mascot) {
            gsap.fromTo(
              mascot,
              { xPercent: 15, rotate: 11 },
              {
                xPercent: 0,
                rotate: 0,
                ease: "power3.out",
                duration: 0.88,
                immediateRender: false,
                scrollTrigger: {
                  trigger: mascot,
                  start: "top 92%",
                  once: true,
                },
              },
            );
          }
        }

        const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => {
          cancelAnimationFrame(frame);
          for (const dispose of cleanup) dispose();
          delete home.dataset.film;
        };
      },
      home,
    );
    return () => media.revert();
  }, []);

  return (
    <div className="home-film" ref={film}>
      {children}
    </div>
  );
}
