"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { slideUrl } from "./campaigns";
import styles from "./marketing.module.css";

export function DownloadMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Chevron({ previous = false }: { previous?: boolean }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={previous ? "m14 5-7 7 7 7" : "m10 5 7 7-7 7"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Carousel({
  slug,
  name,
  count,
  children,
}: {
  slug: string;
  name: string;
  count: number;
  children: ReactNode;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const multiple = count > 1;

  const sync = useCallback(() => {
    const list = track.current;
    if (list?.clientWidth) {
      setActive(Math.min(count - 1, Math.max(0, Math.round(list.scrollLeft / list.clientWidth))));
    }
  }, [count]);

  useEffect(() => {
    sync();
    setReady(true);
  }, [sync]);

  function go(index: number) {
    const list = track.current;
    if (!list || index < 0 || index >= count) return;
    list.scrollTo({ left: index * list.clientWidth, behavior: "instant" });
    setActive(index);
  }

  return (
    <div className={styles.carousel} data-ready={ready}>
      <ul
        className={styles.track}
        ref={track}
        aria-label={`${name} artwork`}
        data-native-scroll=""
        tabIndex={multiple ? 0 : undefined}
        onScroll={sync}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            go(active + (event.key === "ArrowLeft" ? -1 : 1));
          }
        }}
      >
        {children}
      </ul>
      <div className={styles.artTools}>
        {multiple ? (
          <div className={styles.pager}>
            <button type="button" disabled={!ready || active === 0} onClick={() => go(active - 1)} aria-label={`Previous slide, ${name}`}>
              <Chevron previous />
            </button>
            <span aria-live="polite" aria-atomic="true">{active + 1} / {count}</span>
            <button type="button" disabled={!ready || active === count - 1} onClick={() => go(active + 1)} aria-label={`Next slide, ${name}`}>
              <Chevron />
            </button>
          </div>
        ) : (
          <span className={styles.staticLabel}>Single image</span>
        )}
        <a className={styles.saveSlide} href={slideUrl(slug, active)} download aria-label={`Download ${name}${multiple ? `, slide ${active + 1} of ${count}` : ""} as PNG`}>
          <DownloadMark /> PNG
        </a>
      </div>
    </div>
  );
}
