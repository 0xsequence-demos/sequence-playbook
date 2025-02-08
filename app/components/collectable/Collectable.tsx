import { BuyWithCryptoCardWidget } from "../../examples/BuyWithCryptoCardWidget";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ContractInfo } from "@0xsequence/metadata";
import { TokenMetadata } from "@0xsequence/metadata";
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
  const logoURI = currencyData?.logoURI;

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
    <div className="bg-grey-900 p-4 text-left rounded-[1rem] flex flex-col gap-3">
      {tokenMetadata?.image ? (
        <Image
          className=" w-full max-w-[28rem] mx-auto aspect-square rounded-[0.5rem]"
          src={tokenMetadata?.image}
        />
      ) : (
        <div className=" w-full max-w-[28rem] mx-auto aspect-square rounded-[0.5rem] bg-grey-800"></div>
      )}

      <span className="text-10 font-bold">
        Token id: {tokenMetadata?.tokenId || ""}
      </span>
      <span className="text-20 font-bold leading-tight">
        {tokenMetadata?.name || ""}
      </span>

      <div className="mt-auto mb-0 flex flex-col gap-4 pt-4">
        <div>
          <span className="text-12 font-medium">
            {Number(nftsMinted || 0)} Minted
          </span>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-12 font-medium text-grey-50 ">Price</span>
            <span className="text-14 font-bold inline-flex items-center gap-1">
              {!logoURI ? (
                <span className="size-4 bg-grey-800"></span>
              ) : // <TokenImage
              //   // src="https://metadata.sequence.app/projects/30957/collections/690/image.png"
              //   withNetwork="amoy"
              //   symbol="matic"
              //   style={{ width: 20, height: 20 }}
              // />
              null}
              {formattedPrice}
            </span>
          </div>
          <div className="flex flex-col items-end text-end">
            <span className="text-grey-50 font-medium text-12">Owned</span>
            <span className="text-white font-bold text-14">{amountOwned}</span>
          </div>
        </div>

        <Form className="flex flex-col gap-3">
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
        {txExplorerUrl && (
          <a
            href={txExplorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-12 text-grey-50 inline-flex items-center gap-1"
          >
            <Svg name="ExternalLink" className="size-4" />
            <span className="underline">View latest transaction</span>
          </a>
        )}
      </div>
    </div>
  );
};
