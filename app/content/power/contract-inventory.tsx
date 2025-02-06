import { useAccount } from "wagmi";
import { ContractInventoryWidget } from "~/examples/ContractInventoryWidget";
import { PlayCard } from "../../components/playcard/PlayCard";
import { Resources } from "~/components/resources/Resources";

const info = {
  name: "contract-inventory",
  path: "/power/contract-inventory",
  title: "Game Inventory",
  shortname: "Game Inventory",
  image: {
    src: "contract-inventory",
  },
  description:
    "Simplify the experience for your users by showing them only the assets relevant to your game or app.",
} as const;

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
    </>
  );
}

export default { info, component };
