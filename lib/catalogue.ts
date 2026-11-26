export const packs = [
  {
    grams: 50,
    name: "Lil’ Boo",
    note: "The one you didn’t tell the group chat about.",
  },
  { grams: 200, name: "Big Boo", note: "“Want a bite?” said under duress." },
  {
    grams: 250,
    name: "Absolute Boo",
    note: "Put this one in your emergency contacts.",
  },
] as const;

export const products = [
  {
    slug: "original",
    name: "The Original Boo",
    split: ["The Original", "Boo."],
    blurb: "The desk drawer’s employee of the month.",
    description:
      "Your calendar says “quick sync.” Your desk drawer has a fudgy brownie with soy and peanut proteins. One of them gets you.",
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
    blurb: "For when “one quick errand” becomes a franchise.",
    description:
      "You left for toothpaste. Now you’re carrying a sofa. Double Trouble packs soy, whey and peanut proteins into a chocolate brownie for the detour.",
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
    blurb: "Has a dress code. You’re ignoring it.",
    description:
      "A rich chocolate brownie with whey and milk proteins. Looks like it booked a table for eight. You’re eating it over the sink.",
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
    lead: "Bro, put the",
    tail: "shaker down.",
    support:
      "Daily protein stress? Take five. This fudgy brownie brings chocolate and protein. The shaker can have a day off.",
    action: "Meet the Boos",
    href: "/shop",
  },
  {
    id: "B",
    lead: "Stop counting.",
    tail: "Start chewing.",
    support:
      "Less tracking. More chewing. This fudgy brownie has protein. Your spreadsheet can spiral without you.",
    action: "Get First Bite",
    href: "/early-access",
  },
  {
    id: "C",
    lead: "A brownie smarter",
    tail: "than your diet plan.",
    support:
      "Looks like dessert. Brings protein. Already did more than your group project partner.",
    action: "Meet the Boos",
    href: "/shop",
  },
  {
    id: "D",
    lead: "Your 9-to-5 just",
    tail: "got a cheat code.",
    support:
      "One fudgy brownie closer to being done for the day. The “quick sync” can circle back without you.",
    action: "Shop the Good Stuff",
    href: "/shop",
  },
  {
    id: "E",
    lead: "Chocolate first.",
    tail: "Protein plot twist.",
    support:
      "Brownie taste. Protein peace. Your ex can take that “hey stranger” text elsewhere.",
    action: "Meet the Boos",
    href: "/shop",
  },
  {
    id: "F",
    lead: "Emotionally unavailable.",
    tail: "Nutritionally interesting.",
    support:
      "Your situationship takes three to five business days to reply. This chocolate brownie brings protein and zero read receipts.",
    action: "Catch the Drop",
    href: "/drops",
  },
  {
    id: "G",
    lead: "No chicken. No problem.",
    tail: "More chocolate.",
    support:
      "Skipping chicken? Our named protein sources are from plants and dairy. Final vegetarian labelling is still being confirmed.",
    action: "See What’s Inside",
    href: "/ingredients",
  },
  {
    id: "H",
    lead: "Life's too short",
    tail: "to eat chalk.",
    support:
      "Ever had a protein bar that tasted like a school supply? Here’s a fudgy chocolate brownie with protein.",
    action: "Shop the Good Stuff",
    href: "/shop",
  },
  {
    id: "I",
    lead: "Less protein stress.",
    tail: "More chocolate.",
    support:
      "Stop stressing over protein. Start eating brownies. You’ve got enough going on without a snack giving you homework.",
    action: "I Want a Bite",
    href: "/early-access",
  },
  {
    id: "J",
    lead: "Good brownies.",
    tail: "Absurd protein.",
    support:
      "One fudgy chocolate brownie with protein and zero interest in your 5 a.m. routine.",
    action: "Meet the Boos",
    href: "/shop",
  },
] as const;

export const questions = [
  [
    "A sugar-free Boo? What’s the plot?",
    "A sugar-free chocolate brownie is in development. We want it to taste like dessert you’d hide from your flatmates. We’ll publish verified nutrition and the final ingredients before orders open.",
  ],
  [
    "Where are the protein numbers? My calculator is awake.",
    "We’ll publish verified nutrition for each pack before orders open. The 50 g, 200 g and 250 g labels are brownie weights. Your calculator can take the afternoon off.",
  ],
  [
    "Three Boos. What’s everybody bringing?",
    "The Original Boo brings soy and peanut proteins. Double Trouble brings soy, whey and peanut proteins. Boujee Boo brings whey and milk proteins. For once, everyone did their part of the group project.",
  ],
  [
    "Vegetarian? The group chat wants receipts.",
    "Our named protein sources come from plants or dairy. We’re still confirming the final ingredients and vegetarian labelling. Please hold while the ingredients finish their paperwork.",
  ],
  [
    "Allergen roll call. What’s in each Boo?",
    "The Original Boo contains soy and peanuts. Double Trouble contains soy, peanuts and milk. Boujee Boo contains milk. The final labels will confirm all allergens and cross-contact details. The tiny print gets main character treatment here.",
  ],
  [
    "Where do I stash these from my flatmates?",
    "Storage instructions will be on the final wrapper. After that, your hiding spot is between you and your conscience.",
  ],
  [
    "How long do they keep? Be honest, I’m hoarding.",
    "We’re still validating shelf life. Use the date and storage instructions on the final pack when they’re available. “I hid it well” is an excellent alibi and a terrible expiry date.",
  ],
  [
    "What’s a drop? Should I be dramatic?",
    "A drop is a scheduled batch of brownies. Once it’s confirmed, the Drops page gets the lineup, release date and dispatch details. Rehearsing a dramatic gasp is entirely up to you.",
  ],
  [
    "How do I get on the brownie gossip list?",
    "Join the Boo Club with your email for drop and restock updates. We’ll share release details once they’re confirmed. Nobody’s adding you to a group chat called “Final FINAL Plans.”",
  ],
  [
    "When will my brownies show up? I’m pacing.",
    "Ordering is still closed. We’ll post delivery regions and dispatch estimates with each confirmed drop. You can give the doorbell a day off.",
  ],
  [
    "Can I get all three Boos in one box? Asking for myself.",
    "The First Bite Trio gets all three in one box. In the Boo Box preview, you pick who gets each seat. Nobody has to pretend to get along at dinner.",
  ],
  [
    "Can I change or cancel an order? I panic-click.",
    "We’ll publish order changes, cancellations and refund terms before checkout opens. Until then, you can edit your preview bag as often as your heart changes its mind.",
  ],
];
