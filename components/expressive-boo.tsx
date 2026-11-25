"use client";

import { useEffect, useRef, useState } from "react";
import { Boo, type BooExpression } from "./art";

const routine: { face: BooExpression; hold: number }[] = [
  { face: "smile", hold: 680 },
  { face: "wink", hold: 370 },
  { face: "smile", hold: 850 },
  { face: "shy", hold: 1450 },
  { face: "grin", hold: 1050 },
  { face: "smile", hold: 2200 },
];

export function ExpressiveBoo() {
  const stage = useRef<HTMLSpanElement>(null);
  const [expression, setExpression] = useState<BooExpression>("smile");

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;
    let visible = false;

    function play(index: number) {
      const beat = routine[index];
      setExpression(beat.face);
      timer = window.setTimeout(
        () => play((index + 1) % routine.length),
        beat.hold,
      );
    }

    function update() {
      window.clearTimeout(timer);
      if (visible && !document.hidden && !reducedMotion.matches) play(0);
      else setExpression("smile");
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.intersectionRatio >= 0.45;
        update();
      },
      { threshold: 0.45 },
    );

    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  return (
    <span className="expressive-boo" ref={stage}>
      <Boo expression={expression} />
    </span>
  );
}
