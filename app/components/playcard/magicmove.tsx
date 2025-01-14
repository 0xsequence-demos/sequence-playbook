import type {
  KeyedTokensInfo,
  MagicMoveDifferOptions,
  MagicMoveRenderOptions,
} from "shiki-magic-move/types";
import * as React from "react";
import { syncTokenKeys, toKeyedTokens } from "shiki-magic-move/core";
import { ShikiMagicMoveRenderer } from "shiki-magic-move/react";

export interface ShikiMagicMovePrecompiledProps {
  steps: KeyedTokensInfo[];
  step?: number;
  animate?: boolean;
  options?: MagicMoveRenderOptions & MagicMoveDifferOptions;
  onStart?: () => void;
  onEnd?: () => void;
}

const EMPTY = /* @__PURE__ */ toKeyedTokens("", []);

/**
 * Component to render a compiled magic move step,
 * Where the tokens can be generated on build time.
 */
export function ShikiMagicMovePrecompiled({
  steps,
  step = 0,
  animate = true,
  options,
  onStart,
  onEnd,
}: ShikiMagicMovePrecompiledProps) {
  const [previous, setPrevious] = React.useState(EMPTY);

  const prev = React.useMemo(() => previous, [step]);

  const result = React.useMemo(() => {
    const res = syncTokenKeys(
      prev,
      steps[Math.min(step, steps.length - 1)],
      options,
    );
    setPrevious(res.to);
    return res;
  }, [prev, steps, step, options]);

  options = { ...options, delayContainer: 0, duration: 400, stagger: 0.1 };

  return (
    <ShikiMagicMoveRenderer
      tokens={result.to}
      previous={result.from}
      options={options}
      animate={animate}
      onStart={onStart}
      onEnd={onEnd}
    />
  );
}
