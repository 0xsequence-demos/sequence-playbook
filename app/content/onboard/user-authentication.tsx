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
import { includeResources } from "~/content/resources";

const info = {
  name: "user-authentication",
  path: "/onboard/user-authentication",
  title: "User Authentication via Sequence Embedded Wallet",
  shortname: "User Authentication",
  image: {
    src: "user-authentication",
    // width: 170,
    // height: 122,
    // className: "right-[-20px] top-[-10px]",
  },
  description: "Everything starts with user authentication.",
} as const;

const resources = includeResources([
  "email-embedded-wallet-react-boilerplate",
  "embedded-wallet-playfab-react-boilerplate",
  "google-embedded-wallet-react-boilerplate",
  "kit-embedded-wallet-nextjs-boilerplate",
  "kit-embedded-wallet-react-boilerplate",
  "kit-embedded-wallet-remix-cloudflare-boilerplate",
  "kit-embedded-wallet-remix-nodejs-boilerplate",
  "kit-universal-wallet-nextjs-boilerplate",
  "kit-universal-wallet-react-boilerplate",
  "stytch-embedded-wallet-react-boilerplate",
  "telegram-kit-embedded-wallet-react-boilerplate",
  "telegram-metamask-react-boilerplate",
  "telegram-sequencejs-react-boilerplate",
  "universal-wallet-react-boilerplate",
]);

function Book() {
  const { address } = useAccount();
  const [transaction, setTransaction] = useState<`0x${string}` | undefined>();
  const [signedData, setSignedData] = useState<`0x${string}` | undefined>();

  const { setOpenConnectModal } = useOpenConnectModal();
  return (
    <>
      <h2>Authenticate with an embedded wallet</h2>
      Sequence Kit provides a wide variety of login providers, all easily
      configured.
      <PlayCard>
        <PlayCard.Preview botMood={!address ? "dead" : "happy"}>
          <AuthenticationWidget />
        </PlayCard.Preview>

        <PlayCard.Code copy={AuthenticationWidget.String}>
          <AuthenticationWidget.Snippet />
        </PlayCard.Code>
      </PlayCard>
      <Divide />
      That's how simple it is.
      <br />
      {address ? (
        <>Go ahead, test out your embedded wallet...</>
      ) : (
        <>
          Go ahead,{" "}
          <span onClick={() => setOpenConnectModal(true)}>Connect</span> now to
          see what you can do with your embedded wallet...
        </>
      )}
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
      This is only the beginning.
      <br />
      Maybe you want to sell items to your users. <br />
      Maybe you want to reward your players, or provide a marketplace for peer
      to peer transactions.
      <Resources
        title="If you want to explore authentication deeper, these boilerplates cover a wide variety of platforms and login methods"
        items={resources}
      />
    </>
  );
}

export default Object.assign(Book, { info });
