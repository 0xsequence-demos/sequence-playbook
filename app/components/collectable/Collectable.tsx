import { BuyWithCryptoCardWidget } from "../../examples/BuyWithCryptoCardWidget";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ContractInfo, TokenMetadata } from "@0xsequence/metadata";

import { NFT_TOKEN_CONTRACT_ABI } from "~/utils/primary-sales/abis/nftTokenContractAbi";
import { useReadContract } from "wagmi";
import {
  UnpackedSaleConfigurationProps,
  formatPriceWithDecimals,
} from "~/utils/primary-sales/helpers";
import { Form, Svg, Image } from "boilerplate-design-system";
import { findSupportedNetwork } from "@0xsequence/network";

interface CollectibleProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  collectibleBalance: { [key: string]: any } | undefined;
  tokenMetadata: TokenMetadata;
  chainId: number;
  currencyData: ContractInfo | undefined;
  userPaymentCurrencyBalance: bigint | undefined;
  price: bigint;
  currencyDecimals: number | undefined;
  saleConfiguration: UnpackedSaleConfigurationProps;
  refetchCollectionBalance: () => void;
  refetchTotalMinted: () => void;
  setSomethingBought: Dispatch<SetStateAction<boolean>>;
}

export const Collectible = ({
  collectibleBalance,
  tokenMetadata,
  chainId,
  currencyData,
  userPaymentCurrencyBalance,
  price,
  currencyDecimals,
  saleConfiguration,
  refetchCollectionBalance,
  refetchTotalMinted,
  setSomethingBought,
}: CollectibleProps) => {
  const [amount] = useState(1);
  const [successfultxHash, setSuccessfulTxHash] = useState("");
  const logoURI =
    currencyData?.symbol === "USDC" && !currencyData?.logoURI
      ? "/images/usdc-logo.svg"
      : currencyData?.logoURI;

  const {
    data: nftsMinted,
    // isLoading: nftsMintedIsLoading,
    refetch: refetchNftsMinted,
  } = useReadContract({
    abi: NFT_TOKEN_CONTRACT_ABI,
    functionName: "tokenSupply",
    chainId: chainId,
    address: saleConfiguration.nftTokenAddress,
    args: [BigInt(tokenMetadata?.tokenId)],
  });

  const amountOwned: string = collectibleBalance?.balance || "0";

  const formattedPrice = currencyDecimals
    ? formatPriceWithDecimals(price, currencyDecimals)
    : 0;

  const [txExplorerUrl, setTxExplorerUrl] = useState("");

  useEffect(() => {
    if (!successfultxHash) {
      return;
    }
    setSomethingBought(true);
    refetchCollectionBalance();
    refetchTotalMinted();
    refetchNftsMinted();
    const chainInfoResponse = findSupportedNetwork(chainId);
    if (chainInfoResponse) {
      setTxExplorerUrl(
        `${chainInfoResponse?.blockExplorer?.rootUrl}/tx/${successfultxHash}`,
      );
    }
    console.log("success!", successfultxHash);
  }, [successfultxHash]);

  return (
    <div className="bg-deep-purple-950 text-left rounded-[1rem] flex flex-col overflow-clip">
      {tokenMetadata?.image ? (
        <Image
          className=" w-full max-w-[28rem] mx-auto aspect-square "
          src={tokenMetadata?.image}
        />
      ) : (
        <div className=" w-full max-w-[28rem] mx-auto aspect-square rounded-[0.5rem] bg-grey-800"></div>
      )}

      <div className="flex flex-col gap-4 pt-4">
        <div className="flex flex-col gap-1 px-4">
          <span className="text-20 font-bold leading-tight">
            {tokenMetadata?.name || ""}
          </span>

          <div className="mt-auto mb-0 flex flex-col gap-4">
            <dl className="flex flex-col">
              <dt className="sr-only">Price</dt>
              <dd className="text-14 inline-flex items-center gap-1">
                {logoURI ? (
                  <img
                    src={logoURI}
                    width="16"
                    height="16"
                    alt={currencyData?.symbol}
                    className="mr-1"
                  />
                ) : null}
                <span className="inline-flex items-baseline gap-1">
                  <span className="text-15 font-medium">{formattedPrice}</span>
                  <span className="text-12 text-grey-100">
                    {currencyData?.symbol}
                  </span>
                </span>
              </dd>
            </dl>
          </div>
        </div>

        <Form className="flex flex-col gap-3 px-4">
          <BuyWithCryptoCardWidget
            amount={amount}
            chainId={chainId}
            tokenId={tokenMetadata.tokenId}
            setSuccessfulTxHash={setSuccessfulTxHash}
            userPaymentCurrencyBalance={userPaymentCurrencyBalance}
            price={price}
            currencyData={currencyData}
            salesContractAddress={saleConfiguration.salesContractAddress}
            nftTokenAddress={saleConfiguration.nftTokenAddress}
          />
        </Form>

        <dl className="flex justify-between gap-4 border-t border-grey-800 px-6 py-3">
          <div className="flex flex-col">
            <dt className="text-11 font-medium text-grey-200 leading-[1em]">
              Token Id
            </dt>
            <dd className="text-white font-bold text-14">
              {tokenMetadata?.tokenId || ""}
            </dd>
          </div>
          <div className="flex flex-col text-center items-center">
            <dt className="text-11 font-medium text-grey-200 leading-[1em]">
              Minted
            </dt>
            <dd className="text-white font-bold text-14">
              {Number(nftsMinted || 0)}
            </dd>
          </div>
          <div className="flex flex-col text-end items-end">
            <dt className="text-11 font-medium text-grey-200 leading-[1em]">
              Owned
            </dt>
            <dd className="text-white font-bold text-14">{amountOwned}</dd>
          </div>
        </dl>

        {txExplorerUrl && (
          <a
            href={txExplorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-12 text-grey-50 flex items-center gap-1"
          >
            <Svg name="ExternalLink" className="size-4" />
            <span className="underline">View latest transaction</span>
          </a>
        )}
      </div>
    </div>
  );
};
