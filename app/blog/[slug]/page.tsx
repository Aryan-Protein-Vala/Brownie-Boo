import { notFound } from "next/navigation";
import { Spark } from "../../../components/art";
import { JsonLd } from "../../../components/json-ld";
import { SiteLink } from "../../../components/shell";
import { findStory, journalAuthor, journalDate, journalName, stories, storyPath } from "../../../lib/journal";
import { organization, publicMetadata, publicOrigin } from "../../../lib/search";
import s from "../journal.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return stories.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const story = findStory((await params).slug);
  if (!story) notFound();
  return publicMetadata({
    path: storyPath(story.slug),
    title: story.title,
    description: story.teaser,
    image: `/art/${story.image.file}.webp`,
    publishedTime: journalDate,
  });
}

export default async function StoryPage({ params }: Props) {
  const story = findStory((await params).slug);
  if (!story) notFound();
  const { slug, title, answer, image, sections, links, sources } = story;
  const imagePath = `/art/${image.file}.webp`;
  const canonical = publicOrigin && new URL(storyPath(slug), publicOrigin).href;
  return (
    <article className={s.article}>
      {canonical && organization && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              "@id": `${canonical}#article`,
              mainEntityOfPage: canonical,
              headline: title,
              description: story.teaser,
              image: new URL(imagePath, canonical).href,
              datePublished: journalDate,
              inLanguage: "en-IN",
              author: organization,
              publisher: { "@id": organization["@id"] },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Brownie Boo!", item: publicOrigin },
                { "@type": "ListItem", position: 2, name: journalName, item: `${publicOrigin}/blog` },
                { "@type": "ListItem", position: 3, name: title, item: canonical },
              ],
            },
          ],
        }} />
      )}
      <header className={s.articleHeader}>
        <nav aria-label="Breadcrumb"><SiteLink href="/">Home</SiteLink><span aria-hidden="true">/</span><SiteLink href="/blog">{journalName}</SiteLink></nav>
        <p className="tag">{story.category}</p>
        <h1>{title}</h1>
        <p className={s.byline}>By <SiteLink href="/our-story">{journalAuthor}</SiteLink><span>·</span><time dateTime={journalDate}>27 November 2026</time></p>
      </header>
      <div className={s.articleGrid}>
        <p className={s.answer}>{answer}</p>
        <aside className={s.margin} aria-label="In this story">
          <figure><img src={imagePath} alt={image.alt} width={image.width} height={image.height} /><figcaption>Brownie Boo! · Concept art</figcaption></figure>
          <p className="tag">In this story</p>
          <ul>{sections.map(({ id, heading }) => <li key={id}><a href={`#${id}`}>{heading}</a></li>)}</ul>
        </aside>
        <div className={s.reading}>
          {sections.map(({ id, heading, paragraphs, table }) => (
            <section className={s.articleSection} key={id} aria-labelledby={id}>
              <h2 id={id} tabIndex={-1}>{heading}</h2>
              {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {table && (
                <div className={s.tableWrap}>
                  <table>
                    <caption>{table.caption}</caption>
                    <thead><tr>{table.headers.map((text) => <th key={text} scope="col">{text}</th>)}</tr></thead>
                    <tbody>{table.rows.map(([label, ...cells]) => (
                      <tr key={label}><th scope="row">{label}</th>{cells.map((text, index) => <td key={table.headers[index + 1]}>{text}</td>)}</tr>
                    ))}</tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
          {sources && <section className={s.sources} aria-labelledby="article-sources">
            <h2 id="article-sources">Sources</h2>
            <ul>{sources.map(({ label, href }) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
          </section>}
        </div>
      </div>
      <section className={s.related} aria-labelledby="related-stories">
        <div><Spark /><h2 id="related-stories">Still <em>hungry?</em></h2></div>
        <ul>{links.map(({ label, href }) => <li key={href}><SiteLink href={href}>{label}</SiteLink></li>)}</ul>
      </section>
    </article>
  );
}
