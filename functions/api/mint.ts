import { ethers } from "ethers";
import { networks, findSupportedNetwork } from "@0xsequence/network";
import { Session, SessionSettings } from "@0xsequence/auth";

interface IEnv {
  PKEY: string; // Private key for EOA wallet
  CONTRACT_ADDRESS: string; // Deployed ERC1155 or ERC721 contract address
  PROJECT_ACCESS_KEY: string; // From sequence.build
  CHAIN_HANDLE: string; // Standardized chain name – See https://docs.sequence.xyz/multi-chain-support
}

function fastResponse(message: string, status = 400) {
  return new Response(message, { status });
}

export const onRequest: PagesFunction<IEnv> = async (ctx) => {
  let response: Response | undefined;

  if (ctx.request.method !== "POST") {
    return fastResponse(`Method not supported: ${ctx.request.method}`, 405);
  }

  if (ctx.env.PKEY === undefined || ctx.env.PKEY === "") {
    return fastResponse(
      "Make sure PKEY is configured in your environment",
      500,
    );
  }

  if (
    ctx.env.CONTRACT_ADDRESS === undefined ||
    ctx.env.CONTRACT_ADDRESS === ""
  ) {
    return fastResponse(
      "Make sure CONTRACT_ADDRESS is configured in your environment",
      500,
    );
  }

  if (
    ctx.env.PROJECT_ACCESS_KEY === undefined ||
    ctx.env.PROJECT_ACCESS_KEY === ""
  ) {
    return fastResponse(
      "Make sure PROJECT_ACCESS_KEY is configured in your environment",
      500,
    );
  }

  if (ctx.env.CHAIN_HANDLE === undefined || ctx.env.CHAIN_HANDLE === "") {
    return fastResponse(
      "Make sure CHAIN_HANDLE is configured in your environment",
      500,
    );
  }

  const network = findSupportedNetwork(ctx.env.CHAIN_HANDLE);

  if (network === undefined) {
    return fastResponse("Unsupported network or unknown CHAIN_HANDLE", 500);
  }

  const body = await ctx.request.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { address, tokenId } = body as any;
  const dataRaw = [address, tokenId, "1", "0x00"];
  const contractAddress = ctx.env.CONTRACT_ADDRESS;

  const nodeUrl = `https://nodes.sequence.app/${ctx.env.CHAIN_HANDLE}`;
  const relayerUrl = `https://${ctx.env.CHAIN_HANDLE}-relayer.sequence.app`;
  const provider = new ethers.JsonRpcProvider(nodeUrl);

  // create EOA from private key
  const walletEOA = new ethers.Wallet(ctx.env.PKEY, provider);

  // instantiate settings
  const settings: Partial<SessionSettings> = {
    networks: [
      {
        ...networks[network.chainId],
        rpcUrl: network.rpcUrl,
        // provider: provider,
        relayer: {
          url: relayerUrl,
          provider: {
            url: network.rpcUrl,
          },
        },
      },
    ],
  };

  // create a single signer sequence wallet session
  const session = await Session.singleSigner({
    settings: settings,
    signer: walletEOA.privateKey,
    projectAccessKey: ctx.env.PROJECT_ACCESS_KEY,
  });

  // get signer
  const signer = session.account.getSigner(network.chainId);
  // create interface from partial abi
  const collectibleInterface = new ethers.Interface([
    "function mint(address to, uint256 tokenId, uint256 amount, bytes data)",
  ]);
  const data = collectibleInterface.encodeFunctionData("mint", dataRaw);
  try {
    const res = await signer.sendTransaction({ to: contractAddress, data });
    response = fastResponse(`transaction hash: ${res.hash}`, 200);
  } catch (err) {
    console.log(err);
    response = fastResponse(
      `Something went wrong: ${JSON.stringify(err)}`,
      500,
    );
  }

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
};
