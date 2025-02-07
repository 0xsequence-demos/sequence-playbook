import { useAccount } from "wagmi";
import { WalletInventoryWidget } from "~/examples/WalletInventoryWidget";
import { PlayCard } from "../../components/playcard/PlayCard";
import { Resources } from "~/components/resources/Resources";
import { Divide } from "~/components/divide/Divide";

const info = {
  name: "wallet-inventory",
  path: "/onboard/wallet-inventory",
  title: "View your Wallet Inventory",
  shortname: "Wallet Inventory",
  platforms: {
    unreal: "https://docs.sequence.xyz/sdk/unreal/introduction",
    unity: "https://docs.sequence.xyz/sdk/unity/overview",
    web: "https://docs.sequence.xyz/solutions/wallets/sequence-kit/getting-started",
  },
  image: {
    src: "wallet-inventory",
  },
  description:
    "A simple and elegant way for your users to manage their assets",
} as const;

function component() {
  const { address } = useAccount();

  return (
    <>
      <h2>View every asset in your wallet</h2>
      <PlayCard>
        <PlayCard.Preview botMood={!address ? "dead" : "happy"}>
          <WalletInventoryWidget />
        </PlayCard.Preview>

        <PlayCard.Code
          copy={WalletInventoryWidget.String}
          steps={WalletInventoryWidget.steps}
        />
      </PlayCard>

      <Divide />

    </>
  );
}

export default { info, component };
