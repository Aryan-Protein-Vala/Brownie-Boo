import { Boo } from "../components/art";
import { SiteLink } from "../components/shell";

export default function NotFound() {
  return (
    <section className="info-page tint-lilac">
      <div className="info-intro">
        <p className="tag">404</p>
        <h1>Well, that’s crumbs.</h1>
        <p>We found a trail of crumbs where that page should be. Suspicious.</p>
        <SiteLink className="action action-ink" href="/">
          Back to Brownie Boo!
        </SiteLink>
      </div>
      <Boo wink className="lost-boo" />
    </section>
  );
}
