import { SendTestTransactionWidget } from "~/examples/SendTestTransactionWidget";
import { SignMessageWidget } from "~/examples/SignMessageWidget";
import { useAccount } from "wagmi";
import { useState } from "react";
import { AuthenticationWidget } from "~/examples/AuthenticationWidget";
import { PlayCard } from "../../components/playcard/PlayCard";
import { Resources } from "~/components/resources/Resources";
import { Divide } from "~/components/divide/Divide";
import { RequireWalletButton } from "~/components/require-wallet-button/RequireWalletButton";

const info = {
  name: "primary-sale-off-chain-digital-goods",
  path: "/monetize/primary-sale-off-chain-digital-goods",
  title: "Primary Sale for Off-chain Digital Goods",
  shortname: "Sell Off-chain Digital Goods",
  image: {
    src: "primary-sale-off-chain-digital-goods",
    // width: 170,
    // height: 122,
    // className: "right-[-20px] top-[-10px]",
  },
  description: "Let users pay for anything with powerful Checkout options",
} as const;

const resources = ["offchain-sales-boilerplate"];

function component() {
  const { address } = useAccount();
  const [transaction, setTransaction] = useState<`0x${string}` | undefined>();
  const [signedData, setSignedData] = useState<`0x${string}` | undefined>();

  return (
    <>
      Just because you aren't selling NFTs, doesn't mean your users don't want
      to support you.
      <br />
      By using Sequence Pay, users can pay for anything, like season passes,
      non-blockchain items, or even coffee!
      <h2>Buy a Season Pass</h2>
      <PlayCard>
        <PlayCard.Preview botMood={!address ? "dead" : "happy"}>
          <AuthenticationWidget />
        </PlayCard.Preview>

        <PlayCard.Code
          copy={AuthenticationWidget.String}
          steps={AuthenticationWidget.steps}
        />
      </PlayCard>
      <Resources items={resources} />
    </>
  );
}

export default { info, component };
