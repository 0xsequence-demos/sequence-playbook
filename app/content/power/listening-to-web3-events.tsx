import { useAccount } from "wagmi";
import { AuthenticationWidget } from "~/examples/AuthenticationWidget";
import { PlayCard } from "../../components/playcard/PlayCard";
import { Web3EventsWidget } from "~/examples/Web3EventsWidget";

const info = {
  name: "listening-to-web3-events",
  path: "/power/listening-to-web3-events",
  title: "Listen to Web3 Events",
  shortname: "Web3 Events",
  image: {
    src: "web3-events",
  },
  description: "Build responsive experiences that react to onchain activity.",
} as const;

function component() {
  const { address } = useAccount();

  return (
    <>
      Web3 events take the mystery out of the state of your onchain
      interactions.
      <br />
      <br />
      You can stop long-polling, and start listening to wallet updates.
      <h2>Listen to Web3 Events</h2>
      <PlayCard>
        <PlayCard.Preview botMood={!address ? "dead" : "happy"}>
          <AuthenticationWidget />
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
