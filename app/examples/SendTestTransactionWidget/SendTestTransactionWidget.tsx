import { useAccount, useSendTransaction } from "wagmi";
import { useEffect } from "react";
import { WalletConnectionDetail } from "~/components/wallet-connection-detail/WalletConnectionDetail";
interface Props {
  setData: (data: `0x${string}` | undefined) => void;
}

export const SendTestTransactionWidget = (props: Props) => {
  const { setData } = props;
  const { address } = useAccount();

  const { data, sendTransaction, isPending, error } = useSendTransaction();
  useEffect(() => setData(data), []);

  return address ? (
    <>
      <WalletConnectionDetail address={address} />
      {isPending ? (
        <button className="ghost">Pending...</button>
      ) : (
        <button
          onClick={() =>
            sendTransaction({ to: address, value: BigInt(0), gas: null })
          }
        >
          Send Transaction
        </button>
      )}
      {data ? (
        <div className="flex flex-col gap-1 items-start px-12 py-1 mt-8">
          <span className="text-14 opacity-75">Transaction hash</span>
          <p className="break-all font-mono text-12"> {data}</p>
        </div>
      ) : null}
      {error && <p>{error?.message}</p>}
    </>
  ) : (
    <>
      <p>Not connected</p>
    </>
  );
};
