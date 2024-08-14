import { useAccount } from "wagmi";
export const ExampleWidget = () => {
  const { address } = useAccount();

  return address ? (
    <>
      <p>Connected as {address}</p>
      <button onClick={() => window.alert("Test!")}>Test</button>
    </>
  ) : (
    <>
      <p>Not connected</p>
    </>
  );
};
