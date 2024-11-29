import { useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";
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
