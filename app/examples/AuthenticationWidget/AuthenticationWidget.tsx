/* starthide */
import { useOpenConnectModal } from "@0xsequence/kit";
import { serverOnly$ } from "vite-env-only/macros";
import { useAccount, useDisconnect } from "wagmi";

export const loader = serverOnly$(async () => ({
  name: "Authentication Widget is my name",
}));
export const action = serverOnly$(async () => ({
  name: "Authentication Widget is my name",
}));

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
      {/* endhide */}
      <p>Not connected</p>
      <button onClick={() => setOpenConnectModal(true)}>Connect</button>
      {/* starthide */}
    </>
  );
};
/* endhide */
