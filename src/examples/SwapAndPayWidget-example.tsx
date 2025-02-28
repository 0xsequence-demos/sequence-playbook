/* starthide */
import { useAccount } from "wagmi";
import { useSwapModal, type SwapModalSettings } from "@0xsequence/kit-checkout";
import { WalletConnectionDetail } from "~/components/wallet-connection-detail/WalletConnectionDetail";
import { ethers } from "ethers";
import { useState } from "react";

interface Props {
  setData: (data: `0x${string}` | undefined) => void;
}

export const SwapAndPayWidget = (props: Props) => {
  const { address } = useAccount();
  const [isPending, setPending] = useState(false);
  const [data, setData] = useState<`0x${string}` | undefined>();
  const { openSwapModal } = useSwapModal();
  /* endhide */
  const onClick = () => {
    setPending(true);
    const chainId = 137;
    const currencyAddress = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";
    const currencyAmount = "2000";

    const contractAbiInterface = new ethers.Interface(["function demo()"]);

    const data = contractAbiInterface.encodeFunctionData(
      "demo",
      [],
    ) as `0x${string}`;

    const swapModalSettings: SwapModalSettings = {
      onSuccess: (txHash) => {
        setPending(false);
        console.log("swap successful!");
        setData(txHash as `0x${string}`);
        props.setData(txHash as `0x${string}`);
      },
      chainId,
      currencyAddress,
      currencyAmount,
      postSwapTransactions: [
        {
          to: "0x37470dac8a0255141745906c972e414b1409b470",
          data,
        },
      ],
      title: "Swap and Pay",
      description: "Select a token in your wallet to swap to 0.2 USDC.",
    };

    openSwapModal(swapModalSettings);
  };
  /* starthide */
  return address ? (
    <>
      <WalletConnectionDetail address={address} />

      {isPending ? (
        <button className="ghost">Pending...</button>
      ) : (
        <button onClick={onClick}>Swap and Pay</button>
      )}
      {data ? (
        <div className="flex flex-col gap-1 items-start px-12 py-1 mt-8">
          <span className="text-14 opacity-75">Transaction hash</span>
          <p className="break-all font-mono text-12"> {data}</p>
        </div>
      ) : null}
      {/* {error && <p>{error?.message}</p>} */}
    </>
  ) : (
    <>
      <p>Not connected</p>
    </>
  );
};
/* endhide */
