export function SkipAhead({
  to = "main",
  children,
}: {
  to?: string;
  children: React.ReactNode;
}) {
  function handleSkipAhead(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const target = document.getElementById(to);

    if (target) {
      if (history.replaceState) {
        history.replaceState(null, "", `#${to}`);
      }
      target.focus();
      target.scrollIntoView();
    }
  }

  return (
    <div className="w-full flex items-center justify-center focus-within:fixed focus-within:min-h-[3rem] z-[10000]">
      <span className="sr-only focus-within:not-sr-only">
        <button
          type="button"
          className="text-lg text-white outline-white bg-blue-700 rounded-full px-3 py-1 inline-block "
          onClick={handleSkipAhead}
        >
          {children}
        </button>
      </span>
    </div>
  );
}
