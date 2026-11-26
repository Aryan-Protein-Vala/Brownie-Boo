"use client";

import { ActionButton } from "./action";
import { useState } from "react";
import {
  art,
  findProduct,
  packs,
  products,
  type CartLine,
  type Product,
} from "../lib/catalogue";
import { Arrow, Bag, Drips, SketchCount } from "./art";
import { SiteLink } from "./shell";
import { changeBag, useCart, request } from "./store";

export function ProductControls({
  product,
  initialGrams,
}: {
  product: Product;
  initialGrams: number;
}) {
  const [weight, setWeight] = useState(initialGrams);
  const [status, setStatus] = useState("");
  const pack = packs.find(({ grams }) => grams === weight) ?? packs[0];
  return (
    <div className="product-controls">
      <fieldset>
        <legend>Pick your portion</legend>
        <div className="weights">
          {packs.map(({ grams, name }) => (
            <label key={grams}>
              <input
                type="radio"
                name="pack"
                value={grams}
                checked={weight === grams}
                onChange={() => {
                  setWeight(grams);
                  setStatus("");
                }}
              />
              <span>
                {name}
                <strong>{grams} g</strong>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <p className="weight-note">
        {pack.note} <span>Grams are brownie weight.</span>
      </p>
      <ActionButton
        className="action action-ink"
        type="button"
        onClick={() =>
          setStatus(
            changeBag([{ slug: product.slug, grams: weight, quantity: 1 }])
              ? `${pack.name} is in your preview bag. Things are getting serious.`
              : "Your browser wouldn’t save the bag. Allow site storage and try again.",
          )
        }
      >
        Add to preview bag <Bag />
      </ActionButton>
      <p className="form-status" role="status">
        {status}
      </p>
      <SiteLink href="/cart" className="text-link">
        View bag <Arrow />
      </SiteLink>
    </div>
  );
}

type Choice = { slug: Product["slug"]; grams: number };
const initialChoices: Choice[] = [
  { slug: "original", grams: 50 },
  { slug: "double-trouble", grams: 50 },
  { slug: "boujee", grams: 50 },
];

export function BoxBuilder() {
  const [choices, setChoices] = useState<Choice[]>(initialChoices);
  const [message, setMessage] = useState("");
  function change(index: number, patch: Partial<Choice>) {
    setChoices(
      choices.map((choice, i) =>
        i === index ? { ...choice, ...patch } : choice,
      ),
    );
    setMessage("");
  }
  function addBox() {
    setMessage(
      changeBag(choices.map((choice) => ({ ...choice, quantity: 1 })))
        ? "All three Boos are in your preview bag. A very good group project."
        : "Your browser wouldn’t save the box. Allow site storage and try again.",
    );
  }

  return (
    <div className="builder">
      <Drips className="section-drip builder-edge" />
      <div className="builder-modes">
        <p>
          Three spots. Zero awkward casting calls. Pick a brownie for each spot
          or start with the First Bite Trio.
        </p>
        <button
          type="button"
          className="text-link"
          onClick={() => {
            setChoices(initialChoices);
            setMessage("The First Bite Trio is in. Everyone showed up.");
          }}
        >
          Load the First Bite Trio
        </button>
      </div>
      <ol className="builder-slots">
        {choices.map((choice, index) => {
          const product = findProduct(choice.slug) ?? products[0];
          return (
            <li key={index} className={`tint-${product.theme}`}>
              <img
                src={art(product.cut)}
                alt=""
                width="640"
                height="430"
                loading="lazy"
              />
              <div>
                <label htmlFor={`flavour-${index}`}>Brownie {index + 1}</label>
                <select
                  id={`flavour-${index}`}
                  value={choice.slug}
                  onChange={(event) =>
                    change(index, {
                      slug: event.target.value as Product["slug"],
                    })
                  }
                >
                  {products.map(({ slug, name }) => (
                    <option key={slug} value={slug}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`size-${index}`}>Pack size</label>
                <select
                  id={`size-${index}`}
                  value={choice.grams}
                  onChange={(event) =>
                    change(index, { grams: Number(event.target.value) })
                  }
                >
                  {packs.map(({ grams, name }) => (
                    <option key={grams} value={grams}>
                      {name} · {grams} g
                    </option>
                  ))}
                </select>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="builder-total">
        <ActionButton
          className="action action-ink"
          type="button"
          onClick={addBox}
        >
          Add box to preview bag <Bag />
        </ActionButton>
        <p aria-live="polite">{message}</p>
        <SiteLink href="/cart" className="text-link">
          View bag <Arrow />
        </SiteLink>
      </div>
    </div>
  );
}

function Line({
  line,
  onChange,
}: {
  line: CartLine;
  onChange: (amount: number) => void;
}) {
  const product = findProduct(line.slug);
  if (!product) return null;
  const pack = packs.find(({ grams }) => grams === line.grams);
  return (
    <li className="bag-line">
      <img src={art(product.cut)} alt="" width="105" height="88" />
      <div>
        <SiteLink href={`/shop/${product.slug}?size=${line.grams}`}>
          {product.name}
        </SiteLink>
        <p>
          {pack?.name} · {line.grams} g
        </p>
      </div>
      <div className="bag-quantity">
        <button
          aria-label={`Remove one ${product.name}, ${line.grams} grams`}
          type="button"
          onClick={() => onChange(-1)}
        >
          <SketchCount />
        </button>
        <span aria-label="Quantity">{line.quantity}</span>
        <button
          aria-label={`Add one ${product.name}, ${line.grams} grams`}
          type="button"
          onClick={() => onChange(1)}
        >
          <SketchCount plus />
        </button>
      </div>
      <button
        type="button"
        className="bare-button"
        onClick={() => onChange(-line.quantity)}
      >
        Remove
      </button>
    </li>
  );
}

export function Cart() {
  const items = useCart();
  const [error, setError] = useState("");
  return (
    <div className="cart">
      {items.length === 0 ? (
        <div className="cart-empty">
          <Bag />
          <h2>Your bag is just vibes right now.</h2>
          <SiteLink href="/shop" className="action action-ink">
            Meet the Boos
          </SiteLink>
        </div>
      ) : (
        <>
          <ul className="bag-list">
            {items.map((line) => (
              <Line
                key={`${line.slug}-${line.grams}`}
                line={line}
                onChange={(amount) => {
                  if (!changeBag([{ ...line, quantity: amount }]))
                    setError(
                      "Your browser wouldn’t update the bag. Allow site storage and try again.",
                    );
                }}
              />
            ))}
          </ul>
          <p aria-live="polite">{error}</p>
          <p className="form-fine">
            Your bag stays on this device. We’ll post prices and open ordering
            when the release is confirmed.
          </p>
          <SiteLink href="/checkout" className="action action-ink">
            View checkout
          </SiteLink>
        </>
      )}
    </div>
  );
}

export function Checkout() {
  const items = useCart();
  const [message, setMessage] = useState("");
  const [checking, setChecking] = useState(false);
  const count = items.reduce((sum, line) => sum + line.quantity, 0);
  return (
    <div className="checkout-note">
      <h2>
        {count
          ? `${count} brownie ${count === 1 ? "pack" : "packs"} in your preview bag`
          : "Your preview bag has an opening"}
      </h2>
      {count > 0 && (
        <ul>
          {items.map(({ slug, grams, quantity }) => (
            <li key={`${slug}-${grams}`}>
              {quantity} × {findProduct(slug)?.name} · {grams} g
            </li>
          ))}
        </ul>
      )}
      <p>
        Checkout opens when the brownies are ready to make and ship. Your picks
        can hang out in the bag meanwhile.
      </p>
      <SiteLink href="/early-access" className="action action-ink">
        Get First Bite
      </SiteLink>
      <SiteLink href="/cart" className="text-link">
        Back to your bag
      </SiteLink>
      <button
        type="button"
        className="bare-button checkout-check"
        disabled={checking}
        onClick={async () => {
          setChecking(true);
          const result = await request("checkout", {});
          setMessage(result.message ?? "Ordering is closed.");
          setChecking(false);
        }}
      >
        Check ordering status
      </button>
      <p className="form-status" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
