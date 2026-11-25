import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Arrow } from "./art";

export function ActionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="ink-label">
      <span>{children}</span>
      <Arrow />
    </span>
  );
}

export function ActionButton({
  children,
  className = "action action-ink",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={className} {...props}>
      <ActionLabel>{children}</ActionLabel>
    </button>
  );
}
