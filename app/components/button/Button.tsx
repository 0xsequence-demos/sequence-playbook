import { ComponentProps } from "react";

type ButtonProps = {
  children: React.ReactNode;
} & ComponentProps<"button">;

export function Button(props: ButtonProps) {
  const { children, ...restProps } = props;
  return (
    <span className="relative p-[1px] bg-white/10 rounded-[9px] bg-gradient-to-b from-white/20 to-white/10 isolate z-0">
      <span className="right-[1rem] top-[-0.5px] w-[1.5rem] h-[1.5px] absolute bg-gradient-to-r from-white/0 via-white/60 to-white/0 blur-[2px]"></span>
      <button
        type="button"
        className="py-1 px-2.5 rounded-[0.5rem] bg-gradient-to-b from-deep-purple-500 to-deep-purple-600 text-13"
        {...restProps}
      >
        {children}
      </button>
    </span>
  );
}
