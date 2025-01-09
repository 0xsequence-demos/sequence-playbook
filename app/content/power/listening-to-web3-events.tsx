import { SendTestTransactionWidget } from "~/examples/SendTestTransactionWidget";
import { SignMessageWidget } from "~/examples/SignMessageWidget";
import { useAccount } from "wagmi";
import { useState } from "react";
import { AuthenticationWidget } from "~/examples/AuthenticationWidget";
import { PlayCard } from "../../components/playcard/PlayCard";
import { Resources } from "~/components/resources/Resources";
import { Divide } from "~/components/divide/Divide";
import { RequireWalletButton } from "~/components/require-wallet-button/RequireWalletButton";
import { includeResources } from "~/content/resources";

const info = {
  name: "listening-to-web3-events",
  path: "/power/listening-to-web3-events",
  title: "Listen to Web3 Events",
  shortname: "Web3 Events",
  image: {
    src: "listening-to-web3-events",
    // width: 170,
    // height: 122,
    // className: "right-[-20px] top-[-10px]",
  },
  description:
    "Build responsive experiences that react to onchain activity.",
} as const;

const resources = includeResources([
  "web3-events-boilerplate",
]);

function Book() {
  const { address } = useAccount();
  const [transaction, setTransaction] = useState<`0x${string}` | undefined>();
  const [signedData, setSignedData] = useState<`0x${string}` | undefined>();

  return (
    <>
    Web3 events take the mystery out of the state of your onchain interactions. 
    <br />
    <br />
    You can stop long-polling, and start listening to wallet updates.
      <h2>Listen to Web3 Events</h2>
      <PlayCard>
        <PlayCard.Preview botMood={!address ? "dead" : "happy"}>
          <AuthenticationWidget />
        </PlayCard.Preview>

        <PlayCard.Code copy={AuthenticationWidget.String}>
          <AuthenticationWidget.Snippet />
        </PlayCard.Code>
      </PlayCard>

      <Resources items={resources} />
    </>
  );
}

export default Object.assign(Book, { info });
