import { useAccount } from "wagmi";
import { WalletInventoryWidget } from "~/examples/WalletInventoryWidget";
import { PlayCard } from "../../components/playcard/PlayCard";
import { Resources } from "~/components/resources/Resources";
import { Divide } from "~/components/divide/Divide";

const info = {
  name: "wallet-inventory",
  path: "/onboard/wallet-inventory",
  title: "View your Wallet Inventory via Sequence Kit",
  shortname: "Wallet Inventory",
  image: {
    src: "wallet-inventory",
  },
  description:
    "A simple and elegant way to view your wallet inventory, with Sequence Kit",
} as const;

const resources = ["gift-wallet-inventory-boilerplate"];

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

      <Resources items={resources} />
    </>
  );
}

export default { info, component };
