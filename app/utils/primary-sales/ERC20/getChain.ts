import { findSupportedNetwork } from "@0xsequence/network";

type nameOrId = string | number;

export const getChain = (nameOrId: nameOrId) => {
  return findSupportedNetwork(nameOrId);
};