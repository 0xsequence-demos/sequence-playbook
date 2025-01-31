import {
  mainnet,
  polygon,
  Chain,
  polygonAmoy,
  arbitrumSepolia,
  arbitrum,
} from "wagmi/chains";

const chains = [mainnet, polygon, polygonAmoy, arbitrumSepolia, arbitrum] as [
  Chain,
  ...Chain[],
];

export default chains;
