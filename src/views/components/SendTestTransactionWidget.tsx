import { useAccount, useSendTransaction } from "wagmi";
import ErrorToast from "./ErrorToast";
export const SendTestTransactionWidget = () => {
  const { address } = useAccount();
  const { data, sendTransaction, isPending, error, reset } =
    useSendTransaction();
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
      {error && (
        <ErrorToast message={error?.message} onClose={reset} duration={7000} />
      )}
    </>
  ) : (
    <>
      <p>Not connected</p>
    </>
  );
};
