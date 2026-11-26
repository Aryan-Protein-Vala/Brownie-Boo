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
    "Where are the protein numbers?",
    "We’re putting the numbers through their final checks. Verified nutrition goes up before orders open. The 50 g, 200 g and 250 g labels are brownie weights.",
  ],
  [
    "Wait, what’s different about the three Boos?",
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
    "Where do I stash my brownies?",
    "The final wrapper will have storage instructions. Your hiding spot is between you and your conscience.",
  ],
  [
    "How long do these keep? Hypothetically.",
    "Shelf life is being validated. Use the date and instructions on the final pack when available.",
  ],
  [
    "What’s a drop, and is it dramatic?",
    "A drop is a scheduled batch of brownies. Once it’s confirmed, the Drops page gets the lineup, release date and dispatch details. That’s the whole plot.",
  ],
  [
    "How do I get the brownie gossip first?",
    "Join the Boo Club with your email to register interest in upcoming drops and restocks. Release details will be shared when confirmed.",
  ],
  [
    "When will my order arrive?",
    "Dispatch estimates and delivery regions will be published with confirmed drops. Ordering is currently closed.",
  ],
  [
    "Can I see all three Boos at once?",
    "Yes. The First Bite Trio brings all three together. In the Boo Box preview, you choose who gets each seat.",
  ],
  [
    "Can I cancel or modify my order?",
    "Order changes, cancellations and refund terms will be available before checkout opens.",
  ],
];
