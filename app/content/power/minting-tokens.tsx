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
  description: "Batch, parallelize, and mint at scale your own ERC20, ERC721 or ERC1155 tokens with our Transactions API.",
} as const;

const dependencies = [MintTokenWidget];

function component() {
  const { address } = useAccount();

  const [mintStatus, setMintStatus] = useState<MintStatus>("notStarted");

  return (
    <>
      <h2>Minting at Scale</h2>
      Create an admin wallet on your backend with built-in access control with our contracts to precisely manage your mints securely.
      <PlayCard>
        <PlayCard.Preview
          botMood={
            !address ? "dead" : mintStatus === "successs" ? "happy" : "neutral"
          }
        >
          <div className="flex flex-1 items-center justify-center">
            <div className="overflow-clip rounded-[1rem]">
              <div className="grid grid-cols-1 grid-row-1 [&_>picture]:col-start-1 [&_>picture]:row-start-1 [&_>picture]:content-center">
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
            </div>
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
      <Resources items={["server-side-transactions-boilerplate"]} />
    </>
  );
}

export default { info, component, dependencies };
