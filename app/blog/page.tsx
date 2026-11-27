import { Boo, Spark } from "../../components/art";
import { SiteLink } from "../../components/shell";
import { journalDescription, journalName, stories, storyPath } from "../../lib/journal";
import { publicMetadata } from "../../lib/search";
import s from "./journal.module.css";

const [feature, ...others] = stories;
export const metadata = publicMetadata({
  path: "/blog",
  title: "Protein Brownie Journal · The Crumb Files",
  description: journalDescription,
  image: "/art/the-break.webp",
});

export default function BlogPage() {
  return (
    <div className={s.journal}>
      <header className={s.masthead}>
        <div className={s.mastheadInner}>
          <div>
            <p className="tag">The Brownie Boo! journal</p>
            <h1>The Crumb <em>Files.</em></h1>
            <p>For the people who ask what’s in the brownie halfway through eating it.</p>
          </div>
          <div className={s.sticker} aria-hidden="true"><Boo expression="wink" /><Spark /></div>
        </div>
      </header>
      <section className={s.index} aria-label={journalName}>
        <article className={s.lead}>
          <figure>
            <img src={`/art/${feature.image.file}.webp`} alt={feature.image.alt} width={feature.image.width} height={feature.image.height} fetchPriority="high" />
            <figcaption>From the Brownie Boo concept kitchen</figcaption>
          </figure>
          <div className={s.leadCopy}>
            <p className="tag">{feature.category}</p>
            <h2><SiteLink href={storyPath(feature.slug)}>{feature.title}</SiteLink></h2>
            <p>{feature.teaser}</p>
            <SiteLink className="action action-ink" href={storyPath(feature.slug)} ariaLabel={`Read ${feature.title}`}>Read the story</SiteLink>
          </div>
        </article>
        <div className={s.indexTitle}><h2>More <em>crumbs.</em></h2><Spark /></div>
        <div className={s.storyList}>
          {others.map((story) => (
            <article className={s.storyCard} key={story.slug}>
              <img src={`/art/${story.image.file}.webp`} alt={story.image.alt} width={story.image.width} height={story.image.height} loading="lazy" />
              <div>
                <p className="tag">{story.category}</p>
                <h3><SiteLink href={storyPath(story.slug)}>{story.title}</SiteLink></h3>
                <p>{story.teaser}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
