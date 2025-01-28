import { SignMessageWidget } from "~/examples/SignMessageWidget";
import { useAccount } from "wagmi";
import { useState } from "react";
import { AuthenticationWidget } from "~/examples/AuthenticationWidget";
import { PlayCard } from "../../components/playcard/PlayCard";
import { Resources } from "~/components/resources/Resources";
import { Divide } from "~/components/divide/Divide";
import { RequireWalletButton } from "~/components/require-wallet-button/RequireWalletButton";

const info = {
  name: "primary-sale-nft",
  path: "/monetize/primary-sale-nft",
  title: "Primary sale for NFTs",
  shortname: "Primary sale for NFTs",
  image: {
    src: "primary-sale-nft",
    // width: 170,
    // height: 122,
    // className: "right-[-20px] top-[-10px]",
  },
  description: "Let users Mint new NFTs, by purchase!",
} as const;

const resources = [
  "primary-drop-sale-721-boilerplate",
  "primary-sale-1155-boilerplate",
];

function component() {
  const { address } = useAccount();
  const [transaction, setTransaction] = useState<`0x${string}` | undefined>();
  const [signedData, setSignedData] = useState<`0x${string}` | undefined>();

  return (
    <>
      Primary sales for NFTs let you ask for the support your project needs from
      your community, while securely minting NFTs in return.
      <h2>Audience</h2>
      Users can sign up in advance, as part of a premint
      <PlayCard>
        <PlayCard.Preview botMood={!address ? "dead" : "happy"}>
          <AuthenticationWidget />
        </PlayCard.Preview>

        <PlayCard.Code
          copy={AuthenticationWidget.String}
          steps={AuthenticationWidget.steps}
        />
      </PlayCard>
      <Divide />
      <h2>Buy an NFT from a primary sale</h2>
      When your NFT sale opens, your users can buy your NFTs
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

        <PlayCard.Code
          copy={SignMessageWidget.String}
          steps={SignMessageWidget.steps}
        />
      </PlayCard>
      <Resources items={resources} />
    </>
  );
}

export default { info, component };
