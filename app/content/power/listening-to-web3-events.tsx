import { useAccount } from "wagmi";
import { PlayCard } from "../../components/playcard/PlayCard";
import { Web3EventsWidget } from "~/examples/Web3EventsWidget";

const info = {
  name: "listening-to-web3-events",
  path: "/power/listening-to-web3-events",
  title: "Listen to Web3 Events",
  shortname: "Web3 Events",
  platforms: {
    unreal: "https://docs.sequence.xyz/sdk/unreal/introduction",
    unity: "https://docs.sequence.xyz/sdk/unity/overview",
    "react-native": "https://docs.sequence.xyz/sdk/mobile",
    telegram: "https://docs.sequence.xyz/guides/telegram-integration",
    web: "https://docs.sequence.xyz/solutions/wallets/sequence-kit/getting-started",
  },
  image: {
    src: "web3-events",
  },
  description: "Build responsive experiences that react to onchain activity in realtime.",
} as const;

function component() {
  const { address } = useAccount();

  return (
    <>
      Web3 events take the mystery out of the state of your onchain
      interactions.
      <br />
      <br />
      You can stop long-polling, and start listening to wallet updates in realtime.
      <h2>Listen to Web3 Events</h2>
      <PlayCard>
        <PlayCard.Preview botMood={!address ? "dead" : "happy"}>
          <Web3EventsWidget />
        </PlayCard.Preview>

        <PlayCard.Code
          copy={Web3EventsWidget.String}
          steps={Web3EventsWidget.steps}
        />
      </PlayCard>
    </>
  );
}

export default { info, component };
