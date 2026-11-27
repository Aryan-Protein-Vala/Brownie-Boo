import { Boo, Spark, Wordmark } from "../../components/art";
import { campaigns, slideUrl } from "./campaigns";
import styles from "./marketing.module.css";

type Campaign = (typeof campaigns)[number];

function Lines({ text }: { text: string }) {
  return text.split("\n").map((line) => <span key={line}>{line}</span>);
}

export function PostArt({
  campaign,
  index,
  featured = false,
}: {
  campaign: Campaign;
  index: number;
  featured?: boolean;
}) {
  const { label, title, punch, photo, prop, boo } = campaign.slides[index];
  const final = index === campaign.slides.length - 1;
  return (
    <div
      className={styles.art}
      data-theme={campaign.slug}
      data-photo={Boolean(photo)}
      data-final={final}
      data-export={featured ? undefined : slideUrl(campaign.slug, index)}
      role="img"
      aria-label={campaign.alt[index]}
    >
      <div className={styles.sheet} aria-hidden="true">
        {photo && (
          <img
            className={styles.artPhoto}
            src={`/art/${photo}.webp`}
            alt=""
            loading={featured ? "eager" : "lazy"}
            fetchPriority={featured ? "high" : undefined}
            decoding="async"
          />
        )}
        <div className={styles.artTop}>
          <span>{label}</span>
          {campaign.slides.length > 1 && <span>{index + 1}/{campaign.slides.length}</span>}
        </div>
        <div className={styles.artHeadline}>
          <strong><Lines text={title} /></strong>
          <em><Lines text={punch} /></em>
        </div>
        <div className={styles.artScene}>
          <div className={styles.prop}>
            <span>{prop.label}</span>
            {prop.lines.map((line) => <strong key={line}>{line}</strong>)}
            {prop.stamp && <em>{prop.stamp}</em>}
          </div>
          {photo ? <Spark className={styles.artSpark} /> : <Boo expression={boo ?? (final ? "wink" : "smile")} className={styles.artBoo} />}
        </div>
        <div className={styles.artBottom}>
          <Wordmark />
          <span>@browniebooclub</span>
        </div>
      </div>
    </div>
  );
}
