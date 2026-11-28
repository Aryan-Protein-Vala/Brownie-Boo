"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { Boo } from "./art";
import { booReactions, type BooExpression } from "./boo-face";

type Reaction = (typeof booReactions)[number];

export function ExpressiveBoo({
  autoOnMobile = false,
}: {
  autoOnMobile?: boolean;
}) {
  const [expression, setExpression] = useState<BooExpression>("smile");
  const mascot = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const remaining = useRef<Reaction[]>([]);
  const previous = useRef<Reaction | undefined>(undefined);
  const automatic = useRef(false);

  const reset = useCallback(() => {
    window.clearTimeout(timer.current);
    timer.current = undefined;
    setExpression("smile");
  }, []);

  const playReaction = useCallback(function nextReaction() {
    if (remaining.current.length === 0) remaining.current = [...booReactions];
    const choices = remaining.current.filter(
      (face) => face !== previous.current,
    );
    const face = choices[Math.floor(Math.random() * choices.length)];

    remaining.current = remaining.current.filter(
      (candidate) => candidate !== face,
    );
    previous.current = face;
    setExpression(face);
    timer.current = window.setTimeout(nextReaction, 1100 + Math.random() * 700);
  }, []);

  useEffect(() => {
    const mobile = matchMedia("(hover: none) and (pointer: coarse)");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const node = mascot.current;
    let inView = false;

    function syncMobile() {
      automatic.current = autoOnMobile && mobile.matches;
      if (
        automatic.current &&
        inView &&
        !document.hidden &&
        !reducedMotion.matches
      ) {
        if (timer.current === undefined) playReaction();
      } else {
        reset();
      }
    }

    function handleVisibility() {
      if (document.hidden) reset();
      else if (automatic.current) syncMobile();
    }

    const observer = autoOnMobile
      ? new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting;
          if (automatic.current) syncMobile();
        })
      : undefined;

    if (node) observer?.observe(node);
    syncMobile();
    mobile.addEventListener("change", syncMobile);
    reducedMotion.addEventListener("change", syncMobile);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", reset);
    window.addEventListener("focus", handleVisibility);

    return () => {
      observer?.disconnect();
      window.clearTimeout(timer.current);
      timer.current = undefined;
      mobile.removeEventListener("change", syncMobile);
      reducedMotion.removeEventListener("change", syncMobile);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", reset);
      window.removeEventListener("focus", handleVisibility);
    };
  }, [autoOnMobile, playReaction, reset]);

  function start(event: PointerEvent<HTMLSpanElement>) {
    if (
      automatic.current ||
      event.pointerType === "touch" ||
      event.buttons !== 0 ||
      timer.current !== undefined ||
      document.hidden ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    playReaction();
  }

  function stopHover() {
    if (!automatic.current) reset();
  }

  return (
    <span
      ref={mascot}
      className="expressive-boo"
      onPointerEnter={start}
      onPointerLeave={stopHover}
      onPointerCancel={stopHover}
    >
      <Boo expression={expression} />
    </span>
  );
}
