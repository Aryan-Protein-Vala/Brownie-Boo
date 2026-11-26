import type { Metadata } from "next";
import { LogoProofs } from "./logo-proofs";
import styles from "./logos.module.css";

export const metadata: Metadata = {
  title: "The Logo Taste Test",
  description: "Custom-lettered and animated Brownie Boo! logo studies alongside the current wordmark.",
};

export default function LogosPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <div>
          <p className={styles.kicker}>Brownie Boo! / Logo studio</p>
          <h1>The logo <em>taste test.</em></h1>
        </div>
        <p>Four new marks for the wrapper. Pick a design, play its motion where available, and see it next to the logo we use today.</p>
      </header>
      <LogoProofs />
    </div>
  );
}
