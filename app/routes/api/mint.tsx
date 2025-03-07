import { Session, SessionSettings } from "@0xsequence/auth";
import { findSupportedNetwork, networks } from "@0xsequence/network";
import { ethers } from "ethers";
import { serverOnly$ } from "vite-env-only/macros";

/* endhide */
export const action = serverOnly$(async (req) => {
  const env = req.context.cloudflare.env;
  const formData = await req.request.formData();
  const walletAddress = formData.get("walletAddress");
  const tokenId = parseInt(formData.get("tokenId"));
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
  const dataArgs = [walletAddress, tokenId, 1, "0x00"];
  const data = collectibleInterface.encodeFunctionData("mint", dataArgs);
  return await signer.sendTransaction({
    to: env.DEMO_ITEMS_CONTRACT_ADDRESS,
    data,
  });
});
