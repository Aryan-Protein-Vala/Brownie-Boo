import type { Metadata } from "next";
import { Cart } from "../../components/shop";

export const metadata: Metadata = { title: "Your Bag" };
export default function CartPage() {
  return (
    <section className="info-page tint-rose">
      <div className="info-intro">
        <h1>
          Your <em>boo bag.</em>
        </h1>
        <p>Very good company.</p>
      </div>
      <Cart />
    </section>
  );
}
