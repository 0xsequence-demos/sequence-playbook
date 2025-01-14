import { useAccount, useSendTransaction } from "wagmi";
import { useEffect } from "react";
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
      <p>Connected as {address}</p>
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
      {data && <p className="breakword">Transaction hash: {data}</p>}
      {error && <p>{error?.message}</p>}
    </>
  ) : (
    <>
      <p>Not connected</p>
    </>
  );
};
