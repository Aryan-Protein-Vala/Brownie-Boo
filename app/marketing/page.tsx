import { publicMetadata } from "../../lib/search";
import { Boo, Spark } from "../../components/art";
import { ActionLabel } from "../../components/action";
import { SiteLink } from "../../components/shell";
import { artHeight, artWidth, campaignPack, campaigns, slideUrl } from "./campaigns";
import { Carousel, DownloadMark } from "./carousel";
import { SecondCollection } from "./second-collection";
import { PostArt } from "./post-art";
import styles from "./marketing.module.css";

export const metadata = publicMetadata({
  path: "/marketing",
  title: "Apple-to-Orange Marketing",
  description: "Explore Brownie Boo’s Apple-to-Orange campaigns, from India’s everyday group chat dramas to brownie punchlines, with image and carousel downloads.",
  image: "/marketing/last-corner-01.png",
});

const featuredCampaign = campaigns[0];

export default function MarketingPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="marketing-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><Spark /> Apple-to-Orange Marketing</p>
            <h1 id="marketing-title">
              <span>Everyday drama.</span>
              <em>Chocolate<br className={styles.heroBreak} /> plot twist.</em>
            </h1>
            <p className={styles.intro}>
              The 5:59 call. The wedding interrogation. The paneer thief.
              Boo has a brownie for all of it.
            </p>
            <div className={styles.heroActions}>
              <a className="action action-ink" href="#campaigns">
                <ActionLabel>Browse the posts</ActionLabel>
              </a>
              <a className={styles.packLink} href="#more-posts">See what’s new</a>
              <a className={styles.packLink} href={campaignPack} download>
                <DownloadMark /> Download the pack
              </a>
            </div>
          </div>
          <figure className={styles.feature}>
            <div className={styles.featureStack}>
              <span className={styles.backPrint} aria-hidden="true" />
              <div className={styles.featurePrint}>
                <PostArt campaign={featuredCampaign} index={0} featured />
              </div>
              <span className={styles.featureSticker} aria-hidden="true"><Boo wink /></span>
            </div>
            <figcaption>
              <a href="#quick-call">The 5:59 meeting</a>
              <span>4-slide carousel</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.gallery} aria-labelledby="campaigns">
        <div className={styles.galleryIntro}>
          <div>
            <p className="tag">The Brownie Boo! feed</p>
            <h2 id="campaigns" tabIndex={-1}>Send this to <em>someone.</em></h2>
          </div>
          <p>Six posts for the group chat, with captions and {artWidth} × {artHeight} PNGs.</p>
        </div>
        <div className={styles.grid}>
          {campaigns.map((campaign) => (
            <article className={styles.campaign} id={campaign.slug} key={campaign.slug} aria-labelledby={`${campaign.slug}-title`}>
              <header className={styles.cardHeader}>
                <p className="tag">{campaign.topic}</p>
                <h3 id={`${campaign.slug}-title`}>{campaign.name}</h3>
              </header>
              <Carousel slug={campaign.slug} name={campaign.name} count={campaign.slides.length}>
                {campaign.slides.map((slide, index) => (
                  <li key={slide.title}>
                    <PostArt campaign={campaign} index={index} />
                  </li>
                ))}
              </Carousel>
              <details className={styles.details}>
                <summary>Caption &amp; concept <span aria-hidden="true" /></summary>
                <div className={styles.detailBody}>
                  <p className={styles.caption}>{campaign.caption}</p>
                  <dl>
                    <dt>Apple <span>· The situation</span></dt>
                    <dd>{campaign.apple}</dd>
                    <dt>Orange <span>· The brownie twist</span></dt>
                    <dd>{campaign.orange}</dd>
                  </dl>
                  {campaign.slides.length > 1 && (
                    <ul className={styles.slideLinks} aria-label="Slide downloads">
                      {campaign.slides.map((slide, index) => (
                        <li key={slide.title}>
                          <a href={slideUrl(campaign.slug, index)} download>Slide {index + 1}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
            </article>
          ))}
        </div>
      </section>

      <SecondCollection />

      <section className={styles.club} aria-labelledby="marketing-club">
        <Spark className={styles.clubSpark} />
        <div>
          <p className="tag">The Boo Club</p>
          <h2 id="marketing-club">Here for <em>the brownie?</em></h2>
        </div>
        <SiteLink className="action action-pink" href="/early-access">
          Get first-batch updates
        </SiteLink>
      </section>
    </div>
  );
}
