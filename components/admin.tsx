"use client";

import { ActionButton } from "./action";
import { useEffect, useState, type FormEvent } from "react";
import { packs, products, variants } from "../lib/catalogue";
import { request } from "./store";

type DraftDrop = {
  id: string;
  name: string;
  earlyAt: string;
  publicAt: string;
  dispatchAt: string;
  stock: Record<string, number>;
};
type Discount = { code: string; percent: number; active: boolean };
type Configuration = {
  weights: Record<string, number>;
  skuPrices: Record<string, number | null>;
  productFacts: Record<string, Record<string, string>>;
  drops: DraftDrop[];
  discounts: Discount[];
};
type Dashboard = {
  configuration: Configuration;
  analytics: {
    variant: string;
    assignments: number;
    impressions: number;
    clicks: number;
    signups: number;
  }[];
  waitlistCount: number;
  contactCount: number;
};

const skuRows = products.flatMap(({ slug, name }) =>
  packs.map(({ grams }) => ({
    id: `${slug}-${grams}`,
    name: `${name} · ${grams} g`,
  })),
);
const factFields = [
  ["ingredients", "Full ingredients"],
  ["nutrition", "Nutrition values"],
  ["allergenNotes", "Allergens and cross-contact"],
  ["storage", "Storage"],
  ["shelfLife", "Shelf life"],
  ["certifications", "Certifications"],
] as const;
const timeFields = [
  ["earlyAt", "Early access"],
  ["publicAt", "Public release"],
  ["dispatchAt", "Expected dispatch"],
] as const;

function localToIso(value: string) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "" : date.toISOString();
}

function isoToLocal(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return "";
  const local = new Date(date.valueOf() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

export function Admin() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [configuration, setConfiguration] = useState<Configuration | null>(
    null,
  );
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  function hydrate(value: Dashboard) {
    setDashboard(value);
    setConfiguration(value.configuration);
  }

  useEffect(() => {
    let live = true;
    request<Dashboard>("admin", { mode: "read" }).then((result) => {
      if (!live) return;
      if (result.data) hydrate(result.data);
      setReady(true);
    });
    return () => {
      live = false;
    };
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true);
    const result = await request<Dashboard>("admin", {
      mode: "login",
      password: data.get("password"),
    });
    if (result.data) hydrate(result.data);
    setStatus(result.message ?? "");
    setBusy(false);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setBusy(true);
    const result = await request<Dashboard>("admin", {
      mode: "save",
      configuration,
    });
    if (result.data) hydrate(result.data);
    setStatus(result.message ?? "");
    setBusy(false);
  }

  function updateDrop(index: number, patch: Partial<DraftDrop>) {
    setConfiguration(
      (value) =>
        value && {
          ...value,
          drops: value.drops.map((drop, i) =>
            i === index ? { ...drop, ...patch } : drop,
          ),
        },
    );
  }

  function updateDiscount(index: number, patch: Partial<Discount>) {
    setConfiguration(
      (value) =>
        value && {
          ...value,
          discounts: value.discounts.map((discount, i) =>
            i === index ? { ...discount, ...patch } : discount,
          ),
        },
    );
  }

  function appendDrop() {
    if (!configuration) return;
    let next = configuration.drops.length + 1;
    while (
      configuration.drops.some(
        ({ id }) => id === `drop-${String(next).padStart(3, "0")}`,
      )
    )
      next += 1;
    const number = String(next).padStart(3, "0");
    setConfiguration({
      ...configuration,
      drops: [
        ...configuration.drops,
        {
          id: `drop-${number}`,
          name: `Drop ${number}`,
          earlyAt: "",
          publicAt: "",
          dispatchAt: "",
          stock: {},
        },
      ],
    });
  }

  if (!ready)
    return (
      <p className="form-status" role="status">
        Opening the preview…
      </p>
    );
  if (!configuration || !dashboard)
    return (
      <form className="customer-form" onSubmit={login}>
        <label htmlFor="admin-pass">Owner key</label>
        <input
          id="admin-pass"
          required
          name="password"
          type="password"
          autoComplete="current-password"
        />
        <p className="form-fine">
          The local owner key is in .local/admin-password.txt, unless
          BOO_PREVIEW_ADMIN_PASSWORD is set.
        </p>
        <ActionButton
          className="action action-ink"
          type="submit"
          disabled={busy}
        >
          Unlock preview
        </ActionButton>
        <p className="form-status" role="status">
          {status}
        </p>
      </form>
    );

  return (
    <div className="admin-data">
      <div className="summary-counts">
        <span>{dashboard.waitlistCount} waitlist registrations</span>
        <span>{dashboard.contactCount} contact messages</span>
      </div>
      <form className="admin-form" onSubmit={save}>
        <section>
          <h2>Hero experiments</h2>
          <p>
            Set relative traffic weights. Zero pauses new assignments. Existing
            visitors keep their hero while its weight remains above zero.
          </p>
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Weight</th>
                  <th>Assigned</th>
                  <th>Seen</th>
                  <th>Clicks</th>
                  <th>Sign-ups</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((variant) => {
                  const points = dashboard.analytics.find(
                    ({ variant: id }) => id === variant.id,
                  );
                  return (
                    <tr key={variant.id}>
                      <th scope="row">
                        <a
                          className="text-link"
                          href={`/?hero=${variant.id}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {variant.id} · {variant.lead} {variant.tail}
                        </a>
                      </th>
                      <td>
                        <input
                          type="number"
                          min="0"
                          max="1000"
                          required
                          aria-label={`Variant ${variant.id} weight`}
                          value={configuration.weights[variant.id] ?? 0}
                          onChange={(event) =>
                            setConfiguration({
                              ...configuration,
                              weights: {
                                ...configuration.weights,
                                [variant.id]: Number(event.target.value),
                              },
                            })
                          }
                        />
                      </td>
                      <td>{points?.assignments ?? 0}</td>
                      <td>{points?.impressions ?? 0}</td>
                      <td>{points?.clicks ?? 0}</td>
                      <td>{points?.signups ?? 0}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2>Draft catalogue</h2>
          <p>
            Enter prices in minor currency units. Leave unknown prices blank.
          </p>
          <div className="admin-grid admin-dates">
            {skuRows.map(({ id, name }) => (
              <div key={id}>
                <label htmlFor={`price-${id}`}>{name}</label>
                <input
                  id={`price-${id}`}
                  type="number"
                  min="0"
                  max="1000000"
                  value={configuration.skuPrices[id] ?? ""}
                  onChange={(event) =>
                    setConfiguration({
                      ...configuration,
                      skuPrices: {
                        ...configuration.skuPrices,
                        [id]:
                          event.target.value === ""
                            ? null
                            : Number(event.target.value),
                      },
                    })
                  }
                />
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2>Draft product details</h2>
          <p>
            Record verified information here as it becomes available. These
            notes stay in the owner preview.
          </p>
          {products.map(({ slug, name }) => (
            <details className="admin-product" key={slug}>
              <summary>{name}</summary>
              <div className="admin-grid admin-dates">
                {factFields.map(([field, label]) => (
                  <div key={field}>
                    <label htmlFor={`fact-${slug}-${field}`}>{label}</label>
                    <textarea
                      id={`fact-${slug}-${field}`}
                      rows={3}
                      maxLength={2000}
                      value={configuration.productFacts[slug]?.[field] ?? ""}
                      onChange={(event) =>
                        setConfiguration({
                          ...configuration,
                          productFacts: {
                            ...configuration.productFacts,
                            [slug]: {
                              ...configuration.productFacts[slug],
                              [field]: event.target.value,
                            },
                          },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </details>
          ))}
        </section>
        <section>
          <h2>Scheduled batches</h2>
          <p>
            Dates use your device timezone. Stock quantities stay in this owner
            view.
          </p>
          {configuration.drops.map((drop, i) => (
            <fieldset key={drop.id}>
              <legend>{drop.id}</legend>
              <label htmlFor={`name-${drop.id}`}>Batch name</label>
              <input
                id={`name-${drop.id}`}
                value={drop.name}
                maxLength={96}
                required
                onChange={(event) =>
                  updateDrop(i, { name: event.target.value })
                }
              />
              <div className="admin-grid admin-dates">
                {timeFields.map(([field, label]) => (
                  <div key={field}>
                    <label htmlFor={`${field}-${drop.id}`}>{label}</label>
                    <input
                      id={`${field}-${drop.id}`}
                      type="datetime-local"
                      value={isoToLocal(drop[field])}
                      onChange={(event) =>
                        updateDrop(i, {
                          [field]: localToIso(event.target.value),
                        })
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="admin-grid">
                {skuRows.map(({ id, name }) => (
                  <div key={id}>
                    <label htmlFor={`${drop.id}-${id}`}>{name} stock</label>
                    <input
                      id={`${drop.id}-${id}`}
                      type="number"
                      min="0"
                      max="1000000"
                      value={drop.stock[id] ?? ""}
                      onChange={(event) => {
                        const stock = { ...drop.stock };
                        if (event.target.value === "") delete stock[id];
                        else stock[id] = Number(event.target.value);
                        updateDrop(i, { stock });
                      }}
                    />
                  </div>
                ))}
              </div>
              <button
                className="bare-button"
                type="button"
                onClick={() =>
                  setConfiguration({
                    ...configuration,
                    drops: configuration.drops.filter(
                      (_, index) => index !== i,
                    ),
                  })
                }
              >
                Remove {drop.id}
              </button>
            </fieldset>
          ))}
          <button
            type="button"
            className="text-link add-row"
            onClick={appendDrop}
          >
            Add a draft batch
          </button>
        </section>
        <section>
          <h2>Discount codes</h2>
          <p>Save codes for later approval.</p>
          {configuration.discounts.map((discount, i) => (
            <fieldset key={i}>
              <legend>Discount {i + 1}</legend>
              <div className="admin-grid">
                <div>
                  <label htmlFor={`code-${i}`}>Code</label>
                  <input
                    id={`code-${i}`}
                    value={discount.code}
                    maxLength={32}
                    required
                    onChange={(event) =>
                      updateDiscount(i, { code: event.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor={`percent-${i}`}>Percent</label>
                  <input
                    id={`percent-${i}`}
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={discount.percent}
                    onChange={(event) =>
                      updateDiscount(i, { percent: Number(event.target.value) })
                    }
                  />
                </div>
                <div className="admin-inline">
                  <input
                    id={`active-${i}`}
                    type="checkbox"
                    checked={discount.active}
                    onChange={(event) =>
                      updateDiscount(i, { active: event.target.checked })
                    }
                  />
                  <label htmlFor={`active-${i}`}>Active in draft</label>
                </div>
              </div>
              <button
                className="bare-button"
                type="button"
                onClick={() =>
                  setConfiguration({
                    ...configuration,
                    discounts: configuration.discounts.filter(
                      (_, index) => index !== i,
                    ),
                  })
                }
              >
                Remove code
              </button>
            </fieldset>
          ))}
          <button
            className="text-link add-row"
            type="button"
            onClick={() =>
              setConfiguration({
                ...configuration,
                discounts: [
                  ...configuration.discounts,
                  { code: "", percent: 10, active: false },
                ],
              })
            }
          >
            Add a draft code
          </button>
        </section>
        <div className="admin-button-row">
          <ActionButton
            className="action action-ink"
            type="submit"
            disabled={busy}
          >
            Save configuration
          </ActionButton>
          <button
            className="bare-button"
            type="button"
            onClick={async () => {
              const result = await request("admin", { mode: "logout" });
              if (result.ok) {
                setConfiguration(null);
                setDashboard(null);
              }
              setStatus(result.message ?? "");
            }}
          >
            Lock preview
          </button>
        </div>
        <p className="form-status" role="status">
          {status}
        </p>
      </form>
    </div>
  );
}
