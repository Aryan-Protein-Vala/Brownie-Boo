import type { Metadata } from "next";
import { LogoProofs } from "./logo-proofs";
import styles from "./logos.module.css";

export const metadata: Metadata = {
  title: "The Logo Taste Test",
  description: "Compare Brownie Boo! wordmark options with the current logo.",
};

export default function LogosPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <div>
          <p className={styles.kicker}>Brownie Boo! / Logo studio</p>
          <h1>The logo <em>taste test.</em></h1>
        </div>
        <p>Three new wordmarks for Brownie Boo! Pick one to see it next to the logo we use today.</p>
      </header>
      <LogoProofs />
    </div>
  );
}
