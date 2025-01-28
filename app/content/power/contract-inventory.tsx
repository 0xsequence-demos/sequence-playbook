import { useAccount } from "wagmi";
import { ContractInventoryWidget } from "~/examples/ContractInventoryWidget";
import { PlayCard } from "../../components/playcard/PlayCard";
import { Resources } from "~/components/resources/Resources";
import { includeResources } from "~/content/resources";

const info = {
  name: "contract-inventory",
  path: "/power/contract-inventory",
  title: "Contract Inventory",
  shortname: "Contract Inventory",
  image: {
    src: "contract-inventory",
  },
  description:
    "A simple and elegant way to view your wallet inventory for a specific contract, with Sequence Kit",
} as const;

const resources = ["gift-wallet-inventory-boilerplate"];

function component() {
  const { address } = useAccount();

  return (
    <>
      Sometimes a player just wants to see the items they have in the current
      game.
      <br />
      <br />
      It should be as simple as it sounds.
      <br />
      <br />
      With Sequence Kit, it is!
      <h2>View Assets from a Single Contract</h2>
      <PlayCard>
        <PlayCard.Preview botMood={!address ? "dead" : "happy"}>
          <ContractInventoryWidget />
        </PlayCard.Preview>

        <PlayCard.Code
          copy={ContractInventoryWidget.String}
          steps={ContractInventoryWidget.steps}
        />
      </PlayCard>
      <Resources items={resources} />
    </>
  );
}

export default { info, component };
