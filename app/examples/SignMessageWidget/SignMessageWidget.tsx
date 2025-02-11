import { useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { WalletConnectionDetail } from "~/components/wallet-connection-detail/WalletConnectionDetail";

interface Props {
  setData: (data: `0x${string}` | undefined) => void;
}
export const SignMessageWidget = (props: Props) => {
  const { setData } = props;
  const { address } = useAccount();
  const { isPending, data, signMessage } = useSignMessage();
  useEffect(() => setData(data));

  return address ? (
    <>
      <WalletConnectionDetail address={address} />
      {isPending ? (
        <button className="ghost">Pending...</button>
      ) : (
        <button onClick={() => signMessage({ message: "hello" })}>
          Sign "hello"
        </button>
      )}
      {data ? (
        <div className="flex flex-col gap-1 items-start px-12 py-1 mt-8">
          <span className="text-14 opacity-75">Signature</span>
          <p className="break-all font-mono text-12"> {data}</p>
        </div>
      ) : null}
    </>
  ) : (
    <>
      <p>Not connected</p>
    </>
  );
};
