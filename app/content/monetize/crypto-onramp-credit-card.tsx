import { useAccount } from "wagmi";
import { BuyCryptoWidget } from "~/examples/BuyCryptoWidget";
import { PlayCard } from "../../components/playcard/PlayCard";
import { Resources } from "~/components/resources/Resources";

const info = {
  name: "crypto-onramp-credit-card",
  path: "/monetize/crypto-onramp-credit-card",
  title: "Onramp Crypto with a Credit Card via Sequence Kit",
  shortname: "Buy Crypto",
  image: {
    src: "buy-crypto",
    // width: 170,
    // height: 122,
    // className: "right-[-20px] top-[-10px]",
  },
  description: "Getting crypto in your wallet is easier than ever on mainnet.",
} as const;

function component() {
  const { address } = useAccount();

  return (
    <>
      <h2>Buy USDC with a Credit Card</h2>
      <PlayCard>
        <PlayCard.Preview botMood={!address ? "dead" : "happy"}>
          <BuyCryptoWidget />
        </PlayCard.Preview>

        <PlayCard.Code
          copy={BuyCryptoWidget.String}
          steps={BuyCryptoWidget.steps}
        />
      </PlayCard>

      <Resources
        items={["crypto-onramp-boilerplate", "sequence-pay-boilerplate"]}
      />
    </>
  );
}

export default { info, component };
