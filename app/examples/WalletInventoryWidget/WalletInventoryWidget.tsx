import { useOpenConnectModal } from "@0xsequence/kit";
import { useAccount, useDisconnect } from "wagmi";
export const WalletInventoryWidget = () => {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  const { setOpenConnectModal } = useOpenConnectModal();
  return address ? (
    <>
      <p>Connected as {address}</p>
      <button onClick={() => disconnect()}>Disconnect!</button>
    </>
  ) : (
    <>
      <p>Not connected</p>
      <button onClick={() => setOpenConnectModal(true)}>Connect</button>
    </>
  );
};
