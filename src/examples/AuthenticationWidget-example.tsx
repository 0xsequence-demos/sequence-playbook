/* starthide */
import { useOpenConnectModal } from "@0xsequence/kit";
import { useAccount, useDisconnect } from "wagmi";
import { WalletConnectionDetail } from "~/components/wallet-connection-detail/WalletConnectionDetail";
export const AuthenticationWidget = () => {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  const { setOpenConnectModal } = useOpenConnectModal();

  return address ? (
    <>
      {/* endhide */}
      <WalletConnectionDetail address={address} />
      <button onClick={() => disconnect()}>Disconnect</button>
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
