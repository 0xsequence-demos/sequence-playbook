/* starthide */
import { useOpenConnectModal } from "@0xsequence/kit";
import { useAddFundsModal } from "@0xsequence/kit-checkout";
import { useAccount } from "wagmi";

export const BuyCryptoWidget = () => {
  const { address } = useAccount();
  const { setOpenConnectModal } = useOpenConnectModal();
  /* endhide */
  const { triggerAddFunds: toggleAddFunds } = useAddFundsModal();

  const handleAddFunds = () => {
    toggleAddFunds({
      walletAddress: address!,
      defaultCryptoCurrency: "USDC",
      cryptoCurrencyList: "USDC",
      networks: "arbitrum-sepolia",
      /* starthide */
      onOrderCreated(data) {
        console.log("Order Created", data);
      },
      onOrderSuccessful(data) {
        console.log("Order Successful", data);
      },
      onOrderFailed(data) {
        console.warn("Order Failed", data);
      },
      onClose: () => console.log("User closed the popup"),
      /* endhide */
    });
  };

  return address ? (
    <>
      <p>Connected as {address}</p>
      <button onClick={() => handleAddFunds()}>Add Funds</button>
      {/* starthide */}
    </>
  ) : (
    <>
      {/* endhide */}
      <p>Not connected</p>
      <button onClick={() => setOpenConnectModal(true)}>Connect</button>
      {/* starthide */}
    </>
  );
};
/* endhide */
