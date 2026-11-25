"use client";

import { ActionButton } from "../components/action";
import { Boo } from "../components/art";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="info-page tint-lilac">
      <div className="info-intro">
        <h1>Oh, crumbs.</h1>
        <p>Something got a little sticky.</p>
        <ActionButton
          className="action action-ink"
          type="button"
          onClick={reset}
        >
          Try again
        </ActionButton>
      </div>
      <Boo className="lost-boo" />
    </section>
  );
}
