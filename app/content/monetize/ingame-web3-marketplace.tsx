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
  name: "ingame-web3-marketplace",
  path: "/monetize/ingame-web3-marketplace",
  title: "In-game Marketplaces",
  shortname: "In-game Marketplaces",
  image: {
    src: "ingame-web3-marketplace",
    // width: 170,
    // height: 122,
    // className: "right-[-20px] top-[-10px]",
  },
  description:
    "Let users build a live economy in your game!",
} as const;

const resources = includeResources([
  "ingame-marketplace-boilerplate",
]);

function Book() {
  const { address } = useAccount();
  const [transaction, setTransaction] = useState<`0x${string}` | undefined>();
  const [signedData, setSignedData] = useState<`0x${string}` | undefined>();

  return (
    <>
    Unlike the Sequence Builder Marketplace, which let's you open a marketplace with no code, the powerful Marketplace API lets you integrate your marketplace directly into your game.
    <br />
      <h2>Create a Sell Order</h2>
      You can list an item for sale, for a set price
      <PlayCard>
        <PlayCard.Preview botMood={!address ? "dead" : "happy"}>
          <AuthenticationWidget />
        </PlayCard.Preview>

        <PlayCard.Code copy={AuthenticationWidget.String}>
          <AuthenticationWidget.Snippet />
        </PlayCard.Code>
      </PlayCard>

      <Divide />

      <h2>Create a Buy Order</h2>
      You can try to buy an item for a preferred price

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

      <Divide />
      <h2>Fulfill a Sell Order</h2>
      You can buy an item someone listed, at their preferred price

      <PlayCard>
        <PlayCard.Preview
          botMood={!address ? "dead" : transaction ? "happy" : "neutral"}
        >
          {address ? (
            <SendTestTransactionWidget setData={setTransaction} />
          ) : (
            <RequireWalletButton title="Connect a wallet send a test transaction" />
          )}
        </PlayCard.Preview>

        <PlayCard.Code copy={SendTestTransactionWidget.String}>
          <SendTestTransactionWidget.Snippet />
        </PlayCard.Code>
      </PlayCard>

      <Divide />
      <h2>Fulfill a Buy Order</h2>
      You can sell your item to someone who wants it, if you think the price is fair, or even profitable!

      <PlayCard>
        <PlayCard.Preview
          botMood={!address ? "dead" : transaction ? "happy" : "neutral"}
        >
          {address ? (
            <SendTestTransactionWidget setData={setTransaction} />
          ) : (
            <RequireWalletButton title="Connect a wallet send a test transaction" />
          )}
        </PlayCard.Preview>

        <PlayCard.Code copy={SendTestTransactionWidget.String}>
          <SendTestTransactionWidget.Snippet />
        </PlayCard.Code>
      </PlayCard>

      <Resources items={resources} />
    </>
  );
}

export default Object.assign(Book, { info });
