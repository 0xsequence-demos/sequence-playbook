import { MetaArgs } from "@remix-run/react";

export function routeMeta(
  {
    title,
    description,
    image,
    canonical,
  }: {
    title?: string;
    description?: string;
    image?: string;
    canonical?: string;
  },
  { matches, location }: MetaArgs
) {
  const { base_path, base_title, default_description, base_image } =
    matches.find(
      (m) => m.id === "root"
      // @ts-expect-error doesn't know if data.meta exists
    )?.data?.meta || {
      base_path: "",
      base_title: "",
      default_description: "",
      base_image: "",
    };

  const default_canonical = `${base_path}${location.pathname}`;

  image = image ? `${base_image}/${image}` : undefined;

  return [
    { title: title ? `${title} | ${base_title}` : base_title }, // Title tag
    {
      name: "description",
      content: description || default_description,
    }, // Meta description
    { name: "robots", content: "index,follow" }, // Robots tag
    { rel: "canonical", href: canonical || default_canonical }, // Canonical tag

    // Open Graph tags for social media
    {
      property: "og:title",
      content: title ? `${title} | ${base_title}` : base_title,
    },
    {
      property: "og:description",
      content: description || default_description,
    },
    image && {
      property: "og:image",
      content: image,
    },
    { property: "og:url", content: default_canonical },
    { property: "og:type", content: "website" },

    // Twitter Card tags for social media
    image && { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: title ? `${title} | ${base_title}` : base_title,
    },
    {
      name: "twitter:description",
      content: description || default_description,
    },
    image && {
      name: "twitter:image",
      content: image,
    },
  ].filter(Boolean) as [];
}
