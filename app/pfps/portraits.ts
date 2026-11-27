import type { BooExpression } from "../../components/boo-face";

export const portraitSize = 1080;

export const portraits = {
  wink: { name: "Wink", color: "#f7b3d0", alt: "Boo winks and smiles on a pink background." },
  smile: { name: "Smile", color: "#ffdae7", alt: "Boo gives a small smile on a pale pink background." },
  cheeky: { name: "Cheeky", color: "#e8d5f3", alt: "Boo sticks out a tongue on a lilac background." },
  lovestruck: { name: "Lovestruck", color: "#f4a4c6", alt: "Boo has heart eyes on a rose pink background." },
  suspicious: { name: "Suspicious", color: "#e8c4c1", alt: "Boo squints with a question mark overhead on a dusty rose background." },
  shy: { name: "Shy", color: "#ffdae7", alt: "Boo looks down and blushes on a pale pink background." },
  grin: { name: "Grin", color: "#e8c4c1", alt: "Boo grins with eyes closed on a dusty rose background." },
  gasp: { name: "Gasp", color: "#e8d5f3", alt: "Boo gasps with wide eyes on a lilac background." },
  smirk: { name: "Smirk", color: "#f4a4c6", alt: "Boo raises an eyebrow on a rose pink background." },
  sleepy: { name: "Sleepy", color: "#e8d5f3", alt: "Boo yawns with closed eyes on a lilac background." },
  starry: { name: "Starry-eyed", color: "#ffdae7", alt: "Boo has star-shaped eyes on a pale pink background." },
  dizzy: { name: "Dizzy", color: "#f7b3d0", alt: "Boo has swirls for eyes on a pink background." },
  kiss: { name: "Kiss", color: "#e8c4c1", alt: "Boo blows a small heart-shaped kiss on a dusty rose background." },
} satisfies Record<BooExpression, { name: string; color: string; alt: string }>;
