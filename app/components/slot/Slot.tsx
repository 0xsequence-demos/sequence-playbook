import React from "react";
import clsx from "clsx";

const SlotFn = (
  {
    asChild,
    mergeClass = true,
    fallbackAs = "div",
    children,
    ...defaultProps
  }: {
    asChild: boolean;
    mergeClass?: boolean;
    fallbackAs: React.ElementType;
    children?: React.ReactNode;
    [key: string]: any;
  },
  ref: React.Ref<any>
) => {
  const Tag = fallbackAs;

  if (!asChild) {
    return <Tag {...defaultProps}>{children}</Tag>;
  }

  if (React.Children.count(children) > 1) {
    throw new Error("Only one child allowed");
  }

  if (React.isValidElement(children)) {
    // Merge className props
    const className = mergeClass
      ? clsx(children?.props?.className, defaultProps?.className)
      : children?.props?.className;

    return React.cloneElement(children, {
      ...defaultProps,
      ref,
      ...{ ...children?.props, className },
    });
  }

  return null;
};

export const Slot = React.forwardRef(SlotFn);
