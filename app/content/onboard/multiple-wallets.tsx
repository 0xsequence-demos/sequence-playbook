import { PlayCard } from "../../components/playcard/PlayCard";
import { Resources } from "~/components/resources/Resources";
import { MultipleWalletConnectWidget } from "~/examples/MultipleWalletConnectWidget";
import { useAccount } from "wagmi";
import { ResourceName } from "../resources";

const info = {
  name: "multiple-wallets",
  path: "/onboard/multiple-wallets",
  title: "Wallet Linking for Better Wallet Management",
  shortname: "Multiple Wallets",
  image: {
    src: "multiple-wallets",
  },
  description: "Link Multiple Wallets to bring your players' assets together",
} as const;

const resources: ResourceName[] = ["wallet-linking-boilerplate"];

const dependencies = [MultipleWalletConnectWidget];

function component() {
  const { address } = useAccount();

  return (
    <>
      <h2>Nobody has just one wallet anymore</h2>
      Make life easier for your users, by letting them link wallets together and
      stop shuffling assets back and forth
      <PlayCard>
        <PlayCard.Preview botMood={!address ? "dead" : "happy"}>
          <MultipleWalletConnectWidget />
        </PlayCard.Preview>

        <PlayCard.Code
          copy={MultipleWalletConnectWidget.String}
          steps={MultipleWalletConnectWidget.steps}
        />
      </PlayCard>
      <Resources items={resources} />
    </>
  );
}

export default {
  info,
  component,
  dependencies
};
