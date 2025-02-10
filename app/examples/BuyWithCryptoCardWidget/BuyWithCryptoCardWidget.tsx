/* starthide */
import { usePublicClient, useWalletClient, useAccount } from "wagmi";
import { ContractInfo } from "@0xsequence/metadata";
import { useERC1155SaleContractCheckout } from "@0xsequence/kit-checkout";

interface BuyWithCryptoCardWidgetProps {
  tokenId: string;
  chainId: number;
  amount: number;
  userPaymentCurrencyBalance: bigint | undefined;
  price: bigint;
  currencyData: ContractInfo | undefined;
  salesContractAddress: string;
  nftTokenAddress: string;
  setSuccessfulTxHash: (txHash: string) => void;
}

export const BuyWithCryptoCardWidget = ({
  tokenId,
  chainId,
  amount,
  userPaymentCurrencyBalance,
  price,
  currencyData,
  salesContractAddress,
  nftTokenAddress,
  setSuccessfulTxHash,
}: BuyWithCryptoCardWidgetProps) => {
  /* endhide */
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address: userAddress } = useAccount();

  const { openCheckoutModal } = useERC1155SaleContractCheckout({
    chain: chainId,
    contractAddress: salesContractAddress,
    wallet: userAddress!,
    collectionAddress: nftTokenAddress,
    items: [
      {
        tokenId: String(tokenId),
        quantity: String(amount),
      },
    ],
    onSuccess: setSuccessfulTxHash,
    onError: (error: Error) => {
      console.error(error);
    },
  });
  /* starthide */
  const nftPriceBigInt = price ? price : BigInt(0);
  const amountBigInt = BigInt(amount);
  const totalPrice = nftPriceBigInt * amountBigInt;
  /* endhide */

  const onClickBuy = async () => {
    /* starthide */
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
    /* endhide */
    openCheckoutModal();
  };

  const hasNsf =
    userPaymentCurrencyBalance?.toString() &&
    (userPaymentCurrencyBalance?.toString() === "0" ||
      userPaymentCurrencyBalance < totalPrice);

  return (
    <button
      data-nsf={hasNsf}
      className="rounded-[0.5rem] font-bold text-14 data-[nsf=true]:opacity-50 min-h-[2.5rem] !m-0"
      onClick={onClickBuy}
    >
      {hasNsf ? "Insufficient funds" : "Buy"}
    </button>
  );
  /* starthide */
};
