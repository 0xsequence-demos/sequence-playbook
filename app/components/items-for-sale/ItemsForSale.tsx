import { useAccount } from "wagmi";

import { useTokenMetadata, useCollectionBalance } from "../../hooks/data";
import { TokenMetadata } from "@0xsequence/indexer";
import { ContractInfo } from "@0xsequence/metadata";
import { Collectible } from "../collectable/Collectable";
import { UnpackedSaleConfigurationProps } from "~/utils/primary-sales/helpers";
import { CollectableSkeleton } from "../collectable/CollectableSkeleton";
import { Dispatch, SetStateAction } from "react";

interface ItemsForSaleProps {
  collectionAddress: string;
  chainId: number;
  userPaymentCurrencyBalance: bigint | undefined;
  price: bigint;
  currencyDecimals: number | undefined;
  currencyData: ContractInfo | undefined;
  currencyIsLoading: boolean;
  saleConfiguration: UnpackedSaleConfigurationProps;
  refetchTotalMinted: () => void;
  setSomethingBought: Dispatch<SetStateAction<boolean>>;
}

export const ItemsForSale = ({
  collectionAddress,
  chainId,
  userPaymentCurrencyBalance,
  price,
  currencyDecimals,
  currencyData,
  currencyIsLoading,
  saleConfiguration,
  refetchTotalMinted,
  setSomethingBought,
}: ItemsForSaleProps) => {
  const { address: userAddress } = useAccount();
  const {
    data: collectionBalanceData,
    isLoading: collectionBalanceIsLoading,
    refetch: refetchCollectionBalance,
  } = useCollectionBalance({
    accountAddress: userAddress || "",
    contractAddress: collectionAddress,
    chainId,
    includeMetadata: false,
    verifiedOnly: false,
  });

  const { data: tokenMetadatas, isLoading: tokenMetadatasLoading } =
    useTokenMetadata(
      chainId,
      collectionAddress,
      saleConfiguration.itemsForSale.map((item) => item.tokenId),
    );

  const isLoading =
    tokenMetadatasLoading || collectionBalanceIsLoading || currencyIsLoading;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-4 justify-center px-4 pb-8">
      {isLoading ? (
        <>
          <CollectableSkeleton />
          <CollectableSkeleton />
        </>
      ) : (
        <>
          {/* @ts-expect-error TokenMetadata unknown */}
          {tokenMetadatas?.map((tokenMetadata: TokenMetadata) => {
            const collectibleBalance = collectionBalanceData?.find(
              (balance) => balance?.tokenID === tokenMetadata.tokenId,
            );

            return (
              <Collectible
                key={collectionAddress + tokenMetadata.tokenId}
                collectibleBalance={collectibleBalance}
                tokenMetadata={tokenMetadata}
                chainId={chainId}
                currencyData={currencyData}
                userPaymentCurrencyBalance={userPaymentCurrencyBalance}
                price={price}
                currencyDecimals={currencyDecimals}
                saleConfiguration={saleConfiguration}
                refetchCollectionBalance={refetchCollectionBalance}
                refetchTotalMinted={refetchTotalMinted}
                setSomethingBought={setSomethingBought}
              />
            );
          })}
        </>
      )}
    </div>
  );
};
