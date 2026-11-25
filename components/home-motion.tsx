"use client";

import { ActionButton } from "./action";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { brandTagline } from "../lib/brand";
import { art, products, variants } from "../lib/catalogue";
import { Arrow, Drips, FamilySeam, ScrollStamp, Spark } from "./art";
import { SiteLink } from "./shell";
import { request } from "./store";
import { scrollToScene } from "./smooth-scroll";

type Variant = (typeof variants)[number];

function headerHeight() {
  return (
    document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0
  );
}

export function Hero({
  initial,
  preview,
}: {
  initial: Variant;
  preview: boolean;
}) {
  const [variant, setVariant] = useState(initial);
  const [tracking, setTracking] = useState(false);
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    if (preview) return;
    let active = true;
    let observer: IntersectionObserver | undefined;
    request<{ variant: string }>("experiment", { kind: "assign" }).then(
      (result) => {
        if (!active || !result.data) return;
        const assigned =
          variants.find(({ id }) => id === result.data?.variant) ?? initial;
        setVariant(assigned);
        setTracking(true);
        if (hero.current) {
          observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                request("experiment", { kind: "impression" });
                observer?.disconnect();
              }
            },
            { threshold: 0.25 },
          );
          observer.observe(hero.current);
        }
      },
    );
    return () => {
      active = false;
      observer?.disconnect();
    };
  }, [initial, preview]);

  function lean(event: PointerEvent<HTMLElement>) {
    if (
      event.pointerType !== "mouse" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    hero.current?.style.setProperty(
      "--look-x",
      `${((event.clientX - rect.left) / rect.width - 0.5) * 14}px`,
    );
    hero.current?.style.setProperty(
      "--look-y",
      `${((event.clientY - rect.top) / rect.height - 0.5) * 11}px`,
    );
  }

  return (
    <section
      className="hero"
      ref={hero}
      data-hero={variant.id}
      onPointerMove={lean}
      onPointerLeave={() => {
        hero.current?.style.setProperty("--look-x", "0px");
        hero.current?.style.setProperty("--look-y", "0px");
      }}
    >
      <div className="hero-photo">
        <picture>
          <source media="(max-width: 680px)" srcSet={art("the-break-mobile")} />
          <img
            src={art("the-break")}
            alt="A campaign concept of dark chocolate brownie breaking open, with a molten centre and flying crumbs"
            width="1460"
            height="973"
            fetchPriority="high"
          />
        </picture>
      </div>
      <div className="hero-copy">
        <p className="hero-kicker">{brandTagline}</p>
        <h1>
          <span>{variant.lead}</span>
          {variant.tail && <em>{variant.tail}</em>}
        </h1>
        <p className="hero-support">{variant.support}</p>
        <div
          onClick={() => {
            if (tracking) request("experiment", { kind: "click" });
          }}
        >
          <SiteLink className="action action-pink" href={variant.href}>
            {variant.action}
          </SiteLink>
        </div>
      </div>
      <a
        href="#the-lineup"
        className="hero-next"
        aria-label="Scroll to the Boo family"
      >
        <ScrollStamp />
      </a>
      <Drips className="hero-cut" />
    </section>
  );
}

export function Family() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const interval = matchMedia(
      "(min-width: 820px) and (min-height: 540px) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    let current = 0;
    let lastProgress = -1;
    const panels = [...section.querySelectorAll<HTMLElement>("[data-panel]")];
    const interpolate = () => {
      frame = 0;
      if (!interval.matches) {
        section.removeAttribute("data-motion");
        lastProgress = -1;
        if (current !== 0) {
          current = 0;
          setActive(0);
        }
        return;
      }
      if (!section.dataset.motion) section.dataset.motion = "scroll";
      const offset = headerHeight();
      const span = Math.max(
        1,
        section.offsetHeight - (window.innerHeight - offset),
      );
      const progress = Math.min(
        1,
        Math.max(0, (offset - section.getBoundingClientRect().top) / span),
      );
      if (progress === lastProgress) return;
      lastProgress = progress;
      section.style.setProperty("--slide", String(progress));
      const index = progress * (products.length - 1);
      for (const [offset, panel] of panels.entries()) {
        const distance = Math.max(-1, Math.min(1, index - offset));
        panel.style.setProperty("--panel-shift", `${distance * 10}%`);
        panel.style.setProperty("--panel-spin", `${distance * 11}deg`);
      }
      const next = Math.round(index);
      if (current !== next) {
        current = next;
        setActive(next);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(interpolate);
    };
    const focusSlide = (event: FocusEvent) => {
      if (
        !interval.matches ||
        !section.contains(event.target as Node) ||
        !section.matches(":has(:focus-visible)")
      )
        return;
      const candidate = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-panel]",
      );
      if (!candidate) return;
      const index = Number(candidate.dataset.panel);
      moveTo(index);
    };
    function moveTo(index: number) {
      if (!section) return;
      const header = headerHeight();
      const base = scrollY + section.getBoundingClientRect().top - header;
      const distance = section.offsetHeight - (innerHeight - header);
      scrollToScene(base + (distance * index) / (products.length - 1), true);
    }
    interpolate();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    interval.addEventListener("change", schedule);
    section.addEventListener("focusin", focusSlide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      interval.removeEventListener("change", schedule);
      section.removeEventListener("focusin", focusSlide);
      section.removeAttribute("data-motion");
    };
  }, []);

  function jump(index: number) {
    const section = root.current;
    if (!section) return;
    const header = headerHeight();
    const base = scrollY + section.getBoundingClientRect().top - header;
    const distance = section.offsetHeight - (innerHeight - header);
    scrollToScene(base + (distance * index) / (products.length - 1));
  }

  return (
    <>
      <div className="family-lead" id="the-lineup" tabIndex={-1}>
        <div>
          <p className="tag">The Boo Family</p>
          <h2>
            Three Boos.
            <br />
            <em>Zero boring bites.</em>
          </h2>
        </div>
        <SiteLink href="/shop" className="text-link">
          See the full line-up <Arrow />
        </SiteLink>
      </div>
      <section
        className="family"
        ref={root}
        aria-label="Meet the three brownie formulations"
      >
        <Drips className="section-drip family-entry-edge" />
        <div className="family-sticky">
          <div className="family-track">
            {products.map((product, index) => (
              <article
                key={product.slug}
                className={`family-panel tint-${product.theme}`}
                data-panel={index}
              >
                {index > 0 && (
                  <Drips className="section-drip family-stacked-edge" />
                )}
                {index < products.length - 1 && <FamilySeam />}
                <div className="family-panel-inner">
                  <div className="family-copy">
                    <h3>
                      {product.split[0]}
                      <em>{product.split[1]}</em>
                    </h3>
                    <p>{product.blurb}</p>
                    <p className="protein-source">{product.ingredients}.</p>
                    <SiteLink
                      href={`/shop/${product.slug}`}
                      className="action action-ink"
                    >
                      {`Meet ${product.name.replace(/^The /, "")}`}
                    </SiteLink>
                  </div>
                  <figure className="family-photo">
                    <img
                      src={art(product.wrapper)}
                      alt={`${product.name} concept wrapper and brownie`}
                      width="960"
                      height="640"
                      loading="lazy"
                    />
                    <img
                      className="family-cut"
                      src={art(product.cut)}
                      alt=""
                      width="640"
                      height="430"
                      loading="lazy"
                    />
                  </figure>
                </div>
              </article>
            ))}
          </div>
          <div className="family-position" aria-label="Choose a brownie">
            {products.map((product, index) => (
              <ActionButton
                className="ink-action"
                type="button"
                key={product.slug}
                aria-current={active === index ? "true" : undefined}
                onClick={() => jump(index)}
              >
                {product.name}
              </ActionButton>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function Texture() {
  const [open, setOpen] = useState(false);

  return (
    <section className="texture film-break" data-open={open}>
      <div className="texture-scene">
        <Drips />
        <div className="texture-photo">
          <img
            className="texture-open"
            src={art("the-break")}
            alt=""
            width="1460"
            height="973"
            loading="lazy"
          />
          <div className="texture-half texture-left">
            <img
              src={art("ritual-960")}
              alt=""
              width="960"
              height="640"
              loading="lazy"
            />
          </div>
          <div className="texture-half texture-right">
            <img
              src={art("ritual-960")}
              alt=""
              width="960"
              height="640"
              loading="lazy"
            />
          </div>
        </div>
        <div className="texture-copy">
          <h2>
            <span className="film-line">
              <span data-enter="down">Go ahead.</span>
            </span>
            <span className="film-line">
              <em data-enter="up">Stare.</em>
            </span>
          </h2>
          <ActionButton
            type="button"
            onClick={() => setOpen(!open)}
            aria-pressed={open}
            className="action action-pink"
          >
            {open ? "Put it back" : "Break it open"}
          </ActionButton>
        </div>
        <Spark className="texture-spark" />
        <p className="texture-caption" aria-live="polite">
          {open
            ? "All crags, crumbs and chocolate."
            : "A very serious chocolate situation."}
        </p>
      </div>
    </section>
  );
}
