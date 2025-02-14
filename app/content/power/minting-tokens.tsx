import { useAccount } from "wagmi";
import { PlayCard } from "../../components/playcard/PlayCard";
import { Resources } from "~/components/resources/Resources";
import { RequireWalletButton } from "~/components/require-wallet-button/RequireWalletButton";
import { useEffect, useState } from "react";
import { Divide } from "~/components/divide/Divide";
import { MintTokenWidget } from "~/examples/MintTokenWidget";
import "./minting-tokens.css";
import { MintStatus } from "~/examples/MintTokenWidget/MintTokenWidget";
import View3D from "~/components/View3D";
import PickAxe3D from "~/components/PickAxe3D";
import MiningGame from "~/components/MiningGame";
import ItemViewer3D from "~/components/ItemViewer3D";
import { toast } from "sonner";

const info = {
  name: "minting-tokens",
  path: "/power/minting-tokens",
  title: "Minting Tokens",
  shortname: "Minting Tokens",
  platforms: {
    unreal: "https://docs.sequence.xyz/sdk/unreal/introduction",
    unity: "https://docs.sequence.xyz/sdk/unity/overview",
    "react-native": "https://docs.sequence.xyz/sdk/mobile",
    telegram: "https://docs.sequence.xyz/guides/telegram-integration",
    web: "https://docs.sequence.xyz/solutions/wallets/sequence-kit/getting-started",
  },
  image: {
    src: "minting-tokens",
    // width: 170,
    // height: 122,
    // className: "right-[-20px] top-[-10px]",
  },
  description:
    "Batch, parallelize, and mint at scale your own ERC20, ERC721 or ERC1155 tokens with our Transactions API.",
} as const;

const dependencies = [MintTokenWidget];

function component() {
  const { address } = useAccount();

  const [mintStatus, setMintStatus] = useState<MintStatus>("notStarted");
  const [demoMode, setDemoMode] = useState<"mint" | "play">("mint");
  useEffect(() => {
    if (mintStatus === "successs") {
      toast("Iron Pickaxe minted to your wallet!");
      setTimeout(() => {
        setDemoMode("play");
      }, 1500);
    }
  }, [mintStatus]);

  return (
    <>
      <h2>Minting at Scale</h2>
      Create an admin wallet on your backend with access control to precisely
      manage your mints securely.
      <PlayCard>
        <PlayCard.Preview
          botMood={
            !address ? "dead" : mintStatus === "successs" ? "happy" : "neutral"
          }
        >
          <div className="rounded-[0.5rem] overflow-clip flex flex-col bg-deep-purple-900 items-start">
            <div className="grid grid-cols-1 grid-row-1 [&_>picture]:col-start-1 [&_>picture]:row-start-1 [&_>picture]:content-center overflow-clip aspect-square max-w-[24rem] w-full">
              {/* <Image
                name={
                  mintStatus === "successs"
                    ? "mallet-crude"
                    : "mallet-crude-wireframe"
                }
              />
              <Image
                className={`glow ${mintStatus === "pending" ? "animated-fade" : "fade-out"}`}
                name={"mallet-crude-minting"}
              /> */}
              <View3D env={demoMode === "play" ? "mine" : "item"}>
                {/* <MiningGame /> */}
                {demoMode === "play" ? (
                  <MiningGame />
                ) : (
                  <ItemViewer3D>
                    <PickAxe3D mintStatus={mintStatus} />
                  </ItemViewer3D>
                )}
              </View3D>
            </div>
            <div className="p-4">
              {address ? (
                <MintTokenWidget
                  mintStatus={mintStatus}
                  setMintStatus={setMintStatus}
                />
              ) : (
                <RequireWalletButton title="Connect to mint!" />
              )}
            </div>
          </div>
        </PlayCard.Preview>

        <PlayCard.Code
          copy={MintTokenWidget.String}
          steps={MintTokenWidget.steps}
        />
      </PlayCard>
      <Divide />
      <Resources items={["server-side-transactions-boilerplate"]} />
    </>
  );
}

export default { info, component, dependencies };
