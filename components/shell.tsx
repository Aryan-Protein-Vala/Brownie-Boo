"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { Arrow, Bag, Boo, Drips, MenuMark, Wordmark } from "./art";
import { ExpressiveBoo } from "./expressive-boo";
import { brandTagline } from "../lib/brand";
import { ActionLabel } from "./action";
import { useCart } from "./store";

const nav = [
  ["/shop", "The Boos"],
  ["/drops", "The Drop"],
  ["/build-a-box", "Build a Box"],
  ["/our-story", "Our Story"],
  ["/blog", "Journal"],
] as const;

export function RouteTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigating = useRef(false);

  useEffect(() => {
    const panel = curtain.current;
    if (!panel || !navigating.current) return;
    if (exitTimer.current) clearTimeout(exitTimer.current);
    panel.dataset.state = "leaving";
    navigating.current = false;
    exitTimer.current = setTimeout(() => {
      delete panel.dataset.state;
    }, 680);
  }, [path]);

  useEffect(
    () => () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
      if (startTimer.current) clearTimeout(startTimer.current);
    },
    [],
  );

  function go(event: MouseEvent<HTMLDivElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
      "a[data-curtain]",
    );
    if (
      !anchor ||
      anchor.target ||
      anchor.origin !== location.origin ||
      anchor.pathname === location.pathname ||
      anchor.hash ||
      !curtain.current ||
      navigating.current
    )
      return;
    event.preventDefault();
    if (exitTimer.current) clearTimeout(exitTimer.current);
    const panel = curtain.current;
    navigating.current = true;
    panel.dataset.state = "entering";
    startTimer.current = setTimeout(
      () => router.push(anchor.pathname + anchor.search),
      320,
    );
    exitTimer.current = setTimeout(() => {
      panel.dataset.state = "leaving";
      navigating.current = false;
      exitTimer.current = setTimeout(() => {
        delete panel.dataset.state;
      }, 670);
    }, 1800);
  }

  return (
    <div onClickCapture={go}>
      {children}
      <div className="curtain" ref={curtain} aria-hidden="true">
        <span className="transition-type">boo!</span>
        <Drips className="curtain-wave curtain-wave--bottom" />
        <Drips className="curtain-wave curtain-wave--top" />
      </div>
    </div>
  );
}

export function SiteLink({
  href,
  children,
  className,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <Link
      href={href}
      prefetch={href === "/" ? false : undefined}
      data-curtain=""
      className={className}
      aria-label={ariaLabel}
    >
      {className
        ?.split(/\s+/)
        .some((name) => name === "action" || name === "ink-action") ? (
        <ActionLabel>{children}</ActionLabel>
      ) : (
        children
      )}
    </Link>
  );
}

export function Header() {
  const path = usePathname();
  const lines = useCart();
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialog.current?.open) dialog.current.close();
  }, [path]);

  function showMenu() {
    dialog.current?.showModal();
    setOpen(true);
  }
  function closeMenu() {
    dialog.current?.close();
  }
  function menuClosed() {
    setOpen(false);
    trigger.current?.focus();
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <SiteLink
            href="/"
            className="home-link"
            ariaLabel="Brownie Boo! home"
          >
            <Wordmark displayType />
          </SiteLink>
          <Link
            className="head-shop"
            href="/shop"
            data-curtain=""
            aria-current={path.startsWith("/shop") ? "page" : undefined}
          >
            Shop <Arrow />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.map(([href, title]) => (
              <Link
                key={href}
                href={href}
                data-curtain=""
                aria-current={
                  (href === "/shop" ? path.startsWith(href) : path === href)
                    ? "page"
                    : undefined
                }
                className={href === "/shop" ? "nav-shop" : "nav-link"}
              >
                {href === "/shop" ? (
                  <>
                    Shop <Arrow />
                  </>
                ) : (
                  title
                )}
              </Link>
            ))}
          </nav>
          <div className="head-actions">
            <SiteLink className="head-club ink-action" href="/early-access">
              Boo Club
            </SiteLink>
            <SiteLink
              className="head-bag"
              href="/cart"
              ariaLabel={`Bag, ${count} items`}
            >
              <Bag />
              <span>{count}</span>
            </SiteLink>
            <button
              className="menu-button"
              onClick={showMenu}
              ref={trigger}
              aria-expanded={open}
              aria-controls="boos-menu"
            >
              <MenuMark /> <span>Menu</span>
            </button>
          </div>
        </div>
      </header>
      <noscript>
        <nav className="mobile-fallback" aria-label="Main navigation">
          {[...nav, ["/early-access", "Boo Club"]].map(([href, name]) => (
            <a href={href} key={href}>
              {name}
            </a>
          ))}
        </nav>
      </noscript>
      <dialog
        data-native-scroll
        id="boos-menu"
        className="mobile-menu"
        ref={dialog}
        onClose={menuClosed}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
        aria-label="Main menu"
      >
        <div className="mobile-menu-inner">
          <div className="mobile-menu-top">
            <SiteLink href="/" ariaLabel="Brownie Boo! home">
              <Wordmark displayType />
            </SiteLink>
            <button onClick={closeMenu}>
              Close <MenuMark close />
            </button>
          </div>
          <nav
            aria-label="Main navigation"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a")) closeMenu();
            }}
          >
            {[...nav, ["/early-access", "Boo Club"]].map(([href, name]) => (
              <SiteLink key={href} href={href}>
                <span>{name}</span>
                <Arrow />
              </SiteLink>
            ))}
          </nav>
          <Boo wink className="menu-boo" />
        </div>
      </dialog>
    </>
  );
}

const footerGroups = [
  {
    title: "The good stuff",
    links: [
      ["/shop", "Shop All"],
      ["/drops", "Upcoming Drops"],
      ["/build-a-box", "Build Your Boo Box"],
      ["/our-story", "Our Story"],
      ["/marketing", "Marketing"],
      ["/blog", "The Crumb Files"],
    ],
  },
  {
    title: "The receipts",
    links: [
      ["/ingredients", "Ingredients & Nutrition"],
      ["/faq", "FAQ"],
      ["/contact", "Contact"],
      ["/account", "Account"],
      ["/track", "Track an Order"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <Drips className="section-drip footer-edge" />
      <div className="foot-top">
        <div className="foot-intro">
          <div className="foot-mascot">
            <ExpressiveBoo />
            <p>
              “Hi. I’m Boo.
              <br />I have crumbs in my pockets.”
            </p>
          </div>
          <SiteLink className="foot-club ink-action" href="/early-access">
            Get First Bite
          </SiteLink>
        </div>
        <nav className="foot-nav" aria-label="Footer navigation">
          {footerGroups.map(({ title, links }) => (
            <div key={title}>
              <p className="foot-label">{title}</p>
              <ul>
                {links.map(([href, label]) => (
                  <li key={href}>
                    <SiteLink href={href}>{label}</SiteLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="foot-word">
        <Wordmark />
        <p className="foot-tagline">{brandTagline}</p>
      </div>
      <div className="foot-bottom">
        <span>© {new Date().getFullYear()} Brownie Boo!</span>
        <nav aria-label="Policies">
          <SiteLink href="/privacy">Privacy</SiteLink>
          <SiteLink href="/terms">Terms</SiteLink>
          <SiteLink href="/shipping">Shipping &amp; Refunds</SiteLink>
        </nav>
      </div>
    </footer>
  );
}
