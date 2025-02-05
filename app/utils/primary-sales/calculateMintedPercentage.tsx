export const calculateMintedPercentage = (
  minted: number,
  totalMax: number
): number => (totalMax <= 0 ? 0 : Math.floor((minted / totalMax) * 100));
