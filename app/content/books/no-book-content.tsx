export function NoBookContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="px-4">
        <div className="w-full aspect-video flex items-center justify-center bg-neutral-800 rounded-[9px]">
          No book content just yet
        </div>
      </div>
    </>
  );
}
