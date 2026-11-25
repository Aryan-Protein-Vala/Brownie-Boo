import { Boo } from "../components/art";
import { SiteLink } from "../components/shell";

export default function NotFound() {
  return (
    <section className="info-page tint-lilac">
      <div className="info-intro">
        <p className="tag">404</p>
        <h1>All crumbs.</h1>
        <p>Boo may have eaten this page.</p>
        <SiteLink className="action action-ink" href="/">
          Back to Brownie Boo!
        </SiteLink>
      </div>
      <Boo wink className="lost-boo" />
    </section>
  );
}
