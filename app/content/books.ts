import { Topic } from "~/content/types";
import UserAuthenticationBook from "~/content/onboard/user-authentication";
import MultipleWalletsBook from "~/content/onboard/multiple-wallets";
import WalletInventoryBook from "~/content/onboard/wallet-inventory";


import CryptoOnrampCreditCardBook from "~/content/monetize/crypto-onramp-credit-card";
import IngameWeb3MarketplaceBook from "~/content/monetize/ingame-web3-marketplace";
import PrimarySaleNftBook from "~/content/monetize/primary-sale-nft";
import PrimarySaleOffChainDigitalGoodsBook from "~/content/monetize/primary-sale-off-chain-digital-goods";


import ContractInventoryBook from "~/content/power/contract-inventory";
import ListeningToWeb3EventsBook from "~/content/power/listening-to-web3-events";
import MintingTokensBook from "~/content/power/minting-tokens";

export default [
  {
    name: "onboard",
    title: "Onboard",
    path: "/onboard",
    icon: "onboard-icon",
    theme: {
      bgImage: "bg-onboard",
      bookColor: "text-blue-400",
    },
    description: "Authentication & wallets",
    books: [
      { ...UserAuthenticationBook.info, content: UserAuthenticationBook },
      { ...MultipleWalletsBook.info, content: MultipleWalletsBook },
      { ...WalletInventoryBook.info, content: WalletInventoryBook },
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
    icon: "monetize-icon",
    description: "Purchasing & payments",
    books: [
      { ...CryptoOnrampCreditCardBook.info, content: CryptoOnrampCreditCardBook },
      { ...IngameWeb3MarketplaceBook.info, content: IngameWeb3MarketplaceBook },
      { ...PrimarySaleNftBook.info, content: PrimarySaleNftBook },
      { ...PrimarySaleOffChainDigitalGoodsBook.info, content: PrimarySaleOffChainDigitalGoodsBook },
    ],
  },
  {
    name: "power",
    title: "Power",
    description: "Contracts & minting",

    theme: {
      bgImage: "bg-power",
      bookColor: "text-violet-400",
    },
    path: "/power",
    icon: "power-icon",
    books: [
      { ...ContractInventoryBook.info, content: ContractInventoryBook },
      { ...ListeningToWeb3EventsBook.info, content: ListeningToWeb3EventsBook },
      { ...MintingTokensBook.info, content: MintingTokensBook },
    ],
  },
] as Topic[];
