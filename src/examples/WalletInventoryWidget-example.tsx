import { useOpenWalletModal } from "@0xsequence/kit-wallet";
import { useOpenConnectModal } from "@0xsequence/kit";
import { useAccount } from "wagmi";
import { WalletConnectionDetail } from "~/components/wallet-connection-detail/WalletConnectionDetail";

export const WalletInventoryWidget = () => {
  const { address } = useAccount();
  const { setOpenConnectModal } = useOpenConnectModal();
  const { setOpenWalletModal } = useOpenWalletModal();
  return address ? (
    <>
      <WalletConnectionDetail address={address} />
      <button onClick={() => setOpenWalletModal(true)}>
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
