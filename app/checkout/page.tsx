import type { Metadata } from "next";
import { Checkout } from "../../components/shop";

export const metadata: Metadata = { title: "Checkout" };
export default function CheckoutPage() {
  return (
    <section className="info-page tint-lilac">
      <div className="info-intro">
        <p className="tag">Checkout</p>
        <h1>
          We’re still
          <br />
          <em>preheating.</em>
        </h1>
      </div>
      <Checkout />
    </section>
  );
}
