export function NoBookContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="w-full aspect-video flex items-center justify-center bg-deep-purple-950/25 border border-white/10 rounded-[9px]">
        No book content just yet
      </div>
    </>
  );
}
