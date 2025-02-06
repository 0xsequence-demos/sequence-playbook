import { encodeFunctionData, SendTransactionErrorType, toHex } from "viem";
import {
  usePublicClient,
  useWalletClient,
  useAccount,
  useSendTransaction,
  useSwitchChain,
} from "wagmi";
import { ERC20 } from "~/utils/primary-sales/ERC20/ERC20";
import { getChain } from "~/utils/primary-sales/ERC20/getChain";
import { SALES_CONTRACT_ABI } from "~/utils/primary-sales/salesContractAbi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ContractInfo } from "@0xsequence/indexer";
import { Toast } from "boilerplate-design-system";
import { saleConfiguration } from "~/utils/primary-sales/helpers";

interface BuyWithCryptoCardButtonProps {
  tokenId: string;
  collectionAddress: string;
  chainId: number;
  amount: number;
  // resetAmount: () => void;
  setTxExplorerUrl: (url: string) => void;
  setTxError: (error: SendTransactionErrorType | null) => void;
  setPurchasingNft: (value: boolean) => void;
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
  // resetAmount,
  setTxExplorerUrl,
  setTxError,
  userPaymentCurrencyBalance,
  setPurchasingNft,
  price,
  currencyData,
  refetchCollectionBalance,
  refetchTotalMinted,
  refetchNftsMinted,
}: BuyWithCryptoCardButtonProps) => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const {
    address: userAddress,
    chainId: chainIdUser
  } = useAccount();
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const [chainInfo, setChainInfo] = useState<{ [key: string]: any }>({});
  const {
    data: txnData,
    sendTransaction,
    isPending: isPendingSendTxn,
    error,
    reset,
  } = useSendTransaction();
  const { switchChainAsync } = useSwitchChain();
  const nftPriceBigInt = price ? price : BigInt(0);
  const amountBigInt = BigInt(amount);
  const totalPrice = nftPriceBigInt * amountBigInt;

  const onClickBuy = async () => {
    if (chainIdUser !== chainId) {
      await switchChainAsync({ chainId });
    }

    if (
      !publicClient ||
      !walletClient ||
      !userAddress ||
      !currencyData ||
      isPendingSendTxn ||
      amount <= 0 ||
      !userPaymentCurrencyBalance?.toString() ||
      userPaymentCurrencyBalance < totalPrice
    ) {
      return;
    }

    /**
     * Mint tokens.
     * @param to Address to mint tokens to.
     * @param tokenIds Token IDs to mint.
     * @param amounts Amounts of tokens to mint.
     * @param data Data to pass if receiver is contract.
     * @param expectedPaymentToken ERC20 token address to accept payment in. address(0) indicates ETH.
     * @param maxTotal Maximum amount of payment tokens.
     * @param proof Merkle proof for allowlist minting.
     * @notice Sale must be active for all tokens.
     * @dev tokenIds must be sorted ascending without duplicates.
     * @dev An empty proof is supplied when no proof is required.
     */

    setTxError(null);
    setTxExplorerUrl("");
    setPurchasingNft(true);

    const allowance = await ERC20.getAllowance(
      currencyData.address,
      userAddress,
      saleConfiguration.salesContractAddress,
      chainId,
    );

    if (!allowance || allowance === 0n) {
      await ERC20.approveInfinite(
        currencyData.address,
        saleConfiguration.salesContractAddress,
        walletClient,
      );
    }

    const calldata = encodeFunctionData({
      abi: SALES_CONTRACT_ABI,
      functionName: "mint",
      args: [
        userAddress,
        [BigInt(tokenId)],
        // Amount of nfts that are going to be purchased
        [BigInt(amount)],
        toHex(0),
        currencyData.address,
        // Here the exact price of the NFTs must be established (USDC = 6 decimals) (Native currency = 18 decimals)
        totalPrice,
        [toHex(0, { size: 32 })],
      ],
    });

    const transactionParameters = {
      to: saleConfiguration.salesContractAddress,
      data: calldata,
      value: BigInt(0),
    };

    sendTransaction(transactionParameters);
  };

  useEffect(() => {
    if (!chainId) return;
    reset();
    const chainInfoResponse = getChain(chainId);
    if (chainInfoResponse) {
      setChainInfo(chainInfoResponse);
    }
  }, [chainId]);

  useEffect(() => {
    if (!error) return;
    setTxError(error as SendTransactionErrorType);
    setPurchasingNft(false);
  }, [error]);

  useEffect(() => {
    if (!txnData || isPendingSendTxn) return;

    toast.custom((t) => (
      <Toast status="success" handleClose={() => toast.dismiss(t)}>
        <div className="flex flex-col flex-1 gap-1 w-full">
          <span className="font-medium">Purchase Completed Successfully. </span>
          <a
            href={`${chainInfo.explorerUrl}/tx/${txnData}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-12 font-medium underline text-grey-200"
          >
            View transaction in explorer
          </a>
        </div>
      </Toast>
    ));
    setTxExplorerUrl(`${chainInfo.explorerUrl}/tx/${txnData}`);
    setPurchasingNft(false);
    setTimeout(() => {
      refetchCollectionBalance();
      refetchTotalMinted();
      refetchNftsMinted();
    }, 3000);
  }, [txnData, isPendingSendTxn]);

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
        {hasNsf
          ? "Insufficient funds"
          : !isPendingSendTxn
            ? "Buy"
            : "Buying..."}
      </button>
    </>
  );
};
