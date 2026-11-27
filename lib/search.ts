import type { Metadata } from "next";

function readPublicOrigin(value: string | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol === "https:" && url.pathname === "/" && !url.search && !url.hash &&
        !url.username && !url.password && url.hostname.includes(".")) {
      return url.origin;
    }
  } catch {
    return undefined;
  }
}

const configuredOrigin = readPublicOrigin(process.env.BOO_PUBLIC_SITE_URL);
const deploymentEnv = process.env.VERCEL_ENV;

// Vercel branch previews inherit production variables in some setups.
export const publicOrigin =
  process.env.NODE_ENV === "production" &&
  (!deploymentEnv || deploymentEnv === "production")
    ? configuredOrigin
    : undefined;

export const publicInfoDescriptions = {
  "our-story": "Meet Brownie Boo, an Indian brownie brand developing chocolate brownies with soy, peanut and dairy proteins for people who take dessert seriously.",
  ingredients: "Compare Brownie Boo’s planned brownie ingredients, protein sources and known allergens. Verified pack nutrition will be published before orders open.",
  drops: "Find Brownie Boo’s latest first-batch status, upcoming brownie drops and where to get release updates.",
  faq: "Find answers to Brownie Boo questions about our brownie concepts, ordering, first-batch availability, ingredients and allergens.",
} as const;

export function publicMetadata({
  path,
  title,
  description,
  image,
  publishedTime,
}: {
  path: string;
  title?: string;
  description: string;
  image?: string;
  publishedTime?: string;
}): Metadata {
  const url = publicOrigin ? new URL(path, publicOrigin) : undefined;
  const socialImage = publicOrigin && image ? new URL(image, publicOrigin) : undefined;
  const social = { title: title ?? "Brownie Boo!", description, url, images: socialImage && [socialImage] };

  return {
    ...(title && { title }),
    description,
    ...(url && { alternates: { canonical: url }, robots: { index: true, follow: true } }),
    openGraph: publishedTime
      ? { ...social, type: "article", publishedTime, authors: publicOrigin ? [new URL("/our-story", publicOrigin)] : undefined }
      : { ...social, type: "website" },
    twitter: { card: socialImage ? "summary_large_image" : "summary", title: social.title, description, images: social.images },
  };
}

export const organization = publicOrigin && {
  "@type": "Organization",
  "@id": `${publicOrigin}/#organization`,
  name: "Brownie Boo!",
  url: publicOrigin,
  sameAs: ["https://www.instagram.com/browniebooclub/"],
};
