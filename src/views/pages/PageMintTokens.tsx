import { useAccount } from "wagmi";
import { useOpenConnectModal } from "@0xsequence/kit";

export const PageMintTokens = () => {
  const { address } = useAccount();

  const { setOpenConnectModal } = useOpenConnectModal();
  return (
    <div>
      <h2>Minting Tokens in Web3</h2>
      <ul>
        <li>Authenticate user with email or social auth</li>
        <li>Mint a group of NFTs to the wallet</li>
        {address ? (
          <>
            <p>Connected as {address}</p>
            <button
              onClick={() => {
                fetch("api/mint", {
                  method: "POST",
                  body: JSON.stringify({
                    address,
                    tokenId: "0",
                  }),
                });
              }}
            >
              mint
            </button>
          </>
        ) : (
          <>
            <p>Not connected</p>
            <button onClick={() => setOpenConnectModal(true)}>Connect</button>
          </>
        )}
      </ul>
    </div>
  );
};
