import type { MetadataRoute } from "next";
import { products } from "../lib/catalogue";
import { stories, storyPath } from "../lib/journal";
import { publicInfoDescriptions, publicOrigin } from "../lib/search";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = publicOrigin;
  if (!origin) return [];
  const paths = [
    "/", "/shop", "/marketing", "/blog",
    ...Object.keys(publicInfoDescriptions).map((slug) => `/${slug}`),
    ...products.map(({ slug }) => `/shop/${slug}`),
  ];
  return [
    ...paths.map((path) => ({ url: path === "/" ? origin : new URL(path, origin).href })),
    ...stories.map(({ slug }) => ({ url: new URL(storyPath(slug), origin).href })),
  ];
}
