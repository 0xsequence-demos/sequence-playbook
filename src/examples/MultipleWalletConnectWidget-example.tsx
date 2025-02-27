/* starthide */
import { useOpenConnectModal, useKitWallets } from "@0xsequence/kit";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import { WalletConnectionDetail } from "~/components/wallet-connection-detail/WalletConnectionDetail";

export const MultipleWalletConnectWidget = () => {
  const { address } = useAccount();
  /* endhide */
  const { setOpenConnectModal } = useOpenConnectModal();

  const { wallets, linkedWallets } = useKitWallets();

  const onClickConnect = () => {
    setOpenConnectModal(true);
  };

  /* starthide */
  const connectedWallets = useMemo(() => {
    // Get read-only linked wallets that aren't connected
    const readOnlyLinkedWallets = (linkedWallets ?? [])
      .filter(
        (lw) =>
          !wallets.some(
            (w) =>
              w.address.toLowerCase() === lw.linkedWalletAddress.toLowerCase(),
          ),
      )
      .map((lw) => ({
        name: lw.walletType || "Linked Wallet",
        address: lw.linkedWalletAddress,
        isEmbedded: false,
        isActive: false,
        isLinked: true,
        isReadOnly: true,
      }));

    // Transform KitWallet to WalletListItemProps
    const connectedWallets = wallets.map((wallet) => ({
      name: wallet.name,
      address: wallet.address,
      isEmbedded: wallet.isEmbedded,
      isActive: wallet.isActive,
      isLinked:
        linkedWallets?.some(
          (lw) =>
            lw.linkedWalletAddress.toLowerCase() ===
            wallet.address.toLowerCase(),
        ) ?? false,
      isReadOnly: false,
    }));

    // Sort wallets: embedded first, then by name and address
    const sortedConnectedWallets = [...connectedWallets].sort((a, b) => {
      if (a.isEmbedded && !b.isEmbedded) return -1;
      if (!a.isEmbedded && b.isEmbedded) return 1;
      return (
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()) ||
        a.address.toLowerCase().localeCompare(b.address.toLowerCase())
      );
    });

    // Sort read-only linked wallets by name and address
    const sortedReadOnlyWallets = [...readOnlyLinkedWallets].sort(
      (a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()) ||
        a.address.toLowerCase().localeCompare(b.address.toLowerCase()),
    );

    // Combine all wallets
    return [...sortedConnectedWallets, ...sortedReadOnlyWallets];
  }, [wallets, linkedWallets]);

  return address ? (
    <>
      {/* endhide */}
      <WalletConnectionDetail address={address} />
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={onClickConnect}
      >
        {connectedWallets.length === 1
          ? "Connect another wallet"
          : `Manage connected wallets (${connectedWallets.length})`}
      </button>
      {/* starthide */}
    </>
  ) : (
    <>
      <p>Not connected</p>
    </>
  );
};
