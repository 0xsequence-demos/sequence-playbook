/* starthide */
import { useOpenConnectModal } from "@0xsequence/kit";
import { useAddFundsModal } from "@0xsequence/kit-checkout";
import { serverOnly$ } from "vite-env-only/macros";
import { useAccount } from "wagmi";

export const loader = serverOnly$(async () => ({
  name: "BuyCryptoWidget Widget is my name",
}));
export const action = serverOnly$(async () => ({
  name: "BuyCryptoWidget Widget is my name",
}));

export const BuyCryptoWidget = () => {
  const { address } = useAccount();
  const { triggerAddFunds: toggleAddFunds } = useAddFundsModal();

  const { setOpenConnectModal } = useOpenConnectModal();

  const handleAddFunds = () => {
    toggleAddFunds({
      walletAddress: address!,
      defaultCryptoCurrency: "POL",
      cryptoCurrencyList: "POL",
      networks: "polygon",
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
    });
  };

  return address ? (
    <>
      {/* endhide */}
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
