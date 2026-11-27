import type { Metadata } from "next";
import Image from "next/image";
import { Arrow } from "../../components/art";
import type { BooExpression } from "../../components/boo-face";
import { portraits, portraitSize } from "./portraits";
import styles from "./pfps.module.css";

export const metadata: Metadata = {
  title: "Boo Profile Pictures",
  description: "Download square Brownie Boo mascot profile pictures for Instagram and X.",
};

const featured = "wink";
const expressions = Object.keys(portraits) as BooExpression[];

function portraitUrl(expression: BooExpression) {
  return `/pfps/boo-${expression}.png`;
}

function Download({ expression }: { expression: BooExpression }) {
  return (
    <a className={styles.download} href={portraitUrl(expression)} download aria-label={`Download ${portraits[expression].name} PNG`}>
      Download PNG
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3q-1 5-.2 12m-4-4 3.9 4.4 4.7-4.7M4 17l.4 3.2q7 .9 15.4-.2l.1-3.1" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

export default function ProfilePicturesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.intro} aria-labelledby="pfps-title">
        <div className={styles.copy}>
          <p className={styles.kicker}>Boo’s profile pictures</p>
          <h1 id="pfps-title">Boo, in <em>{expressions.length} moods.</em></h1>
          <p>The same Boo from the homepage, ready for Instagram or X. Each PNG is <span className={styles.dimensions}>1080 × 1080</span> and framed for a circular crop.</p>
          <div className={styles.introLinks}>
            <a className={styles.galleryLink} href="#boo-moods">See more moods <Arrow /></a>
            <a className={styles.download} href="/pfps/brownie-boo-profile-pictures.zip" download>Download all (ZIP)</a>
          </div>
        </div>
        <figure className={styles.feature}>
          <Image
            src={portraitUrl(featured)}
            alt={portraits[featured].alt}
            width={portraitSize}
            height={portraitSize}
            unoptimized
            preload
            style={{ backgroundColor: portraits[featured].color }}
          />
          <figcaption className={styles.caption}>
            <Image src={portraitUrl(featured)} alt="" width={40} height={40} unoptimized className={styles.circle} />
            <div className={styles.featureLabel}>
              <strong>Wink</strong>
              <span>Profile crop</span>
            </div>
            <Download expression={featured} />
          </figcaption>
        </figure>
      </section>

      <section className={styles.gallery} id="boo-moods" aria-labelledby="moods-title">
        <h2 id="moods-title">Pick a mood.</h2>
        <ul className={styles.portraits}>
          {expressions.filter((expression) => expression !== featured).map((expression) => (
            <li key={expression}>
              <figure>
                <Image
                  src={portraitUrl(expression)}
                  alt={portraits[expression].alt}
                  width={portraitSize}
                  height={portraitSize}
                  unoptimized
                  style={{ backgroundColor: portraits[expression].color }}
                />
                <figcaption className={styles.caption}>
                  <strong>{portraits[expression].name}</strong>
                  <Download expression={expression} />
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
