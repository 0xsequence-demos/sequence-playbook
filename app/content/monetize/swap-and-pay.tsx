import { useAccount } from "wagmi";
import { AuthenticationWidget } from "~/examples/AuthenticationWidget";
import { PlayCard } from "../../components/playcard/PlayCard";

import { SwapAndPayWidget } from "~/examples/SwapAndPayWidget";

export const formatPriceWithDecimals = (
  price: bigint,
  tokenDecimals: number,
): string => {
  if (!price) {
    return "";
  }
  const divisor = BigInt(10 ** tokenDecimals);

  const integerPart = price / divisor;
  const decimalPart = price % divisor;

  let formattedDecimal = decimalPart.toString().padStart(tokenDecimals, "0");

  formattedDecimal = formattedDecimal.replace(/0+$/, "");

  return formattedDecimal
    ? `${integerPart.toString()}.${formattedDecimal}`
    : integerPart.toString();
};

const info = {
  name: "swap-and-pay",
  path: "/monetize/swap-and-pay",
  title: "Swap and Sequence Pay",
  shortname: "Swap and Sequence Pay",
  platforms: {
    web: "https://docs.sequence.xyz/solutions/wallets/sequence-kit/smart-swaps",
  },
  image: {
    src: "swap-and-pay",
  },
  description:
    "Seamlessly swap eligible currencies in your wallet to a target currency",
} as const;

function component() {
  const { address: userAddress } = useAccount();

  return (
    <>
      <div className="py-8 prose">
        <h2>Swap tokens and pay in a single transaction</h2>
        <p>
          Sequence's Swap and Pay feature allows users to swap any token they
          own into the required payment token and complete a purchase in a
          single transaction, creating a seamless user experience.
        </p>
        <p>
          Users can pay with whatever tokens they have in their wallet without
          worrying about token conversions
        </p>
      </div>

      <PlayCard>
        <PlayCard.Preview botMood={!userAddress ? "dead" : "neutral"}>
          {userAddress ? (
            <SwapAndPayWidget setData={console.log} />
          ) : (
            <AuthenticationWidget />
          )}
          {/* </Group> */}
        </PlayCard.Preview>

        <PlayCard.Code
          copy={SwapAndPayWidget.String}
          steps={SwapAndPayWidget.steps}
        />
      </PlayCard>
    </>
  );
}

export default { info, component };
