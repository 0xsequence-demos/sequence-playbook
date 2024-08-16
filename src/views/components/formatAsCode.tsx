export function formatAsCode(str: string) {
  return (
    <ol>
      {str
        .replace(/ /g, "\u00A0")
        .split("\n")
        .map((v) => (
          <li>{v}</li>
        ))}
    </ol>
  );
}
