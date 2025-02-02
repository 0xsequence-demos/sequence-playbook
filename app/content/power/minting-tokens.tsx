import { useAccount } from "wagmi";
import { PlayCard } from "../../components/playcard/PlayCard";
import { Resources } from "~/components/resources/Resources";
import { RequireWalletButton } from "~/components/require-wallet-button/RequireWalletButton";
import { useState } from "react";
import { MintTokenWidget } from "~/examples/MintTokenWidget";
import { Image } from "~/components/image/Image";
import "./minting-tokens.css";
import { MintStatus } from "~/examples/MintTokenWidget/MintTokenWidget";

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
  description: "Mint your own ERC20, ERC721 or ERC1155 tokens.",
} as const;

const dependencies = [MintTokenWidget];

const resources = ["server-side-transactions-boilerplate"];

function component() {
  const { address } = useAccount();

  const [mintStatus, setMintStatus] = useState<MintStatus>("notStarted");

  return (
    <>
      <h2>No Coding Necessary</h2>
      Using sequence.build, you can create your tokens and mint them from the
      browser
      <Image name="minting-via-builder" />
      <h2>Coding is Cool, Though</h2>
      We agree! Using the sequence API, you can create and mint tokens in ways
      only you can imagine.
      <PlayCard>
        <PlayCard.Preview
          botMood={
            !address ? "dead" : mintStatus === "successs" ? "happy" : "neutral"
          }
        >
          <div className="mallet">
            <Image
              name={
                mintStatus === "successs"
                  ? "mallet-crude"
                  : "mallet-crude-wireframe"
              }
            />
            <Image
              className={`glow ${mintStatus === "pending" ? "animated-fade" : "fade-out"}`}
              name={"mallet-crude-minting"}
            />
          </div>
          {address ? (
            <MintTokenWidget
              mintStatus={mintStatus}
              setMintStatus={setMintStatus}
            />
          ) : (
            <RequireWalletButton title="Connect to mint!" />
          )}
        </PlayCard.Preview>

        <PlayCard.Code
          copy={MintTokenWidget.String}
          steps={MintTokenWidget.steps}
        />
      </PlayCard>
      <Resources items={resources} />
    </>
  );
}

export default { info, component, dependencies };
