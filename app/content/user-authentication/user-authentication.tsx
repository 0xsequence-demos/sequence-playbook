import { SendTestTransactionWidget } from "~/examples/SendTestTransactionWidget";
import { SignMessageWidget } from "~/examples/SignMessageWidget";
import { useAccount } from "wagmi";
import { useState } from "react";
import { AuthenticationWidget } from "~/examples/AuthenticationWidget";
import { PlayCard } from "../../components/playcard/PlayCard";
import {
  Resources,
  type ResourceItemProps,
} from "~/components/resources/Resources";
import { Divide } from "~/components/divide/Divide";
import { RequireWalletButton } from "~/components/require-wallet-button/RequireWalletButton";

const info = {
  name: "user-authentication",
  path: "/onboard/user-authentication",
  title: "User Authentication via Sequence Embedded Wallet",
  shortname: "User authentication",
  image: {
    src: "user-authentication",
    // width: 170,
    // height: 122,
    // className: "right-[-20px] top-[-10px]",
  },
  description:
    "Everything starts with user authentication. To authenticate a user with an embedded web3 wallet, we first need to integrate web3 providers into the base of our application.",
} as const;

const resources = [
  {
    type: "boilerplate",
    title: "Sequence Wallet Boilerplate",
    image: {
      src: "/resources/example1.jpg",
      alt: "",
    },
    links: [
      {
        label: "Demo",
        href: "",
      },
      {
        label: "Source",
        icon: "github",
        href: "",
      },
    ],
  },
  {
    type: "boilerplate",
    title: "Sequence Wallet Boilerplate",
    image: {
      src: "/resources/example1.jpg",
      alt: "",
    },
    links: [
      {
        label: "Demo",
        href: "",
      },
      {
        label: "Source",
        icon: "github",
        href: "",
      },
    ],
  },
  {
    type: "boilerplate",
    title: "Sequence Wallet Boilerplate",
    image: {
      src: "/resources/example1.jpg",
      alt: "",
    },
    links: [
      {
        label: "Demo",
        href: "",
      },
      {
        label: "Source",
        icon: "github",
        href: "",
      },
    ],
  },
] as ResourceItemProps[];

function Book() {
  const { address } = useAccount();
  const [transaction, setTransaction] = useState<`0x${string}` | undefined>();
  const [signedData, setSignedData] = useState<`0x${string}` | undefined>();

  return (
    <>
      <h2>Authenticate with your wallet</h2>
      <PlayCard>
        <PlayCard.Preview botMood={!address ? "dead" : "happy"}>
          <AuthenticationWidget />
        </PlayCard.Preview>

        <PlayCard.Code copy={AuthenticationWidget.String}>
          <AuthenticationWidget.Snippet />
        </PlayCard.Code>
      </PlayCard>

      <Divide />

      <h2>Sign a message</h2>

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

      <h2>Send a test transaction</h2>

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
