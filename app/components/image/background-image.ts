import { ComponentProps } from "react";
import schema from "~/content/images_metadata.json";

type ImageProps = Record<
  string,
  {
    name: string;
    path: string;
    width: number;
    height: number;
    alt?: string | null;
    srcset: {
      scale: "1x" | "2x" | "3x";
      format: Mimetypes;
      path: string;
      width: number;
      height: number;
    }[];
  }
>;
type Mimetypes = "avif" | "webp" | "png" | "jpg" | "gif";

const IMAGES = schema as ImageProps;
const TYPES = {
  avif: "image/avif",
  webp: "image/webp",
  png: "image/png",
  jpg: "image/jpeg",
  gif: "image/gif",
} as const;

export const BackgroundImage = ({ name }: { name: string }) => {
  const image = IMAGES[name];

  if (!image) {
    console.error(`Image with name "${name}" not found in schema.`);
    return null;
  }

  const { srcset } = image;

  // Group srcset elements by format
  const groupedSrcset = srcset.reduce((acc, src) => {
    if (!acc[src.format]) {
      acc[src.format] = [];
    }

    acc[src.format].push(`${src.path} ${src.scale}`);

    return acc;
  }, {} as Record<Mimetypes, string[]>);

  const orderedGroupedSrcset = Object.keys(TYPES).reduce((ordered, format) => {
    const _format = format as Mimetypes;

    if (groupedSrcset[_format]) {
      ordered[_format] = groupedSrcset[_format];
    }
    return ordered;
  }, {} as Record<Mimetypes, string[]>);

  // Generate the image-set string for CSS
  const imageSet = Object.entries(orderedGroupedSrcset)
    .map(([format, srcs]) => {
      const _format = format as Mimetypes;
      return srcs.map(
        (src) => `url("${src.split(" ")[0]}") type("${TYPES[_format]}")`
      );
    })
    .flat()
    .join(", ");

  const original = srcset.reduce((smallest, current) => {
    return current.width < smallest.width ? current : smallest;
  }, srcset[0]);

  // CSS Style
  return `
    background-image:url("${original.path}");
    background-image: -webkit-image-set(${imageSet});
    background-image: image-set(${imageSet});
  `;
};
