"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

let smoother: Lenis | undefined;

export function scrollToScene(target: number, immediate = false) {
  if (smoother) {
    smoother.scrollTo(target, {
      immediate,
      duration: 0.76,
      easing: (time) => 1 - (1 - time) ** 3,
    });
    if (immediate) ScrollTrigger.update();
  } else {
    window.scrollTo({
      top: target,
      behavior: immediate ? "instant" : "smooth",
    });
  }
}

export function SmoothScroll() {
  const path = usePathname();
  const instance = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.ticker.lagSmoothing(0);
    const preference = matchMedia("(prefers-reduced-motion: no-preference)");
    let clean = () => {};

    function configure() {
      clean();
      if (!preference.matches) return;

      const lenis = new Lenis({
        autoRaf: false,
        lerp: 0.105,
        smoothWheel: true,
        syncTouch: false,
        stopInertiaOnNavigate: true,
        prevent: (node) =>
          node instanceof HTMLElement &&
          node.hasAttribute("data-native-scroll"),
      });
      instance.current = lenis;
      smoother = lenis;
      const clock = (seconds: number) => lenis.raf(seconds * 1000);
      const stopListening = lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(clock);

      function followAnchor(event: MouseEvent) {
        if (
          event.defaultPrevented ||
          event.button ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        const anchor = (event.target as Element).closest<HTMLAnchorElement>(
          'a[href^="#"]',
        );
        const hash = anchor?.getAttribute("href");
        if (!hash || hash === "#main" || hash === "#") return;
        const destination = document.getElementById(hash.slice(1));
        if (!destination) return;
        event.preventDefault();
        if (location.hash !== hash) history.pushState(null, "", hash);
        const header =
          document.querySelector(".site-header")?.getBoundingClientRect()
            .height ?? 0;
        scrollToScene(
          scrollY + destination.getBoundingClientRect().top - header,
        );
        if (destination.hasAttribute("tabindex"))
          destination.focus({ preventScroll: true });
      }

      document.addEventListener("click", followAnchor);
      clean = () => {
        document.removeEventListener("click", followAnchor);
        stopListening();
        gsap.ticker.remove(clock);
        lenis.destroy();
        instance.current = null;
        if (smoother === lenis) smoother = undefined;
      };
    }
    configure();
    preference.addEventListener("change", configure);
    return () => {
      preference.removeEventListener("change", configure);
      clean();
    };
  }, []);

  useEffect(() => {
    const lenis = instance.current;
    if (lenis) lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [path]);

  return null;
}
