type Section = {
  id: string;
  heading: string;
  paragraphs: string[];
  table?: { caption: string; headers: string[]; rows: string[][] };
};

type Link = { label: string; href: string };

type Story = {
  slug: string;
  category: "The brownies" | "The test kitchen" | "Label math";
  title: string;
  teaser: string;
  answer: string;
  image: { file: string; alt: string; width: number; height: number };
  sections: Section[];
  sources?: Link[];
  links: Link[];
};

export const journalName = "The Crumb Files";
export const journalDate = "2026-11-27";
export const journalAuthor = "Brownie Boo!";
export const journalDescription = "The Brownie Boo journal. Get to know protein brownies, find out what makes a fudgy centre, and learn how to compare protein labels with worked examples.";

const fssai = {
  label: "FSSAI · Labelling and Display Regulations, energy calculation",
  href: "https://www.fssai.gov.in/docs/food-law/regulations/Comp_Labelling%20Display_Version%20VIII_09_09_2025.pdf",
};
const kingArthur = {
  label: "King Arthur Baking · Test kitchen guide to brownie textures",
  href: "https://www.kingarthurbaking.com/blog/2025/05/21/types-of-brownies",
};
const cookieStudy = {
  label: "Protein-fortified cookies · Soy-to-whey ratios and sensory results",
  href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8144257/",
};

export const stories: Story[] = [
  {
    slug: "what-is-a-protein-brownie",
    category: "The brownies",
    title: "What is a protein brownie?",
    teaser: "A chocolate brownie with protein in the recipe. Here’s what to look for when you turn the wrapper over.",
    answer: "A protein brownie is a brownie made with added protein ingredients such as whey, soy or milk protein. Its protein content depends on the recipe and portion size. Read the grams of protein per serving beside the serving weight to see what an actual piece contains.",
    image: { file: "the-break", alt: "Two pieces of a dark, fudgy brownie breaking apart", width: 1460, height: 973 },
    sections: [
      { id: "what-goes-inside", heading: "What goes into a protein brownie?", paragraphs: [
        "Chocolate and cocoa bring the brownie flavour. Protein ingredients can come from dairy, plants or a mix of both. The rest of the recipe gives the brownie its structure and bite, which is why two packs with similar protein numbers can taste completely different.",
        "At Brownie Boo we’re developing three versions. The Original Boo uses soy and peanut proteins. Double Trouble brings soy, whey and peanut proteins together. Boujee Boo uses whey and milk proteins. Those are the planned protein sources for the three concepts.",
      ] },
      { id: "read-the-wrapper", heading: "How do you compare two protein brownies?", paragraphs: [
        "Use protein per serving to compare the amount you’d eat. If the portions differ, grams per 100 g put them on the same weight basis. Check the ingredient and allergen information before picking a product when milk, soy or peanuts matter to you.",
        "Look for the texture you want, too. A densely fudgy square and a light, cakey brownie can both contain added protein. On the label, serving size answers the portion question and ingredients answer the recipe question.",
      ] },
      { id: "brownie-boo-availability", heading: "Where can I buy Brownie Boo?", paragraphs: [
        "Brownie Boo is preparing its first batch. The Upcoming Drops page is where the confirmed date and availability will appear. We’ll publish verified nutrition, full ingredients and cross-contact information before orders open.",
      ] },
    ],
    links: [{ label: "Compare Brownie Boo ingredients and allergens", href: "/ingredients" }, { label: "Check first-batch availability", href: "/drops" }],
  },
  {
    slug: "fudgy-vs-cakey-brownies",
    category: "The test kitchen",
    title: "What makes brownies fudgy or cakey?",
    teaser: "Two brownies walk into a tin. Only one leaves crumbs like a slice of cake.",
    answer: "Fudgy brownies have a dense, moist centre. Cakey brownies have a lighter, more aerated crumb. A recipe with more flour relative to fat, or with more leavening, can move towards a cakier texture. The full recipe and baking method determine how it turns out.",
    image: { file: "ritual-960", alt: "Hands pulling a brownie apart to show its centre", width: 960, height: 1200 },
    sections: [
      { id: "bite", heading: "What does each texture feel like?", paragraphs: [
        "A fudgy brownie cuts into a compact square with a rich, soft centre. A cakey brownie has a more open crumb and breaks apart more like a slice of chocolate cake. Chewy sits on a different axis: it describes how much resistance you feel as you bite.",
        "A shiny top is a clue about the crust. To judge the middle, look at a cut edge and check how tightly packed the crumb is. This is the part that decides whether you want a fork or just a very private moment.",
      ], table: { caption: "What to look for in a cut brownie", headers: ["Style", "Crumb", "Bite"], rows: [["Fudgy", "Compact and moist", "Dense and soft"], ["Cakey", "Open and aerated", "Light and tender"], ["Chewy", "Often compact", "Springy with more resistance"]] } },
      { id: "recipe", heading: "Which ingredients influence the crumb?", paragraphs: [
        "The King Arthur test kitchen compares recipes with different amounts of flour, eggs, fat, liquid and leavening. Their cakier examples lean towards more flour and eggs and can use additional liquid or leavening. Changing several ingredients at once makes it hard to tell what moved the texture.",
        "Extra protein adds another variable to a brownie batter. When trying a new protein ingredient, compare the same portion and let both batches cool for the same amount of time before judging. A warm centre and a cooled centre can feel very different.",
      ] },
    ],
    sources: [kingArthur],
    links: [{ label: "How soy and whey can change a bake", href: "/blog/soy-vs-whey-in-brownies" }],
  },
  {
    slug: "protein-per-100-calories",
    category: "Label math",
    title: "How to calculate protein per 100 calories",
    teaser: "One formula, two imaginary wrappers, and a tiny spreadsheet that actually deserves your time.",
    answer: "Divide grams of protein by calories, then multiply by 100. A snack with 12 g of protein and 200 kcal has 6 g of protein per 100 kcal. Use numbers from the same serving or from the same per-100 g column on the label.",
    image: { file: "drop-1120", alt: "Three proposed Brownie Boo wrappers in pink, lilac and cocoa", width: 1120, height: 747 },
    sections: [
      { id: "worked-example", heading: "Which snack has more protein per calorie?", paragraphs: [
        "Start with the exact portion listed on each pack. In this hypothetical example, Snack A has more protein in one serving. Snack B supplies more protein for the same amount of energy. Both readings are correct because they answer different questions.",
        "For a whole pack with two servings, multiply the serving protein and calories by two before comparing whole packs. The ratio stays the same when both numbers scale together.",
      ], table: { caption: "Hypothetical snack labels", headers: ["Snack", "Protein per serving", "Energy per serving", "Protein per 100 kcal"], rows: [["A", "12 g", "200 kcal", "6 g"], ["B", "9 g", "120 kcal", "7.5 g"]] } },
      { id: "convert-to-percent", heading: "How do grams per 100 kcal relate to percentage of calories?", paragraphs: [
        "FSSAI’s energy calculation assigns protein 4 kcal per gram. In the 12 g and 200 kcal example, protein supplies 48 kcal of the 200 kcal serving, or 24% of its energy. You can reach the same answer by multiplying 6 g per 100 kcal by 4 kcal per gram.",
        "Grams per 100 g is a weight comparison. Grams per 100 kcal is an energy comparison. If you want to know how much you’ll actually get from one brownie, use the serving figure and check what that serving weighs.",
      ] },
    ],
    sources: [fssai],
    links: [{ label: "What the protein brownie label can tell you", href: "/blog/what-is-a-protein-brownie" }, { label: "See Brownie Boo’s ingredient information", href: "/ingredients" }],
  },
  {
    slug: "soy-vs-whey-in-brownies",
    category: "The test kitchen",
    title: "Soy vs. whey protein in brownies",
    teaser: "Same job on the ingredients list. Different behaviour in the batter.",
    answer: "Soy protein comes from soybeans and whey protein comes from milk. They can change how a batter takes up water and how the finished bake sets. The effect depends on how much is used and on the rest of the formula.",
    image: { file: "double-cut-640", alt: "Close view of the chocolate crumb in Brownie Boo’s Double Trouble concept", width: 640, height: 442 },
    sections: [
      { id: "texture", heading: "Do soy and whey change texture?", paragraphs: [
        "A study of cookies made with different soy-isolate and whey ratios found that changing the blend affected the baked texture. That is evidence from its cookie formulation. For a brownie, the useful question is how a specific blend behaves with that batter’s cocoa, moisture and fat.",
        "In a kitchen comparison, weigh ingredients and keep pan size, bake conditions and cooling time constant. Note the batter thickness, the cut edge when cool and how the piece feels the next day. Those observations can help you tell whether the change is about mixing or the final bite.",
      ] },
      { id: "swap", heading: "Can you substitute soy protein for whey powder?", paragraphs: [
        "Treat the first swap as a small test batch. Powders differ in protein content and may contain other ingredients such as sweeteners, flavours and thickeners. Matching their weight alone can change sweetness, the amount of protein and how the batter handles water.",
        "For a packaged brownie, use the finished ingredient list and allergen declaration. Whey is a milk ingredient, and soy ingredients add a separate allergen to look for. The Brownie Boo ingredient page lists the known allergens in each current concept.",
      ] },
    ],
    sources: [cookieStudy],
    links: [{ label: "Read the Brownie Boo ingredient guide", href: "/ingredients" }, { label: "What gives a brownie its fudgy centre?", href: "/blog/fudgy-vs-cakey-brownies" }],
  },
];

export const storyPath = (slug: string) => `/blog/${slug}`;
export const findStory = (slug: string) => stories.find((story) => story.slug === slug);
