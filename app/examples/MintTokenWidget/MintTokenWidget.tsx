/* starthide */
import { Session, SessionSettings } from "@0xsequence/auth";
import { ethers } from "ethers";
import { useOpenConnectModal } from "@0xsequence/kit";
import { findSupportedNetwork, networks } from "@0xsequence/network";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Form } from "react-router";
import { serverOnly$ } from "vite-env-only/macros";
import { useAccount } from "wagmi";
import { useWidgetActionData } from "~/hooks/useWidgetActionData";
export type MintStatus = "notStarted" | "pending" | "successs" | "failed";

/* endhide */
export const action = serverOnly$(async (req) => {
  const env = req.context.cloudflare.env;
  const formData = await req.request.formData();
  const walletAddress = formData.get("walletAddress");
  const network = findSupportedNetwork(env.CHAIN_HANDLE)!;
  const relayerUrl = `https://${env.CHAIN_HANDLE}-relayer.sequence.app`;

  const settings: Partial<SessionSettings> = {
    /* starthide */
    networks: [
      {
        ...networks[network.chainId],
        rpcUrl: network.rpcUrl,
        relayer: {
          url: relayerUrl,
          provider: {
            url: network.rpcUrl,
          },
        },
      },
    ],
    /* endhide */
  };

  const session = await Session.singleSigner({
    settings: settings,
    signer: env.PKEY,
    projectAccessKey: env.BUILDER_PROJECT_ACCESS_KEY,
  });

  const signer = session.account.getSigner(network.chainId);
  const collectibleInterface = new ethers.Interface([
    "function mint(address to, uint256 tokenId, uint256 amount, bytes data)",
  ]);
  const dataArgs = [walletAddress, 3, 1, "0x00"];
  const data = collectibleInterface.encodeFunctionData("mint", dataArgs);
  return await signer.sendTransaction({
    to: env.DEMO_ITEMS_CONTRACT_ADDRESS,
    data,
  });
});

/* starthide */
export const MintTokenWidget = (props: {
  mintStatus: MintStatus;
  setMintStatus: Dispatch<SetStateAction<MintStatus>>;
}) => {
  const { mintStatus, setMintStatus } = props;
  const { address } = useAccount();

  const { setOpenConnectModal } = useOpenConnectModal();

  const [txHash, setTxHash] = useState("");

  const ad = useWidgetActionData("MintTokenWidget");

  useEffect(() => {
    if (ad?.hash) {
      setMintStatus("successs");
      setTxHash(ad?.hash);
    }
  }, [ad]);

  return address ? (
    <>
      {mintStatus === "notStarted" ? (
        <>
          {/* endhide */}
          <Form
            replace
            method="post"
            onSubmit={() => {
              setMintStatus("pending");
            }}
          >
            <input type="hidden" name="walletAddress" value={address} />
            <button type="submit">MINT</button>
          </Form>
          {/* starthide */}
        </>
      ) : mintStatus === "pending" ? (
        <div>Please wait...</div>
      ) : (
        <div>
          A crude mallet{" "}
          <a
            href={`https://sepolia.arbiscan.io/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
          >
            <b>is yours!</b>
          </a>
        </div>
      )}
    </>
  ) : (
    <>
      <p>Not connected</p>
      <button onClick={() => setOpenConnectModal(true)}>Connect</button>
    </>
  );
};
