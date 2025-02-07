import { SignMessageWidget } from "~/examples/SignMessageWidget";
import { useAccount, useReadContract } from "wagmi";
import { AuthenticationWidget } from "~/examples/AuthenticationWidget";
import { PlayCard } from "../../components/playcard/PlayCard";
import { Resources } from "~/components/resources/Resources";
import { Divide } from "~/components/divide/Divide";
import { SALES_CONTRACT_ABI } from "~/utils/primary-sales/abis/salesContractAbi";
import { useSalesCurrency } from "~/hooks/useSalesCurrency";
import { saleConfiguration } from "~/utils/primary-sales/helpers";
import { ERC20_ABI } from "~/utils/primary-sales/ERC20/ERC20_abi";
import { NFT_TOKEN_CONTRACT_ABI } from "~/utils/primary-sales/abis/nftTokenContractAbi";
import { ItemsForSale } from "~/components/items-for-sale/ItemsForSale";
import { Link } from "react-router";

const info = {
  name: "primary-sale-nft",
  path: "/monetize/primary-sale-nft",
  title: "Primary sale for NFTs",
  shortname: "Primary sale for NFTs",
  image: {
    src: "primary-sale-nft",
    // width: 170,
    // height: 122,
    // className: "right-[-20px] top-[-10px]",
  },
  description: "Let users Mint new NFTs, by purchase!",
} as const;

const resources = [
  "primary-drop-sale-721-boilerplate",
  "primary-sale-1155-boilerplate",
];

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

  return (
    <>
      Primary sales for NFTs let you ask for the support your project needs from
      your community, while securely minting NFTs in return.
      {/* <h2>Audience</h2>
      Users can sign up in advance, as part of a premint
      <PlayCard>
        <PlayCard.Preview botMood={!userAddress ? "dead" : "happy"}>
          <AuthenticationWidget />
        </PlayCard.Preview>

        <PlayCard.Code
          copy={AuthenticationWidget.String}
          steps={AuthenticationWidget.steps}
        />
      </PlayCard>
      <Divide /> */}
      <h2>Buy an NFT from a primary sale</h2>
      When your NFT sale opens, your users can buy your NFTs
      <Link className="underline" to="https://faucet.circle.com/" target="_blank" referrerPolicy="no-referrer">Get some USDC on arbitrum sepolia to play 👈</Link>
      <PlayCard>
        <PlayCard.Preview
          botMood={!userAddress ? "dead" : "neutral"}
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
            />
          ) : (
            <AuthenticationWidget />
          )}
          {/* </Group> */}
        </PlayCard.Preview>

        <PlayCard.Code
          copy={SignMessageWidget.String}
          steps={SignMessageWidget.steps}
        />
      </PlayCard>
      <Resources items={resources} />
    </>
  );
}

export default { info, component };
