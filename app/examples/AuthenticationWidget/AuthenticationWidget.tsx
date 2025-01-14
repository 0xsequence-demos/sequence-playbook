/* starthide */
import { useOpenConnectModal } from "@0xsequence/kit";
import { useAccount, useDisconnect } from "wagmi";
export const AuthenticationWidget = () => {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  const { setOpenConnectModal } = useOpenConnectModal();
  return address ? (
    <>
      {/* endhide */}
      <p>Connected as {address}</p>
      <button onClick={() => disconnect()}>Disconnect</button>
      {/* starthide */}
    </>
  ) : (
    <>
      <p>Not connected</p>
      <button onClick={() => setOpenConnectModal(true)}>Connect</button>
    </>
  );
};
/* endhide */
