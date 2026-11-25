export const packs = [
  { grams: 50, name: "Lil’ Boo", note: "For a quick little rendezvous." },
  { grams: 200, name: "Big Boo", note: "For sharing, allegedly." },
  { grams: 250, name: "Absolute Boo", note: "Things are getting serious." },
] as const;

export const products = [
  {
    slug: "original",
    name: "The Original Boo",
    split: ["The Original", "Boo."],
    blurb: "Your most reliable desk drawer colleague.",
    description:
      "The meeting ran over. The bus didn’t show. At least the chocolate is here. This is the everyday Boo, with soy and peanut proteins.",
    ingredients: "Soy protein and peanut protein",
    allergens: "Soy and peanuts",
    wrapper: "original-960",
    cut: "original-cut-640",
    theme: "rose",
  },
  {
    slug: "double-trouble",
    name: "Double Trouble",
    split: ["Double", "Trouble."],
    blurb: "For days that came with a sequel.",
    description:
      "One crisis meeting is plenty. Three protein sources, on the other hand, work very nicely in a chocolate brownie.",
    ingredients: "Soy protein, whey protein and peanut protein",
    allergens: "Soy, milk and peanuts",
    wrapper: "double-960",
    cut: "double-cut-640",
    theme: "lilac",
  },
  {
    slug: "boujee",
    name: "Boujee Boo",
    split: ["Boujee", "Boo."],
    blurb: "All dressed up for a Tuesday.",
    description:
      "All the drama of a velvet rope, right there in your hand. Our richest chocolate character with whey and milk proteins.",
    ingredients: "Whey protein and milk protein",
    allergens: "Milk",
    wrapper: "deluxe-960",
    cut: "deluxe-cut-640",
    theme: "mocha",
  },
] as const;

export type Product = (typeof products)[number];
export type CartLine = {
  slug: Product["slug"];
  grams: number;
  quantity: number;
};
export const findProduct = (slug: string) =>
  products.find((product) => product.slug === slug);
export const art = (name: string) => `/art/${name}.webp`;

export const variants = [
  {
    id: "A",
    lead: "Bro, protein isn’t",
    tail: "a personality.",
    support:
      "Put the shaker down. We made you a chocolate brownie with protein.",
    action: "Meet the Boos",
    href: "/shop",
  },
  {
    id: "B",
    lead: "You’ve got enough",
    tail: "problems.",
    support:
      "Protein shouldn’t be one. Here’s a chocolate brownie you can grab and go.",
    action: "Get First Bite",
    href: "/early-access",
  },
  {
    id: "C",
    lead: "Group project?",
    tail: "Solo brownie.",
    support:
      "No one replied to the group chat. At least you brought chocolate and protein.",
    action: "Meet the Boos",
    href: "/shop",
  },
  {
    id: "D",
    lead: "This meeting could’ve",
    tail: "been a brownie.",
    support:
      "Your 9-to-5 just got a cheat code. Chocolate and protein for your desk drawer.",
    action: "Shop the Good Stuff",
    href: "/shop",
  },
  {
    id: "E",
    lead: "Chocolate first.",
    tail: "Protein plot twist.",
    support:
      "Life comes with enough drama. Here’s a chocolate brownie with a heck of a lot of protein.",
    action: "Meet the Boos",
    href: "/shop",
  },
  {
    id: "F",
    lead: "Emotionally unavailable.",
    tail: "Nutritionally interesting.",
    support:
      "A chocolate brownie with protein is ready when you are. What a concept.",
    action: "Catch the Drop",
    href: "/drops",
  },
  {
    id: "G",
    lead: "Red flags?",
    tail: "Read the ingredients.",
    support:
      "Three chocolate brownies, three protein blends, and an ingredient list you can actually ask about.",
    action: "See What’s Inside",
    href: "/ingredients",
  },
  {
    id: "H",
    lead: "A manifesto you can",
    tail: "actually digest.",
    support: "Our platform is simple. Chocolate brownies, with protein.",
    action: "Shop the Good Stuff",
    href: "/shop",
  },
  {
    id: "I",
    lead: "Less drama.",
    tail: "More chocolate.",
    support:
      "The group chat is on fire again. Take a brownie break. It comes with protein.",
    action: "I Want a Bite",
    href: "/early-access",
  },
  {
    id: "J",
    lead: "Boujee taste.",
    tail: "Zero velvet ropes.",
    support:
      "A chocolate brownie with protein that treats your Tuesday like an occasion.",
    action: "Meet the Boos",
    href: "/shop",
  },
] as const;

export const questions = [
  [
    "How much protein does each brownie contain?",
    "We’ll publish verified nutrition for each formulation and pack before orders open. The 50 g, 200 g and 250 g labels refer to finished product weight.",
  ],
  [
    "What’s the difference between the three formulations?",
    "The Original Boo uses soy and peanut proteins. Double Trouble uses soy, whey and peanut proteins. Boujee Boo uses whey and milk proteins.",
  ],
  [
    "Are the brownies vegetarian?",
    "The named protein sources come from plants or dairy. Final ingredient lists and vegetarian labelling are still being confirmed.",
  ],
  [
    "What allergens do they contain?",
    "The Original Boo contains soy and peanuts. Double Trouble contains soy, peanuts and milk. Boujee Boo contains milk. Final labels will confirm the full allergen and cross-contact information.",
  ],
  [
    "How should I store them?",
    "We’ll share storage instructions with the final packaging.",
  ],
  [
    "What’s their shelf life?",
    "Shelf life is being validated. Use the date and instructions on the final pack when available.",
  ],
  [
    "How do product drops work?",
    "A drop is a scheduled production batch. Once a batch is confirmed, its line-up, release and dispatch information will appear on the Drops page.",
  ],
  [
    "How does early access work?",
    "Join the Boo Club with your email to register interest in upcoming drops and restocks. Release details will be shared when confirmed.",
  ],
  [
    "When will my order arrive?",
    "Dispatch estimates and delivery regions will be published with confirmed drops. Ordering is currently closed.",
  ],
  [
    "Can I build an assorted box?",
    "Yes. You can try all three formulations in the First Bite Trio or arrange your own mixes in the Boo Box preview.",
  ],
  [
    "Can I cancel or modify my order?",
    "Order changes, cancellations and refund terms will be available before checkout opens.",
  ],
];
