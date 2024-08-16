import { useAccount, useSignMessage } from "wagmi";
export const SignMessageWidget = () => {
  const { address } = useAccount();
  const { isPending, data, signMessage } = useSignMessage();

  return address ? (
    <>
      <p>Connected as {address}</p>
      {isPending ? (
        <button className="ghost">Pending...</button>
      ) : (
        <button onClick={() => signMessage({ message: "hello" })}>
          Sign "hello"
        </button>
      )}
      {data && <p className="breakword">Signature: {data}</p>}
    </>
  ) : (
    <>
      <p>Not connected</p>
    </>
  );
};
