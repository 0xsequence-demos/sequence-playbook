export function formatAsCode(str: string) {
  return str
    .replace(/ /g, "\u00A0")
    .split("\n")
    .map((v) => (
      <>
        {v}
        <br />
      </>
    ));
}
