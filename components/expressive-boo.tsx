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

export function ExpressiveBoo() {
  const [expression, setExpression] = useState<BooExpression>("smile");
  const timer = useRef<number | undefined>(undefined);
  const remaining = useRef<Reaction[]>([]);
  const previous = useRef<Reaction | undefined>(undefined);

  const reset = useCallback(() => {
    window.clearTimeout(timer.current);
    timer.current = undefined;
    setExpression("smile");
  }, []);

  useEffect(() => {
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const resetWhenHidden = () => {
      if (document.hidden) reset();
    };
    reducedMotion.addEventListener("change", reset);
    document.addEventListener("visibilitychange", resetWhenHidden);
    window.addEventListener("blur", reset);

    return () => {
      window.clearTimeout(timer.current);
      reducedMotion.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", resetWhenHidden);
      window.removeEventListener("blur", reset);
    };
  }, [reset]);

  function playReaction() {
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
    timer.current = window.setTimeout(playReaction, 1100 + Math.random() * 700);
  }

  function start(event: PointerEvent<HTMLSpanElement>) {
    if (
      event.pointerType === "touch" ||
      event.buttons !== 0 ||
      timer.current !== undefined ||
      document.hidden ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    playReaction();
  }

  return (
    <span
      className="expressive-boo"
      onPointerEnter={start}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <Boo expression={expression} />
    </span>
  );
}
