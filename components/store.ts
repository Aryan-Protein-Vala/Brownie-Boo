"use client";

import { useSyncExternalStore } from "react";
import { findProduct, packs, type CartLine } from "../lib/catalogue";

const key = "brownie-boo-site-b-bag";
const empty: CartLine[] = [];
let previous: string | null | undefined;
let cached: CartLine[] = empty;

function getCart() {
  try {
    const stored = localStorage.getItem(key);
    if (stored === previous) return cached;
    previous = stored;
    const value: unknown = stored ? JSON.parse(stored) : [];
    cached = Array.isArray(value)
      ? value.filter(
          (line): line is CartLine =>
            line &&
            findProduct(line.slug) &&
            packs.some(({ grams }) => grams === line.grams) &&
            Number.isSafeInteger(line.quantity) &&
            line.quantity > 0,
        )
      : empty;
    return cached;
  } catch {
    cached = empty;
    return empty;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("boo-bag", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("boo-bag", callback);
    window.removeEventListener("storage", callback);
  };
}

export const useCart = () =>
  useSyncExternalStore(subscribe, getCart, () => empty);

function writeCart(lines: CartLine[]) {
  try {
    localStorage.setItem(key, JSON.stringify(lines));
    window.dispatchEvent(new Event("boo-bag"));
    return true;
  } catch {
    return false;
  }
}

export function changeBag(items: CartLine[]) {
  const map = new Map(
    getCart().map((line) => [`${line.slug}-${line.grams}`, line]),
  );
  for (const item of items) {
    const id = `${item.slug}-${item.grams}`;
    const existing = map.get(id);
    const quantity = (existing?.quantity ?? 0) + item.quantity;
    if (quantity > 0) map.set(id, { ...item, quantity });
    else map.delete(id);
  }
  return writeCart([...map.values()]);
}

export async function request<T>(
  action: string,
  data: Record<string, unknown>,
) {
  try {
    const response = await fetch(`/api/preview/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return (await response.json()) as {
      ok: boolean;
      message?: string;
      data?: T;
    };
  } catch {
    return {
      ok: false,
      message: "Couldn’t reach the local preview. Please try again.",
    };
  }
}
