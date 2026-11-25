import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer, Header, RouteTransition } from "../components/shell";
import { SmoothScroll } from "../components/smooth-scroll";
import { brandTagline } from "../lib/brand";
import "lenis/dist/lenis.css";
import "./style.css";
import "./brand.css";
import "./ink-controls.css";
import "./sketch-surfaces.css";

export const metadata: Metadata = {
  title: {
    default: `Brownie Boo - ${brandTagline}`,
    template: "%s · Brownie Boo!",
  },
  description:
    "Life comes with enough drama. Meet Brownie Boo!’s chocolate brownies with protein and get first bite when a drop opens.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/bricolage.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/instrument-italic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <SmoothScroll />
        <RouteTransition>
          <Header />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </RouteTransition>
      </body>
    </html>
  );
}
