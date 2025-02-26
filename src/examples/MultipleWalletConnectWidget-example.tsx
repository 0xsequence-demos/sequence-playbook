import { truncateAddress } from "@0xsequence/design-system";
import { useOpenConnectModal, useKitWallets } from "@0xsequence/kit";
import { useMemo } from "react";
import { useAccount } from "wagmi";

export const MultipleWalletConnectWidget = () => {
  const { address } = useAccount();
  const { setOpenConnectModal } = useOpenConnectModal();

  const { wallets, linkedWallets, setActiveWallet, disconnectWallet } =
    useKitWallets();

  const onClickConnect = () => {
    setOpenConnectModal(true);
  };

  const onClickCard = (walletAddress: string) => {
    setActiveWallet(walletAddress);
  };

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
        onDisconnect: () => {}, // No-op for read-only wallets
        onUnlink: () => {
          // unlinkWallet(lw.linkedWalletAddress);
        },
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
      onDisconnect: () => disconnectWallet(wallet.address),
      onUnlink: () => {}, // No-op for connected wallets
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
  }, [wallets, linkedWallets, disconnectWallet]);

  return address ? (
    <>
      <div className="p-4">
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClickConnect}
        >
          Connect another wallet
        </button>
        <div className="grid gap-4">
          {connectedWallets.map((wallet) => (
            <div
              key={wallet.address}
              className={`flex justify-between items-center p-4 border rounded shadow-sm cursor-pointer ${
                wallet.isActive ? "bg-green-100 border-green-500" : "bg-white"
              }`}
              onClick={() => onClickCard(wallet.address)}
            >
              <div>
                <div className="font-semibold">
                  {wallet.name || wallet.address}
                </div>
                <div className="text-sm text-gray-500">
                  {truncateAddress(wallets[0]?.address)}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={wallet.onDisconnect}
                >
                  Disconnect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : (
    <>
      <p>Not connected</p>
    </>
  );
};
