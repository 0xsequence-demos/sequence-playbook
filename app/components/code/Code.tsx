export function Code({ children }: { children: string }) {
  if (typeof children !== "string") {
    return null;
  }

  const code = children.replace(/ /g, "\u00A0").split("\n");

  return (
    <pre className="text-14">
      <ol className="custom-counter">
        {code.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ol>
    </pre>
  );
}
