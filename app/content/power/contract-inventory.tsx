import { useAccount } from "wagmi";
import { ContractInventoryWidget } from "~/examples/ContractInventoryWidget";
import { PlayCard } from "../../components/playcard/PlayCard";
import { Resources } from "~/components/resources/Resources";

const info = {
  name: "contract-inventory",
  path: "/power/contract-inventory",
  title: "Game Inventory",
  shortname: "Game Inventory",
  platforms: {
    unreal: "https://docs.sequence.xyz/sdk/unreal/introduction",
    unity: "https://docs.sequence.xyz/sdk/unity/overview",
    telegram: "https://docs.sequence.xyz/guides/telegram-integration",
    web: "https://docs.sequence.xyz/solutions/wallets/sequence-kit/getting-started",
  },
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
      <h2>View Assets from a Single Contract</h2>
      Sequence Kit combines our Indexer with elegant out-of-the-box UI, to simplify realtime inventory viewing and management.
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
