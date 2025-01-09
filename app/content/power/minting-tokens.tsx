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
  name: "minting-tokens",
  path: "/power/minting-tokens",
  title: "Minting Tokens",
  shortname: "Minting Tokens",
  image: {
    src: "minting-tokens",
    // width: 170,
    // height: 122,
    // className: "right-[-20px] top-[-10px]",
  },
  description:
    "Mint your own ERC20, ERC721 or ERC1155 tokens.",
} as const;

const resources = includeResources([
  "server-side-transactions-boilerplate",
]);

function Book() {
  const { address } = useAccount();
  const [transaction, setTransaction] = useState<`0x${string}` | undefined>();
  const [signedData, setSignedData] = useState<`0x${string}` | undefined>();

  return (
    <>
      <h2>No Coding Necessary</h2>
      Using sequence.build, you can create your tokens and mint them from the browser
      <PlayCard>
        <PlayCard.Preview botMood={!address ? "dead" : "happy"}>
          <AuthenticationWidget />
        </PlayCard.Preview>

        <PlayCard.Code copy={AuthenticationWidget.String}>
          <AuthenticationWidget.Snippet />
        </PlayCard.Code>
      </PlayCard>

      <Divide />

      <h2>Coding is Cool, Though</h2>
      We agree! Using the sequence API, you can create and mint tokens in ways only you can imagine.

      <PlayCard>
        <PlayCard.Preview
          botMood={!address ? "dead" : signedData ? "happy" : "neutral"}
        >
          {address ? (
            <SignMessageWidget setData={setSignedData} />
          ) : (
            <RequireWalletButton title="Connect a wallet test signing a message" />
          )}
        </PlayCard.Preview>

        <PlayCard.Code copy={SignMessageWidget.String}>
          <SignMessageWidget.Snippet />
        </PlayCard.Code>
      </PlayCard>

      <Resources items={resources} />
    </>
  );
}

export default Object.assign(Book, { info });
