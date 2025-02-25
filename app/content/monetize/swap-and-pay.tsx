import { BuyWithCryptoCardWidget } from "~/examples/BuyWithCryptoCardWidget";
import { useAccount } from "wagmi";
import { AuthenticationWidget } from "~/examples/AuthenticationWidget";
import { PlayCard } from "../../components/playcard/PlayCard";
import { Resources } from "~/components/resources/Resources";

import { useSwapModal, type SwapModalSettings } from "@0xsequence/kit-checkout";
import { ethers } from "ethers";
import { WalletConnectionDetail } from "~/components/wallet-connection-detail/WalletConnectionDetail";
import { ChainId } from "@0xsequence/network";
import { ERC20_ABI } from "~/utils/primary-sales/ERC20/ERC20_abi";
import { chain } from "react-aria";

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

const currecyAddressUSDC = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";

function component() {
  const { address: userAddress, chainId = ChainId.MAINNET } = useAccount();
  const { openSwapModal } = useSwapModal();

  const onClickSwap = () => {
    const currencyAmount = "20000";

    const contractAbiInterface = new ethers.Interface(ERC20_ABI);

    const data = contractAbiInterface.encodeFunctionData("transfer", [
      "0x37470dac8a0255141745906c972e414b1409b470",
      ethers.parseUnits("0.2", 6),
    ]) as `0x${string}`;

    const swapModalSettings: SwapModalSettings = {
      onSuccess: () => {
        console.log("swap successful!");
      },
      chainId,
      currencyAddress: currecyAddressUSDC,
      currencyAmount,
      postSwapTransactions: [
        {
          to: "0x37470dac8a0255141745906c972e414b1409b470",
          data,
        },
      ],
      title: "Swap and Pay",
      description: "Select a token in your wallet to swap to 0.2 USDC.",
    };

    openSwapModal(swapModalSettings);
  };

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
            <>
              <WalletConnectionDetail address={userAddress} />

              <button onClick={onClickSwap}>Swap and Pay</button>
            </>
          ) : (
            <AuthenticationWidget />
          )}
          {/* </Group> */}
        </PlayCard.Preview>

        <PlayCard.Code
          copy={BuyWithCryptoCardWidget.String}
          steps={BuyWithCryptoCardWidget.steps}
        />
      </PlayCard>
      <Resources
        items={[
          "primary-sale-1155-boilerplate",
          "primary-drop-sale-721-boilerplate",
        ]}
      />
    </>
  );
}

export default { info, component };
