import type { Metadata } from "next";
import { BoxBuilder } from "../../components/shop";
import { art } from "../../lib/catalogue";

export const metadata: Metadata = { title: "Build Your Boo Box" };

export default function Box() {
  return (
    <section className="box-page">
      <header className="box-page-intro">
        <div>
          <p className="tag">Build Your Boo Box</p>
          <h1>
            Seeing other Boos?
            <br />
            <em>Make it a trio.</em>
          </h1>
        </div>
        <img
          src={art("drop-1120")}
          alt="Three Brownie Boo wrapper concepts"
          width="1120"
          height="747"
        />
      </header>
      <BoxBuilder />
    </section>
  );
}
