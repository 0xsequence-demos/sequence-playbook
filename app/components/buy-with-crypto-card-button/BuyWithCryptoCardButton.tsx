import { usePublicClient, useWalletClient, useAccount } from "wagmi";
import { getChain } from "~/utils/primary-sales/ERC20/getChain";
import { ContractInfo } from "@0xsequence/metadata";
import { saleConfiguration } from "~/utils/primary-sales/helpers";
import { useERC1155SaleContractCheckout } from "@0xsequence/kit-checkout";

interface BuyWithCryptoCardButtonProps {
  tokenId: string;
  collectionAddress: string;
  chainId: number;
  amount: number;
  setTxExplorerUrl: (url: string) => void;
  userPaymentCurrencyBalance: bigint | undefined;
  price: bigint;
  currencyData: ContractInfo | undefined;
  refetchCollectionBalance: () => void;
  refetchTotalMinted: () => void;
  refetchNftsMinted: () => void;
}

export const BuyWithCryptoCardButton = ({
  tokenId,
  // collectionAddress,
  chainId,
  amount,
  setTxExplorerUrl,
  userPaymentCurrencyBalance,
  price,
  currencyData,
  refetchCollectionBalance,
  refetchTotalMinted,
  refetchNftsMinted,
}: BuyWithCryptoCardButtonProps) => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address: userAddress, chainId: chainIdUser } = useAccount();

  const { openCheckoutModal } = useERC1155SaleContractCheckout({
    chain: saleConfiguration.chainId,
    contractAddress: saleConfiguration.salesContractAddress,
    wallet: userAddress!,
    collectionAddress: saleConfiguration.nftTokenAddress,
    items: [
      {
        tokenId: String(tokenId),
        quantity: String(amount),
      },
    ],
    onSuccess: (txnHash: string) => {
      const chainInfoResponse = getChain(chainId);
      if (chainInfoResponse)
        setTxExplorerUrl(
          `${chainInfoResponse?.blockExplorer?.rootUrl}/tx/${txnHash}`
        );
      refetchCollectionBalance();
      refetchTotalMinted();
      refetchNftsMinted();
      console.log("success!", txnHash);
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
  const nftPriceBigInt = price ? price : BigInt(0);
  const amountBigInt = BigInt(amount);
  const totalPrice = nftPriceBigInt * amountBigInt;

  const onClickBuy = async () => {
    if (
      !publicClient ||
      !walletClient ||
      !userAddress ||
      !currencyData ||
      amount <= 0 ||
      !userPaymentCurrencyBalance?.toString() ||
      userPaymentCurrencyBalance < totalPrice
    ) {
      return;
    }

    openCheckoutModal();
  };

  const hasNsf =
    userPaymentCurrencyBalance?.toString() &&
    (userPaymentCurrencyBalance?.toString() === "0" ||
      userPaymentCurrencyBalance < totalPrice);

  return (
    <>
      <button
        data-nsf={hasNsf}
        className="rounded-[0.5rem] w-full font-bold text-14 data-[nsf=true]:opacity-50"
        onClick={onClickBuy}
      >
        {hasNsf ? "Insufficient funds" : "Buy"}
      </button>
    </>
  );
};
