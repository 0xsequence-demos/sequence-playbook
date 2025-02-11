import { useOpenWalletModal } from "@0xsequence/kit-wallet";
import { useOpenConnectModal } from "@0xsequence/kit";
import { useAccount } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";
import { WalletConnectionDetail } from "~/components/wallet-connection-detail/WalletConnectionDetail";
export const ContractInventoryWidget = () => {
  const { address } = useAccount();
  const { setOpenConnectModal } = useOpenConnectModal();
  const { setOpenWalletModal } = useOpenWalletModal();
  return address ? (
    <>
      <WalletConnectionDetail address={address} />
      <button
        onClick={() =>
          setOpenWalletModal(true, {
            defaultNavigation: {
              location: "collection-details",
              params: {
                contractAddress: "0x36631c1e690714192614364ae9629850b546d194",
                chainId: arbitrumSepolia.id,
              },
            },
          })
        }
      >
        Open Wallet Inventory
      </button>
    </>
  ) : (
    <>
      <p>Not connected</p>
      <button onClick={() => setOpenConnectModal(true)}>Connect</button>
    </>
  );
};
