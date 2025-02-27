import { useOpenConnectModal } from "@0xsequence/kit";
import { SendTestTransactionWidget } from "~/examples/SendTestTransactionWidget";
import { SignMessageWidget } from "~/examples/SignMessageWidget";
import { useAccount } from "wagmi";
import { useState } from "react";
import { AuthenticationWidget } from "~/examples/AuthenticationWidget";
import { PlayCard } from "../../components/playcard/PlayCard";
import { Resources } from "~/components/resources/Resources";
import { Divide } from "~/components/divide/Divide";
import { RequireWalletButton } from "~/components/require-wallet-button/RequireWalletButton";
import { BookInfo, Topic, type Book } from "~/content/types";
// import { serverOnly$ } from "vite-env-only/macros";
// import { Form, useActionData } from "react-router";
// import { useWidgetActionData } from "~/hooks/useWidgetActionData";

const info = {
  name: "user-authentication",
  path: "/onboard/user-authentication",
  title: "User Authentication with Sequence",
  shortname: "User Authentication",
  image: {
    src: "user-authentication",
  },
  platforms: {
    unreal: "https://docs.sequence.xyz/sdk/unreal/introduction",
    unity: "https://docs.sequence.xyz/sdk/unity/overview",
    "react-native": "https://docs.sequence.xyz/sdk/mobile",
    telegram: "https://docs.sequence.xyz/guides/telegram-integration",
    web: "https://docs.sequence.xyz/solutions/wallets/sequence-kit/getting-started",
  },
  description: "Everything starts with user authentication.",
} as BookInfo;

const dependencies = [AuthenticationWidget];

// const loader = serverOnly$(async function () {
//   return {
//     test: "test",
//   };
// });

// const action = serverOnly$(async function () {
//   return {
//     test: "action test",
//   };
// });

function component(data: {
  book: Book;
  topic: Topic;
  widgets: Record<string, unknown>;
}) {
  const { address } = useAccount();
  const [transaction, setTransaction] = useState<`0x${string}` | undefined>();
  const [signedData, setSignedData] = useState<`0x${string}` | undefined>();

  const { setOpenConnectModal } = useOpenConnectModal();

  return (
    <>
      <h2>Authentication made easy.</h2>
      Sequence provides a wide variety of authentication options, from web2 to
      web3. All easily configurable and customizable for your brand.
      <PlayCard>
        <PlayCard.Code
          copy={AuthenticationWidget.String}
          steps={AuthenticationWidget.steps}
        />
        <PlayCard.Preview botMood={!address ? "dead" : "happy"}>
          <AuthenticationWidget />
        </PlayCard.Preview>
      </PlayCard>
      That's how simple it is.
      <br />
      {address ? (
        <>Go ahead, test out your wallet.</>
      ) : (
        <p>
          Go ahead, try{" "}
          <button
            onClick={() => setOpenConnectModal(true)}
            className="inline-flex underline"
          >
            connecting
          </button>{" "}
          with your email or social to see the power of Sequence embedded
          wallets.
        </p>
      )}
      <Divide />
      <h2>Sign a message</h2>
      No popups, no modals. Seamless UX with a cross-platform, non-custodial
      wallet.
      <PlayCard>
        <PlayCard.Code
          copy={SignMessageWidget.String}
          steps={SignMessageWidget.steps}
        ></PlayCard.Code>

        <PlayCard.Preview
          botMood={!address ? "dead" : signedData ? "happy" : "neutral"}
        >
          {address ? (
            <SignMessageWidget setData={setSignedData} />
          ) : (
            <RequireWalletButton title="Connect a wallet test signing a message" />
          )}
        </PlayCard.Preview>
      </PlayCard>
      <Divide />
      <h2>Send a transaction</h2>
      Built on top of wagmi for web, making integration and usage a breeze.
      <PlayCard>
        <PlayCard.Code
          copy={SendTestTransactionWidget.String}
          steps={SendTestTransactionWidget.steps}
        ></PlayCard.Code>
        <PlayCard.Preview
          botMood={!address ? "dead" : transaction ? "happy" : "neutral"}
        >
          {address ? (
            <SendTestTransactionWidget setData={setTransaction} />
          ) : (
            <RequireWalletButton title="Connect a wallet to send a transaction" />
          )}
        </PlayCard.Preview>
      </PlayCard>
      <br />
      Onboarding is only the beginning.
      <br />
      <Divide />
      Check out the rest of the Sequence BluePrints to see how we enable
      everything from monetization to your backend.
      <Resources
        title="Get started quickly with our range of boilerplates covering a range of frameworks, platforms, and login methods."
        items={[
          "kit-embedded-wallet-nextjs-boilerplate",
          "kit-embedded-wallet-react-boilerplate",
          "kit-embedded-wallet-remix-cloudflare-boilerplate",
          "kit-embedded-wallet-remix-nodejs-boilerplate",
          "email-embedded-wallet-react-boilerplate",
          "google-embedded-wallet-react-boilerplate",
          "embedded-wallet-playfab-react-boilerplate",
        ]}
      />
    </>
  );
}

export default {
  info,
  dependencies,
  component,
  // loader,
  // action,
};
