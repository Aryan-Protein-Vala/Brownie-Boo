"use client";

import { ActionButton } from "./action";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { SketchField } from "./art";
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

function FormSubmitFields({ subject }: { subject: string }) {
  return (
    <>
      <input
        type="hidden"
        name="_subject"
        value={`Brownie Boo! — ${subject}`}
      />
      <input type="hidden" name="_template" value="table" />
    </>
  );
}

export function Waitlist({
  endpoint,
  variant,
  topic = "early access",
  compact = false,
}: {
  endpoint?: string;
  variant?: string;
  topic?: string;
  compact?: boolean;
}) {
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const id = compact ? "club-email" : "waitlist-email";
  const isDrop = topic.startsWith("reservation interest:");
  const isRestock = topic.startsWith("restocks:");
  const button = isDrop
    ? "Register Interest"
    : isRestock
      ? "Get Restock Updates"
      : "Get First Bite";
  const subject = isDrop
    ? "First batch interest"
    : isRestock
      ? "Restock sign-up"
      : "Boo Club sign-up";
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
            message: "You’re on the list. Brownie gossip looks good on you.",
          }
        : response,
    );
    if (response.ok) form.reset();
    setBusy(false);
  }
  return (
    <form
      action={endpoint}
      method="post"
      onSubmit={endpoint ? undefined : submit}
      className={compact ? "club-form" : "customer-form"}
    >
      {endpoint && (
        <>
          <FormSubmitFields subject={subject} />
          <input type="hidden" name="topic" value={topic} />
          {variant && <input type="hidden" name="campaign" value={variant} />}
        </>
      )}
      <label htmlFor={id}>Email address</label>
      <div className="email-row">
        <SketchField>
          <input
            id={id}
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="crumbs@example.com"
            maxLength={254}
          />
        </SketchField>
        <ActionButton
          type="submit"
          className="action action-ink"
          disabled={busy}
        >
          {busy ? "Joining…" : button}
        </ActionButton>
      </div>
      <p className="form-fine">
        Drop and restock news. Zero midnight “you up?” texts.{" "}
        <a href="/privacy">Privacy</a>
      </p>
      {!endpoint && (
        <>
          <Status value={result} />
          <noscript>
            <p>Turn on JavaScript to join the local preview waitlist.</p>
          </noscript>
        </>
      )}
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
    <form className="customer-form" method="post" onSubmit={submit}>
      {children}
      <ActionButton type="submit" className="action action-ink" disabled={busy}>
        {busy ? "Hang tight…" : button}
      </ActionButton>
      <Status value={result} />
    </form>
  );
}

export function Contact({ endpoint }: { endpoint?: string }) {
  const fields = (
    <>
      <label htmlFor="sender-name">Your name</label>
      <SketchField>
        <input
          id="sender-name"
          placeholder="Sam “Just One Bite” Patel"
          name="name"
          autoComplete="name"
          required
          maxLength={100}
        />
      </SketchField>
      <label htmlFor="sender-email">Email address</label>
      <SketchField>
        <input
          id="sender-email"
          placeholder="your.reply.to@example.com"
          type="email"
          name="email"
          autoComplete="email"
          required
          maxLength={254}
        />
      </SketchField>
      <label htmlFor="message">What’s on your mind?</label>
      <SketchField>
        <textarea
          id="message"
          placeholder="Dear Boo, I have a theory about corner pieces…"
          name="message"
          rows={5}
          required
          maxLength={2400}
        />
      </SketchField>
    </>
  );

  return endpoint ? (
    <form action={endpoint} method="post" className="customer-form">
      <FormSubmitFields subject="Contact message" />
      {fields}
      <ActionButton type="submit">Send it to Boo</ActionButton>
      <p className="form-fine">
        Leave an email so Boo can write back. <a href="/privacy">Privacy</a>
      </p>
    </form>
  ) : (
    <CustomerForm action="contact" button="Send it to Boo">
      {fields}
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
          placeholder="the.inbox.you.used@example.com"
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
          placeholder="The code from your confirmation"
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
        <h2>Look who’s back, {profile.name}.</h2>
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
        <ActionButton
          className="ink-action"
          type="button"
          aria-pressed={!register}
          onClick={() => setRegister(false)}
        >
          Sign in
        </ActionButton>
        <ActionButton
          className="ink-action"
          type="button"
          aria-pressed={register}
          onClick={() => setRegister(true)}
        >
          Create account
        </ActionButton>
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
              placeholder="What should Boo call you?"
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
          placeholder="snack.alias@example.com"
          name="email"
          type="email"
          autoComplete="username"
          required
          maxLength={254}
        />
        <label htmlFor="account-password">Password</label>
        <input
          id="account-password"
          placeholder={
            register
              ? "10+ characters. Make it weird."
              : "Your password goes here."
          }
          name="password"
          type="password"
          autoComplete={register ? "new-password" : "current-password"}
          required
          minLength={register ? 10 : undefined}
          maxLength={128}
        />
        {register && (
          <p className="form-fine">
            Use at least 10 characters. Save the good passwords for your real
            accounts.
          </p>
        )}
      </CustomerForm>
    </>
  );
}
