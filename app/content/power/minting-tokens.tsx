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
import { useFetcher } from "react-router";

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
  const [pickaxeSecured, setPickaxeSecured] = useState(false);

  const [pickaxeMintStatus, setPickaxeMintStatus] =
    useState<MintStatus>("notStarted");

  const [gemMintStatus, setGemMintStatus] = useState<MintStatus>("notStarted");

  const gemMinter = useFetcher({ key: "mint-gem" });

  const [itemInHands, setItemInHands] = useState<"sun gem" | "moon gem" | null>(
    null,
  );

  useEffect(() => {
    if (!address || !itemInHands || gemMintStatus !== "notStarted") {
      return;
    }
    setGemMintStatus("pending");
    setItemInHands(null);
    const formData = new FormData();
    formData.set("walletAddress", address);
    formData.set("tokenId", itemInHands === "sun gem" ? "13" : "14");
    gemMinter
      .submit(formData, {
        action: "/api/mint",
        method: "POST",
        encType: "multipart/form-data",
      })
      .then((result) => {
        setGemMintStatus("success");
        console.log(result, gemMinter.data, gemMinter.json, gemMinter);
        setTimeout(() => setGemMintStatus("notStarted"), 4000);
      });
  }, [address, gemMintStatus, gemMinter, itemInHands]);

  const [demoMode, setDemoMode] = useState<"mint" | "play">("mint");
  useEffect(() => {
    if (pickaxeMintStatus === "success") {
      toast("Iron Pickaxe minted to your wallet!");
      setTimeout(() => {
        setDemoMode("play");
        setPickaxeSecured(true);
      }, 1500);
    }
  }, [pickaxeMintStatus]);

  return (
    <>
      <h2>Minting at Scale</h2>
      Create an admin wallet on your backend with access control to precisely
      manage your mints securely.
      <PlayCard>
        <PlayCard.Preview
          botMood={
            !address
              ? "dead"
              : pickaxeMintStatus === "success"
                ? "happy"
                : "neutral"
          }
        >
          <div className="rounded-[0.5rem] overflow-clip flex flex-col bg-deep-purple-900 items-start">
            <div className="grid grid-cols-1 grid-row-1 [&_>picture]:col-start-1 [&_>picture]:row-start-1 [&_>picture]:content-center overflow-clip aspect-square max-w-[24rem] w-full">
              <View3D env={demoMode === "play" ? "mine" : "item"}>
                {demoMode === "play" ? (
                  <MiningGame
                    collectGemSun={() => setItemInHands("sun gem")}
                    collectGemMoon={() => setItemInHands("moon gem")}
                  />
                ) : (
                  <ItemViewer3D>
                    <PickAxe3D mintStatus={pickaxeMintStatus} />
                  </ItemViewer3D>
                )}
              </View3D>
            </div>
            <div className="p-4">
              {address ? (
                !pickaxeSecured ? (
                  <MintTokenWidget
                    mintStatus={pickaxeMintStatus}
                    setMintStatus={setPickaxeMintStatus}
                  />
                ) : gemMintStatus === "pending" ? (
                  <>Minting Gem...</>
                ) : gemMintStatus === "success" ? (
                  <>
                    Gem{" "}
                    <a
                      href={`https://sepolia.arbiscan.io/tx/${gemMinter.data?.hash}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <b>Minted!</b>
                    </a>
                  </>
                ) : (
                  <>Go deeper into the mines!</>
                )
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
