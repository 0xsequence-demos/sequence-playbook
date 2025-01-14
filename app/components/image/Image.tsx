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
    srcset: Srcset[];
  }
>;
type Srcset = {
  scale: "1x" | "2x" | "3x";
  format: Mimetypes;
  path: string;
  width: number;
  height: number;
};

type Mimetypes = "avif" | "webp" | "png" | "jpg" | "gif";

const IMAGES = schema as ImageProps;
const TYPES = {
  avif: "image/avif",
  webp: "image/webp",
  png: "image/png",
  jpg: "image/jpeg",
  gif: "image/gif",
} as const;

function parseSources(srcset: Srcset[]) {
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

  // Generate set string for all groups in the groupedSet
  const sources = Object.entries(orderedGroupedSrcset).map(([format, srcs]) => {
    const _format = format as Mimetypes;

    return {
      srcset: srcs.join(", "),
      type: TYPES[_format],
    };
  });

  const backgroundSet = Object.entries(orderedGroupedSrcset)
    .map(([format, srcs]) => {
      const _format = format as Mimetypes;
      return srcs.map(
        (src) => `url("${src.split(" ")[0]}") type("${TYPES[_format]}")`,
      );
    })
    .flat()
    .join(", ");

  const fallback = srcset.reduce((smallest, current) => {
    return current.width < smallest.width ? current : smallest;
  }, srcset[0]);

  return { sources, backgroundSet, fallback };
}

export const Image = (
  props: {
    name: string;
    alt?: string;
    width?: number;
    height?: number;
  } & ComponentProps<"img">,
) => {
  const { name, alt, width, height, ...restProps } = props;

  const image = IMAGES[name];
  if (!image) {
    console.warn(`Image with name "${name}" not found in schema.`);
    return null;
  }

  const { alt: imageAlt, srcset } = image;

  const { sources, fallback } = parseSources(srcset);

  return (
    <picture>
      {sources.map(({ srcset, type }) => (
        <source type={type} srcSet={srcset} key={type} />
      ))}
      <img
        src={fallback.path}
        alt={alt || imageAlt || ""}
        width={width || fallback.width}
        height={height || fallback.height}
        loading="lazy"
        {...restProps}
      />
    </picture>
  );
};

export function BackgroundImage(props: { name?: string }) {
  const { name } = props;

  if (!name) return null;

  const image = IMAGES[name];

  if (!image) {
    console.warn(`Image with name "${name}" not found in schema.`);
    return null;
  }
  const { fallback, backgroundSet } = parseSources(image.srcset);

  const styles = `[data-background="${name}"] {
    background-image:url("${fallback.path}");
    background-image: -webkit-image-set(${backgroundSet});
    background-image: image-set(${backgroundSet});
  }
`;

  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
