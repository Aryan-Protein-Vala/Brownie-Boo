"use client";

import { ActionButton } from "./action";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Boo, Drips } from "./art";
import {
  advanceRun,
  floor,
  newRun,
  requestJump,
  runnerX,
} from "../lib/brownie-run";

type Phase = "ready" | "running" | "paused" | "crash";

const slotCount = 6;
const slots = Array.from({ length: slotCount }, (_, index) => index);
const scoreKey = "brownie-boo-run-best";

function Bakery() {
  return (
    <svg
      className="run-bakery"
      viewBox="0 0 750 250"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="750" height="250" fill="#f9e7ef" />
      <path
        d="M0 36h750M0 79h750M0 123h750M0 168h750M0 211h750M67 0v36m165-36v36m165-36v36m165-36v36M118 36v43m165-43v43m165-43v43m165-43v43M67 79v44m165-44v44m165-44v44m165-44v44M118 123v45m165-45v45m165-45v45m165-45v45M67 168v43m165-43v43m165-43v43m165-43v43"
        fill="none"
        stroke="#ebd2e4"
      />
      <g fill="#efcedf" stroke="#d9afca" strokeWidth="2">
        <path d="M-20 202v-99q0-9 9-9h136q10 0 10 10v98Z" />
        <path d="M621 202v-99q0-9 9-9h135v108Z" />
        <path d="M149 66h173v9H149Zm299 0h163v9H448Z" />
        <path d="M227 67V34h25v33m20 0V24h30v43m207 0V36h25v31m21 0V43h24v24" />
        <path d="M305 177v-71q0-14 14-14h112q15 0 15 14v71z" />
      </g>
      <g fill="#e5b7d0" stroke="#d1a1c2" strokeWidth="2.5">
        <path d="M-3 128h108v65H-3zm648 0h109v65H645z" />
        <rect x="320" y="117" width="109" height="50" rx="10" />
        <path d="M337 140h75m-146 43h216" strokeLinecap="round" />
        <circle cx="333" cy="104" r="2.5" />
        <circle cx="350" cy="104" r="2.5" />
        <circle cx="367" cy="104" r="2.5" />
        <circle cx="20" cy="109" r="2.5" />
        <circle cx="34" cy="109" r="2.5" />
        <circle cx="48" cy="109" r="2.5" />
        <circle cx="687" cy="109" r="2.5" />
        <circle cx="701" cy="109" r="2.5" />
        <circle cx="715" cy="109" r="2.5" />
      </g>
    </svg>
  );
}

function Traps() {
  return (
    <>
      <g
        data-trap="tins"
        fill="none"
        stroke="#42172f"
        strokeWidth="2.4"
        strokeLinejoin="round"
      >
        <path d="M3-36h35l-2 35H7Z" fill="#a96082" />
        <path d="M3-36q-4-6 2-6h34q5 2 0 6Z" fill="#f7afd0" />
        <path d="M7-25h29v15H7Z" fill="#f3acc9" />
        <path d="m15-17 4-3 3 3 5-3" />
      </g>
      <g
        data-trap="spool"
        stroke="#42172f"
        strokeWidth="2.5"
        strokeLinejoin="round"
      >
        <path d="M3-19h45q5 0 2 6l-4 8-7-7H11L3-4Z" fill="#e992b8" />
        <path d="M9-29q14 5 21 0l4 5 9-1-5 24H11L6-23Z" fill="#70415f" />
        <path
          d="m12-22 6 9 7-7 7 9 5-10"
          fill="none"
          stroke="#ffd6e7"
          strokeWidth="2"
        />
      </g>
      <g
        data-trap="stack"
        stroke="#42172f"
        strokeWidth="2.5"
        strokeLinejoin="round"
      >
        <path d="M0-22h48l-5 21H5Z" fill="#d383a6" />
        <path d="M5-36h42l-5 14H9Z" fill="#f4b5d0" />
        <path d="M9-49l35-4 1 17H7Z" fill="#af6b91" />
        <path d="M8-15h33M15-30h25m-24-15 21-2" fill="none" />
      </g>
      <path
        className="run-crumb"
        d="m18-92 6-5 9 3 3 8-7 6-8-2Z"
        fill="#a35744"
        stroke="#4d2030"
        strokeWidth="1.8"
      />
    </>
  );
}

export function BrownieRun() {
  const [phase, setPhase] = useState<Phase>("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const phaseRef = useRef<Phase>("ready");
  const run = useRef(newRun());
  const frame = useRef(0);
  const lastTime = useRef(0);
  const lastScoreTime = useRef(0);
  const width = useRef(480);
  const arena = useRef<HTMLDivElement>(null);
  const view = useRef<SVGSVGElement>(null);
  const actor = useRef<SVGGElement>(null);
  const shadow = useRef<SVGEllipseElement>(null);
  const belt = useRef<SVGPathElement>(null);
  const traps = useRef<(SVGGElement | null)[]>([]);

  function switchPhase(next: Phase) {
    phaseRef.current = next;
    setPhase(next);
  }

  function paint() {
    const current = run.current;
    const x = runnerX(width.current);
    actor.current?.setAttribute(
      "transform",
      `translate(${x} ${floor - 61 - current.height})`,
    );
    actor.current?.setAttribute(
      "data-airborne",
      current.height > 5 ? "true" : "false",
    );
    shadow.current?.setAttribute("cx", String(x + 36));
    shadow.current?.setAttribute("rx", String(22 - current.height * 0.145));
    belt.current?.setAttribute(
      "transform",
      `translate(${-(current.distance % 34)} 0)`,
    );
    for (const [index, element] of traps.current.entries()) {
      if (!element) continue;
      const object = current.objects[index];
      element.style.display = object ? "" : "none";
      if (!object) continue;
      element.setAttribute("transform", `translate(${object.x} ${floor})`);
      if (element.dataset.kind !== object.kind)
        element.dataset.kind = object.kind;
      element.dataset.crumb = String(object.crumb);
    }
  }

  function tick(now: number) {
    if (phaseRef.current !== "running") return;
    const elapsed = lastTime.current ? (now - lastTime.current) / 1000 : 0;
    lastTime.current = now;
    const ongoing = advanceRun(run.current, elapsed, width.current);
    paint();
    if (!ongoing) {
      const finalScore = run.current.score;
      setScore(finalScore);
      setBest((previous) => Math.max(previous, finalScore));
      try {
        const saved = Number(localStorage.getItem(scoreKey));
        if (!Number.isSafeInteger(saved) || finalScore > saved) {
          localStorage.setItem(scoreKey, String(finalScore));
        }
      } catch {}
      switchPhase("crash");
      return;
    }
    if (now - lastScoreTime.current > 92) {
      setScore(run.current.score);
      lastScoreTime.current = now;
    }
    frame.current = requestAnimationFrame(tick);
  }

  function begin(jump = false) {
    cancelAnimationFrame(frame.current);
    run.current = newRun();
    if (jump) requestJump(run.current);
    setScore(0);
    lastTime.current = 0;
    switchPhase("running");
    paint();
    arena.current?.focus({ preventScroll: true });
    frame.current = requestAnimationFrame(tick);
  }

  function pause() {
    if (phaseRef.current !== "running") return;
    cancelAnimationFrame(frame.current);
    switchPhase("paused");
    setScore(run.current.score);
  }

  function resume() {
    if (phaseRef.current !== "paused") return;
    lastTime.current = 0;
    switchPhase("running");
    arena.current?.focus({ preventScroll: true });
    frame.current = requestAnimationFrame(tick);
  }

  function jump() {
    if (phaseRef.current === "running") requestJump(run.current);
    else if (phaseRef.current === "paused") resume();
    else begin(true);
  }

  function key(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === " " || event.key === "ArrowUp") {
      event.preventDefault();
      if (!event.repeat) jump();
    }
    if (
      !event.repeat &&
      (event.key === "Escape" || event.key.toLowerCase() === "p")
    ) {
      if (phaseRef.current === "paused") resume();
      else pause();
    }
  }

  useEffect(() => {
    const element = arena.current;
    if (!element) return;
    try {
      const value = Number(localStorage.getItem(scoreKey));
      if (Number.isSafeInteger(value) && value > 0) setBest(value);
    } catch {}
    function measure() {
      if (!element) return;
      width.current = Math.max(
        250,
        Math.round(
          element.clientWidth * (250 / Math.max(1, element.clientHeight)),
        ),
      );
      view.current?.setAttribute("viewBox", `0 0 ${width.current} 250`);
      paint();
    }
    measure();
    const size = new ResizeObserver(measure);
    size.observe(element);
    const visible = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) pause();
      },
      { threshold: 0.1 },
    );
    visible.observe(element);
    function pageVisibility() {
      if (document.hidden) pause();
    }
    document.addEventListener("visibilitychange", pageVisibility);
    return () => {
      size.disconnect();
      visible.disconnect();
      cancelAnimationFrame(frame.current);
      document.removeEventListener("visibilitychange", pageVisibility);
    };
  }, []);

  return (
    <section
      className="game brownie-run"
      id="brownie-break"
      aria-labelledby="run-title"
    >
      <Drips className="section-drip bakery-edge" />
      <div className="game-copy">
        <p className="tag">The midnight bake</p>
        <h2 id="run-title">
          Boo’s <em>Brownie Break.</em>
        </h2>
        <p id="run-controls">
          Jump over baking tins and tangled wrappers. Catch crumbs for bonus
          points. Press Space or Up Arrow, or tap the bakery to jump.
        </p>
      </div>
      <div className="run-console" data-phase={phase}>
        <div className="run-readout">
          <span>
            Score <strong>{score}</strong>
          </span>
          <span>
            Best <strong>{Math.max(score, best)}</strong>
          </span>
        </div>
        <div
          className="run-arena"
          ref={arena}
          tabIndex={0}
          role="region"
          aria-label="Brownie Break playfield"
          aria-describedby="run-controls"
          onClick={jump}
          onKeyDown={key}
        >
          <Bakery />
          <svg
            className="run-actors"
            ref={view}
            viewBox="0 0 480 250"
            aria-hidden="true"
          >
            <path d="M0 202h3000v49H0z" fill="#412036" />
            <path
              d="M0 207h3000m-3000 32h3000"
              stroke="#eda1c4"
              strokeWidth="3"
            />
            <path
              ref={belt}
              d={Array.from(
                { length: 90 },
                (_, index) => `M${index * 34 - 12} 215l-10 16`,
              ).join(" ")}
              stroke="#89526f"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <ellipse
              ref={shadow}
              cx="99"
              cy="202"
              rx="22"
              ry="3"
              fill="#72254b"
              opacity=".7"
            />
            <g className="run-actor" ref={actor} transform="translate(65 141)">
              <foreignObject width="80" height="72">
                <Boo pose="runner" className="run-sprite" />
              </foreignObject>
            </g>
            {slots.map((id) => (
              <g
                key={id}
                ref={(element) => {
                  traps.current[id] = element;
                }}
                style={{ display: "none" }}
              >
                <Traps />
              </g>
            ))}
          </svg>
          <div className="run-message" role="status">
            {phase === "crash"
              ? "Boo hit a snag."
              : phase === "paused"
                ? "Taking a breather."
                : ""}
          </div>
        </div>
        <div className="run-buttons">
          {phase === "running" ? (
            <>
              <ActionButton
                className="action action-ink"
                type="button"
                onClick={jump}
              >
                Jump
              </ActionButton>
              <ActionButton
                className="run-pause ink-action"
                type="button"
                onClick={pause}
              >
                Pause
              </ActionButton>
            </>
          ) : (
            <ActionButton
              className="action action-ink"
              type="button"
              onClick={() => (phase === "paused" ? resume() : begin())}
            >
              {phase === "crash"
                ? "Run Again"
                : phase === "paused"
                  ? "Resume"
                  : "Run with Boo"}
            </ActionButton>
          )}
        </div>
      </div>
    </section>
  );
}
