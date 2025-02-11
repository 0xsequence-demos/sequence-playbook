import { BuyWithCryptoCardWidget } from "~/examples/BuyWithCryptoCardWidget";
import { useAccount, useReadContract } from "wagmi";
import { AuthenticationWidget } from "~/examples/AuthenticationWidget";
import { PlayCard } from "../../components/playcard/PlayCard";
import { Resources } from "~/components/resources/Resources";
import { SALES_CONTRACT_ABI } from "~/utils/primary-sales/abis/salesContractAbi";
import { useSalesCurrency } from "~/hooks/useSalesCurrency";
import { saleConfiguration } from "~/utils/primary-sales/helpers";
import { ERC20_ABI } from "~/utils/primary-sales/ERC20/ERC20_abi";
import { NFT_TOKEN_CONTRACT_ABI } from "~/utils/primary-sales/abis/nftTokenContractAbi";
import { ItemsForSale } from "~/components/items-for-sale/ItemsForSale";
import { Link } from "react-router";
import { useState } from "react";
import { Card, Divider } from "boilerplate-design-system";
import { CopyToClipboardButton } from "../../components/copy-to-clipboard-button/CopyToClipboardButton";

export const formatPriceWithDecimals = (
  price: bigint,
  tokenDecimals: number,
): string => {
  if (!price) return null;
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
  name: "primary-sale-nft",
  path: "/monetize/primary-sale-nft",
  title: "Primary Sale for NFTs",
  shortname: "Primary Sale for NFTs",
  platforms: {
    unreal: "https://docs.sequence.xyz/sdk/unreal/introduction",
    unity: "https://docs.sequence.xyz/sdk/unity/overview",
    web: "https://docs.sequence.xyz/solutions/wallets/sequence-kit/getting-started",
  },
  image: {
    src: "primary-sale-nft",
  },
  description: "Let users Mint new NFTs, by purchase!",
} as const;

interface GlobalSalesDetailsData {
  cost: bigint;
  endtime: bigint;
  merkleRoot: string;
  startTime: bigint;
  supplyCap: bigint;
}

function component() {
  // return <h2>🚧 Coming soon! 🚧</h2>;
  const { address: userAddress, chainId } = useAccount();

  const { data: currencyData, isLoading: currencyDataIsLoading } =
    useSalesCurrency(saleConfiguration);
  const {
    data: tokenSaleDetailsData,
    // isLoading: tokenSaleDetailsDataIsLoading,
  } = useReadContract({
    abi: SALES_CONTRACT_ABI,
    functionName: "globalSaleDetails",
    chainId: saleConfiguration.chainId,
    address: saleConfiguration.salesContractAddress as `0x${string}`,
  });

  // Fetch the user payment currency balance
  const {
    data: userPaymentCurrencyBalance,
    // isLoading: userPaymentCurrencyBalanceIsLoading,
  } = useReadContract(
    currencyData?.address && userAddress
      ? {
          abi: ERC20_ABI,
          functionName: "balanceOf",
          chainId: saleConfiguration.chainId,
          address: currencyData.address as `0x${string}`,
          args: [userAddress],
          query: {
            refetchInterval: 30000,
            enabled: Boolean(currencyData?.address && userAddress),
          },
        }
      : undefined,
  );

  // Fetch the total minted NFTs
  const {
    data: nftsMinted,
    // isLoading: nftsMintedIsLoading,
    refetch: refetchTotalMinted,
  } = useReadContract({
    abi: NFT_TOKEN_CONTRACT_ABI,
    functionName: "totalSupply",
    chainId: chainId,
    address: saleConfiguration.nftTokenAddress,
  });

  const price =
    (tokenSaleDetailsData as GlobalSalesDetailsData)?.cost || BigInt(0);

  const currencyDecimals: number | undefined = currencyData?.decimals;

  const [somethingBought, setSomethingBought] = useState(false);

  return (
    <>
      <div className="py-8 prose">
        <h2>Buy an NFT from a primary sale</h2>
        <p>
          Primary sales for NFTs let you ask for the support your project needs
          from your community, while securely minting NFTs in return.
        </p>
        <p>When your NFT sale opens, your users can buy your NFTs</p>
      </div>
      <span>
        <Link
          className="underline"
          to="https://faucet.circle.com/"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          Get some USDC on arbitrum sepolia to play 👈
        </Link>
        {" - "}
        <CopyToClipboardButton
          value={userAddress?.toString()}
          className="inline underline"
        >
          Copy wallet address
        </CopyToClipboardButton>
      </span>

      <PlayCard>
        <PlayCard.Preview
          botMood={
            !userAddress ? "dead" : somethingBought ? "happy" : "neutral"
          }
        >
          {userAddress ? (
            <ItemsForSale
              chainId={saleConfiguration.chainId}
              collectionAddress={saleConfiguration.nftTokenAddress}
              userPaymentCurrencyBalance={userPaymentCurrencyBalance}
              price={price}
              currencyDecimals={currencyDecimals}
              currencyData={currencyData}
              currencyIsLoading={currencyDataIsLoading}
              saleConfiguration={saleConfiguration}
              refetchTotalMinted={refetchTotalMinted}
              setSomethingBought={setSomethingBought}
            />
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
          "primary-drop-sale-721-boilerplate"
        ]}
      />
    </>
  );
}

export default { info, component };
