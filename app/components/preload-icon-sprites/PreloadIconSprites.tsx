export function PreloadIconSprites({
  href = "/icons/sprite.svg",
}: {
  href?: string;
}) {
  return <link rel="preload" href={href} as="image" type="image/svg+xml" />;
}
