import type { Metadata } from "next";
import { LogoProofs } from "./logo-proofs";
import styles from "./logos.module.css";

export const metadata: Metadata = {
  title: "The Logo Taste Test",
  description: "Six new Brownie Boo! logo directions alongside the current wordmark.",
};

export default function LogosPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <div>
          <p className={styles.kicker}>Brownie Boo! / Brand study</p>
          <h1>The logo <em>taste test.</em></h1>
        </div>
        <p>Same brownie. Six ways to sign the wrapper. Pick one to see how it holds up against the logo we use today.</p>
      </header>
      <LogoProofs />
    </div>
  );
}
