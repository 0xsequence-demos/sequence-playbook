import { GradientAvatar, shortAddress } from "boilerplate-design-system";

export function WalletConnectionDetail({
  address,
}: {
  address: `0x${string}`;
}) {
  return (
    <div className="inline-flex gap-1 flex-col text-14 mx-auto mb-3 items-center">
      <span className="opacity-70">Connected as</span>
      <span className="flex gap-2 items-center">
        <GradientAvatar address={address} className="size-5" />
        <span>{shortAddress(address)}</span>
      </span>
    </div>
  );
}
