import { Topic } from "~/content/types";
import UserAuthenticationBook from "~/content/onboard/user-authentication";
// import MultipleWalletsBook from "~/content/onboard/multiple-wallets";
import WalletInventoryBook from "~/content/onboard/wallet-inventory";

import CryptoOnrampCreditCardBook from "~/content/monetize/crypto-onramp-credit-card";
// import IngameWeb3MarketplaceBook from "~/content/monetize/ingame-web3-marketplace";
import PrimarySaleNftBook from "~/content/monetize/primary-sale-nft";
import SwapAndPayBook from "~/content/monetize/swap-and-pay";
// import PrimarySaleOffChainDigitalGoodsBook from "~/content/monetize/primary-sale-off-chain-digital-goods";

import ContractInventoryBook from "~/content/power/contract-inventory";
import ListeningToWeb3EventsBook from "~/content/power/listening-to-web3-events";
import MintingTokensBook from "~/content/power/minting-tokens";

export default [
  {
    name: "onboard",
    title: "Onboard",
    path: "/onboard",
    icon: "onboard",
    theme: {
      bgImage: "bg-onboard",
      bookColor: "text-blue-400",
    },
    description: "Authentication & wallets",
    books: [
      UserAuthenticationBook,
      // MultipleWalletsBook,
      WalletInventoryBook,
    ],
  },
  {
    name: "monetize",
    title: "Monetize",
    path: "/monetize",
    theme: {
      bgImage: "bg-monetize",
      bookColor: "text-green-400",
    },
    icon: "coins",
    description: "Purchasing & payments",
    books: [
      CryptoOnrampCreditCardBook,
      PrimarySaleNftBook,
      SwapAndPayBook,
      // IngameWeb3MarketplaceBook,
      // PrimarySaleOffChainDigitalGoodsBook,
    ],
  },
  {
    name: "power",
    title: "Power",
    description: "Contracts & backends",

    theme: {
      bgImage: "bg-power",
      bookColor: "text-violet-400",
    },
    path: "/power",
    icon: "power",
    books: [
      ContractInventoryBook,
      ListeningToWeb3EventsBook,
      MintingTokensBook,
    ],
  },
] as Topic[];
