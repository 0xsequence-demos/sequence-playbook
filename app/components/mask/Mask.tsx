function BoxFadeMask(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <div className="boxfade-image-outer-gradient-mask">
      <div className="boxfade-image-inner-gradient-mask">{children}</div>
    </div>
  );
}

export const Mask = Object.assign(
  {},
  {
    BoxFade: BoxFadeMask,
  }
);
