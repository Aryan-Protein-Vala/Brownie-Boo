import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Admin } from "../../components/admin";
import { initializeAdminKey } from "../../lib/local-store";
import { hasLocalServices } from "../../lib/preview-mode";

export const metadata: Metadata = { title: "Staff Preview" };
export const dynamic = "force-dynamic";

export default function AdminPage() {
  if (!hasLocalServices) notFound();
  initializeAdminKey();
  return (
    <section className="admin">
      <h1>
        Behind the <em>break.</em>
      </h1>
      <p className="admin-copy">
        Local owner controls for draft pricing, scheduled batches, stock,
        discount codes and hero experiments. Checkout stays closed.
      </p>
      <Admin />
    </section>
  );
}
