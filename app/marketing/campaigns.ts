import type { BooExpression } from "../../components/boo-face";

export const artWidth = 1080;
export const artHeight = 1350;
export const campaignPack = "/marketing/brownie-boo-apple-to-orange.zip";

type Slide = {
  label: string;
  title: string;
  punch: string;
  boo?: BooExpression;
  photo?: "the-break" | "ritual-960" | "double-cut-640" | "original-cut-640";
  prop: {
    label: string;
    lines: string[];
    stamp?: string;
  };
};

type Campaign = {
  slug: string;
  name: string;
  topic: string;
  apple: string;
  orange: string;
  caption: string;
  alt: string[];
  slides: Slide[];
};

export const campaigns: Campaign[] = [
  {
    slug: "quick-call",
    name: "The 5:59 meeting",
    topic: "Office life",
    apple: "The “quick call” that shows up one minute before you log off.",
    orange: "Boo sends a calendar decline with a prior chocolate commitment.",
    caption: "My calendar says busy. My desk drawer knows why. 🍫 Get first-batch updates via the link in bio.",
    alt: [
      "Chocolate brownie pieces behind a mock calendar invite for a quick call at 5:59 p.m. The invite lists your evening as a guest.",
      "A calendar invite expands from 5:59 to 7:00 p.m. The updated agenda says just one more thing and free time is listed as removed.",
      "A pink calendar invite from Brownie Boo reserves ten minutes for dessert at your desk, with one guest.",
      "A cracked chocolate brownie beside a declined meeting invite. The reason is a prior chocolate commitment.",
    ],
    slides: [
      {
        label: "From the desk of Boo",
        title: "5:59 p.m.",
        punch: "Quick call?",
        photo: "the-break",
        prop: { label: "Calendar invite", lines: ["Guests · You", "Optional · Your evening"], stamp: "EOD" },
      },
      {
        label: "Calendar update",
        boo: "sleepy",
        title: "Just one",
        punch: "more thing.",
        prop: { label: "Updated agenda", lines: ["5:59–7:00 p.m.", "Removed · Your free time"], stamp: "Again" },
      },
      {
        label: "New calendar invite",
        boo: "cheeky",
        title: "Boo blocked",
        punch: "ten minutes.",
        prop: { label: "Dessert break", lines: ["Location · Your desk", "Guests · One. Obviously."], stamp: "Busy" },
      },
      {
        label: "RSVP from Boo",
        title: "Declined.",
        punch: "Prior chocolate\ncommitment.",
        photo: "the-break",
        prop: { label: "Brownie Boo!", lines: ["First-batch updates", "Link in bio"], stamp: "OOO" },
      },
    ],
  },
  {
    slug: "wedding-biodata",
    name: "I came for the buffet",
    topic: "Wedding season",
    apple: "The family wedding that turns into a matchmaking interview by dessert.",
    orange: "Boo crashes the shortlist with a brownie’s own wedding biodata.",
    caption: "I’d like to thank the dessert table for giving me something to commit to. If the relatives ask, my type is Brownie Boo. First-batch updates are in the bio.",
    alt: [
      "A lilac wedding invitation. I came for the buffet. Left with a shortlist. Dress code is festive and the surprise activity is matchmaking.",
      "Boo’s wedding invitation asks what’s your type. An unsolicited interview asks about salary, star sign and a five-year plan, between courses.",
      "A chocolate brownie’s wedding biodata says finally, a serious candidate. It lists dark, fudgy and emotionally baked as the brownie’s credentials.",
      "Boo winks beside a wedding RSVP stamped plus one. I’m bringing a brownie.",
    ],
    slides: [
      {
        label: "The wedding guest edition",
        boo: "gasp",
        title: "I came for\nthe buffet.",
        punch: "Left with\na shortlist.",
        prop: { label: "Wedding reception", lines: ["Dress code · Festive", "Surprise activity · Matchmaking"], stamp: "RSVP" },
      },
      {
        label: "The interview",
        boo: "suspicious",
        title: "So, what’s",
        punch: "your type?",
        prop: { label: "Unsolicited questionnaire", lines: ["Salary. Star sign. Five-year plan.", "Time limit · Between courses"], stamp: "Urgent" },
      },
      {
        label: "Boo’s biodata",
        title: "Finally, a serious",
        punch: "candidate.",
        photo: "double-cut-640",
        prop: { label: "Brownie Boo!", lines: ["Dark. Fudgy.", "Emotionally baked."], stamp: "Eligible" },
      },
      {
        label: "Updated RSVP",
        title: "My plus-one?",
        punch: "A brownie.",
        prop: { label: "Kindly save two seats", lines: ["Me + Brownie Boo", "First-batch updates in bio"], stamp: "+1" },
      },
    ],
  },
  {
    slug: "paneer-audit",
    name: "The paneer audit",
    topic: "Dinner with friends",
    apple: "The friend who ate the last paneer tikka and is now very passionate about an even UPI split.",
    orange: "Boo treats dessert as a separate transaction with one beneficiary.",
    caption: "The UPI request said “dinner.” I would like the record to show I had one onion ring from the paneer plate. My Brownie Boo is on a separate bill. Catch the first batch via the bio.",
    alt: [
      "A pink receipt reads we split the bill, the paneer was a solo project. Paneer tikka has one beneficiary and the bill is marked split equally.",
      "A receipt headed itemised evidence says the group ordered one paneer tikka, one friend ate almost all of it, and the UPI request was split equally.",
      "A dessert amendment on a receipt says chocolate assets will be held individually. The receipt is stamped private.",
      "A chocolate brownie beside a receipt stamped mine. My brownie is on a separate bill.",
    ],
    slides: [
      {
        label: "Group dinner receipt",
        boo: "suspicious",
        title: "We split\nthe bill.",
        punch: "The paneer was\na solo project.",
        prop: { label: "Paneer tikka", lines: ["Beneficiaries · One", "Payment · Split equally"], stamp: "Audit" },
      },
      {
        label: "Group dinner receipt",
        boo: "gasp",
        title: "Itemised",
        punch: "evidence.",
        prop: { label: "Paneer tikka · 1 plate", lines: ["One person · Nearly all of it", "UPI request · Split equally"], stamp: "Again" },
      },
      {
        label: "Dessert amendment",
        boo: "smirk",
        title: "Chocolate",
        punch: "assets.",
        prop: { label: "New terms", lines: ["Held individually", "Shared on a case-by-case basis"], stamp: "Private" },
      },
      {
        label: "Final receipt",
        title: "My brownie\nis on",
        punch: "a separate bill.",
        photo: "original-cut-640",
        prop: { label: "Brownie Boo!", lines: ["Beneficiary · Me", "First-batch updates in bio"], stamp: "Mine" },
      },
    ],
  },
  {
    slug: "mumbai-local",
    name: "Personal space",
    topic: "Mumbai commute",
    apple: "The packed local that makes you intimately familiar with someone else’s backpack.",
    orange: "After sharing the whole ride, Boo claims one unshared square of chocolate.",
    caption: "I know the zip configuration of a stranger’s backpack now. When I get home, the corner piece is mine. Follow @browniebooclub for the first drop.",
    alt: ["A plum Mumbai local parody ticket with two hands splitting a chocolate brownie. Shared my entire commute. This brownie is mine."],
    slides: [{
      label: "Mumbai local · Peak hour",
      title: "Shared my\nentire commute.",
      punch: "This brownie\nis mine.",
      photo: "ritual-960",
      prop: { label: "Personal space ticket", lines: ["Valid for · One brownie", "Passenger · Me"], stamp: "Solo" },
    }],
  },
  {
    slug: "group-project",
    name: "Presented by us",
    topic: "Campus life",
    apple: "The group-project partner who types “we” after changing the font on slide seven.",
    orange: "Boo gives that partner full credit on the presentation and zero bites of dessert.",
    caption: "They added a transition to slide seven and called it a team effort. I’m putting the brownie under individual assessment. Follow @browniebooclub for the first drop.",
    alt: ["A pink group assignment cover sheet. Made by me. Presented by us. Brownie for one. Boo sits beside a berry A-plus stamp."],
    slides: [{
      label: "Group project cover sheet",
      boo: "grin",
      title: "Made by me.",
      punch: "Presented by us.",
      prop: { label: "Brownie for one", lines: ["Individual assessment", "Marks · All mine"], stamp: "A+" },
    }],
  },
  {
    slug: "early-access",
    name: "Only one gets early access",
    topic: "Dating",
    apple: "The situationship that likes your stories and takes three business days to make a plan.",
    orange: "Boo turns early access into a boundary and an invitation to join the Boo Club.",
    caption: "A story like is a fascinating way to RSVP to absolutely nothing. Brownie Boo gets early access. Catch the first-batch updates in our bio.",
    alt: ["A lilac parody chat card. They liked my story. Only one of us is getting early access. A wink from Boo appears beside the final message."],
    slides: [{
      label: "From Boo’s close friends",
      boo: "wink",
      title: "They liked\nmy story.",
      punch: "Only one of us is\ngetting early access.",
      prop: { label: "Boo Club", lines: ["First-batch updates", "Link in bio"], stamp: "Seen" },
    }],
  },
];

export function slideUrl(slug: string, index: number) {
  return `/marketing/${slug}-${String(index + 1).padStart(2, "0")}.png`;
}
