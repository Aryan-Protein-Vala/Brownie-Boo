"use client";

import { ActionButton } from "./action";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { request } from "./store";

type Result = { ok: boolean; message?: string };
type Profile = { email: string; name: string };
type TrackingResult = {
  code: string;
  status: string;
  dispatch?: string;
  dispatchAt?: string;
  carrier?: string;
  trackingUrl?: string;
};

function Status({ value }: { value: Result | null }) {
  return (
    <p className="form-status" role="status" data-ok={value?.ok ?? false}>
      {value?.message ?? ""}
    </p>
  );
}

export function Waitlist({
  variant,
  topic = "early access",
  compact = false,
}: {
  variant?: string;
  topic?: string;
  compact?: boolean;
}) {
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const id = compact ? "club-email" : "waitlist-email";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    const response = await request("waitlist", {
      email: new FormData(form).get("email"),
      variant,
      topic,
    });
    setResult(
      response.ok
        ? {
            ...response,
            message: "You’re on the list. Good taste deserves a head start.",
          }
        : response,
    );
    if (response.ok) form.reset();
    setBusy(false);
  }
  return (
    <form onSubmit={submit} className={compact ? "club-form" : "customer-form"}>
      <label htmlFor={id}>Email address</label>
      <div className="email-row">
        <input
          id={id}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          maxLength={254}
        />
        <ActionButton
          type="submit"
          className="action action-ink"
          disabled={busy}
        >
          {busy
            ? "Joining…"
            : topic.startsWith("reservation interest:")
              ? "Register Interest"
              : topic.startsWith("restocks:")
                ? "Get Restock Updates"
                : "Get First Bite"}
        </ActionButton>
      </div>
      <p className="form-fine">
        Drop and restock updates from Brownie Boo.{" "}
        <a href="/privacy">Privacy</a>
      </p>
      <Status value={result} />
      <noscript>
        <p>Enable JavaScript to join the local preview waitlist.</p>
      </noscript>
    </form>
  );
}

function CustomerForm({
  action,
  mode,
  children,
  button,
  onData,
}: {
  action: string;
  mode?: string;
  children?: ReactNode;
  button: string;
  onData?: (data: unknown) => void;
}) {
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    setResult(null);
    const payload = Object.fromEntries(new FormData(form)) as Record<
      string,
      unknown
    >;
    if (mode) payload.mode = mode;
    const response = await request(action, payload);
    setResult(response);
    if (response.ok) {
      onData?.(response.data);
      if (action === "contact") form.reset();
    }
    setBusy(false);
  }
  return (
    <form className="customer-form" onSubmit={submit}>
      {children}
      <ActionButton type="submit" className="action action-ink" disabled={busy}>
        {busy ? "One moment…" : button}
      </ActionButton>
      <Status value={result} />
    </form>
  );
}

export function Contact() {
  return (
    <CustomerForm action="contact" button="Send your note">
      <label htmlFor="sender-name">Your name</label>
      <input
        id="sender-name"
        name="name"
        autoComplete="name"
        required
        maxLength={100}
      />
      <label htmlFor="sender-email">Email address</label>
      <input
        id="sender-email"
        type="email"
        name="email"
        autoComplete="email"
        required
        maxLength={254}
      />
      <label htmlFor="message">What’s on your mind?</label>
      <textarea
        id="message"
        name="message"
        rows={5}
        required
        maxLength={2400}
      />
    </CustomerForm>
  );
}

export function Track() {
  const [tracked, setTracked] = useState<TrackingResult | null>(null);
  return (
    <>
      <CustomerForm
        action="tracking"
        button="Find my order"
        onData={(data) => setTracked(data as TrackingResult)}
      >
        <label htmlFor="track-email">Order email</label>
        <input
          id="track-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          maxLength={254}
          onChange={() => setTracked(null)}
        />
        <label htmlFor="track-code">Order reference</label>
        <input
          id="track-code"
          name="code"
          required
          maxLength={60}
          onChange={() => setTracked(null)}
        />
      </CustomerForm>
      {tracked && (
        <section className="order-result">
          <h2>Order {tracked.code}</h2>
          <p>{tracked.status}</p>
          {(tracked.dispatch || tracked.dispatchAt) && (
            <p>Dispatch {tracked.dispatch || tracked.dispatchAt}</p>
          )}
          {tracked.carrier && <p>{tracked.carrier}</p>}
          {tracked.trackingUrl && (
            <a href={tracked.trackingUrl} rel="noreferrer">
              Track with the carrier
            </a>
          )}
        </section>
      )}
    </>
  );
}

export function Account() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [register, setRegister] = useState(false);
  useEffect(() => {
    let current = true;
    request<Profile>("account", { mode: "profile" }).then((response) => {
      if (current && response.data) setProfile(response.data);
    });
    return () => {
      current = false;
    };
  }, []);
  if (profile)
    return (
      <div className="account-profile">
        <h2>Hi, {profile.name}.</h2>
        <p>{profile.email}</p>
        <CustomerForm
          action="account"
          mode="logout"
          button="Sign out"
          onData={() => setProfile(null)}
        />
      </div>
    );
  return (
    <>
      <div className="segmented">
        <button
          type="button"
          aria-pressed={!register}
          onClick={() => setRegister(false)}
        >
          Sign in
        </button>
        <button
          type="button"
          aria-pressed={register}
          onClick={() => setRegister(true)}
        >
          Create account
        </button>
      </div>
      <CustomerForm
        key={String(register)}
        action="account"
        mode={register ? "register" : "login"}
        button={register ? "Create preview account" : "Sign in"}
        onData={(data) => setProfile(data as Profile)}
      >
        {register && (
          <>
            <label htmlFor="account-name">Your name</label>
            <input
              id="account-name"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
            />
          </>
        )}
        <label htmlFor="account-email">Email address</label>
        <input
          id="account-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          maxLength={254}
        />
        <label htmlFor="account-password">Password</label>
        <input
          id="account-password"
          name="password"
          type="password"
          autoComplete={register ? "new-password" : "current-password"}
          required
          minLength={register ? 10 : undefined}
          maxLength={128}
        />
        {register && (
          <p className="form-fine">
            Use a preview password of at least 10 characters.
          </p>
        )}
      </CustomerForm>
    </>
  );
}
