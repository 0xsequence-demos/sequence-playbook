const projectAccessKey = import.meta.env.VITE_PROJECT_ACCESS_KEY;
console.log(projectAccessKey);

import { stringTemplate } from "@0xsequence/network";

export const DEFAULT_PLATFORM_FEE_PERCENTAGE = 2;

// revenue multisig
export const DEFAULT_PLATFORM_FEE_RECIPIENT =
  "0x858dB1cbF6D09D447C96A11603189b49B2D1C219";

// Used for Avalanche and Optimism
export const PLATFORM_FEE_RECIPIENT_AVALANCHE_OPTIMISM =
  "0x400cdab4676c17aec07e8ec748a5fc3b674bca41";

const SERVICES = {
  sequenceApi: "https://api.sequence.app",
  metadata: "https://metadata.sequence.app",
  indexer: "https://${network}-indexer.sequence.app",
  marketplaceApi: "https://marketplace-api.sequence.app/${network}",
  rpcNodeUrl: "https://nodes.sequence.app/${network}/${accessKey}",
  directorySearchEndpoint:
    "https://api.sequence.build/rpc/Builder/DirectorySearchCollections",
  imageProxy: "https://imgproxy.sequence.xyz/",
  builderMarketplaceApi: "https://api.sequence.build/marketplace/${projectId}",
};

export const sequenceApiURL = stringTemplate(SERVICES.sequenceApi, {});

export const metadataURL = stringTemplate(SERVICES.metadata, {});

export const indexerURL = (network: string) =>
  stringTemplate(SERVICES.indexer, { network: network });

export const marketplaceApiURL = (network: string) =>
  stringTemplate(SERVICES.marketplaceApi, { network: network });

export const rpcNodeURL = (network: string) =>
  stringTemplate(SERVICES.rpcNodeUrl, {
    network: network,
    accessKey: projectAccessKey,
  });
