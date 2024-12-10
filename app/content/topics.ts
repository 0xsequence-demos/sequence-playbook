import { Topic } from "~/content/types";
import UserAuthenticationBook from "~/content/books/user-authentication";

export default [
  {
    name: "onboard",
    title: "Onboard",
    path: "/onboard",
    icon: "onboard-icon@2x.png",
    theme: {
      bgImage: "bg-onboard",
      bookColor: "text-blue-400",
    },
    description:
      "Small paragraph text that's not more than two lines that brings a bit more context of this particular feature if necessary",
    books: [
      UserAuthenticationBook.info,
      {
        name: "multiple-wallets",
        path: "/onboard/multiple-wallets",
        title: "Connect multiple wallets",
        shortname: "Multiple wallets",
        bookIcon: "book-cover-connection",
        description: "",
      },
      {
        name: "wallet-inventory",
        path: "/onboard/wallet-inventory",
        title: "Display Wallet Inventory",
        shortname: "Wallet inventory",
        bookIcon: "book-cover-inventory",
        description: "",
      },
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
    icon: "monetize-icon@2x.png",
    description:
      "Small paragraph text that's not more than two lines that brings a bit more context of this particular feature if necessary",
    books: [
      {
        name: "in-game-marketplace",
        title: "Implementing an In-Game Web3 Marketplace",
        shortname: "In-game Web3 marketplace",
        path: "/monetize/in-game-marketplace",
        bookIcon: "book-cover-marketplace",

        description: "",
      },
      {
        name: "primary-sale-nft",
        title: "Implementing primary sale for NFTs",
        shortname: "Primary sale for NFTs",
        path: "/monetize/primary-sale-nft",
        bookIcon: "book-cover-coins",

        description: "",
      },
      {
        name: "primary-sale-off-chain-digital-goods",
        title: "Implementing primary sales for off-chain digital goods",
        shortname: "Primary sales for off-chain digital goods",
        path: "/monetize/primary-sale-off-chain-digital-goods",
        bookIcon: "book-cover-globe",

        description: "",
      },
      {
        name: "crypto-onramp-credit-card",
        title: "Implementing crypto onramp with credit card payments",
        shortname: "Crypto onramp with credit card payments",
        path: "/monetize/crypto-onramp-credit-card",
        bookIcon: "book-cover-payments",
        description: "",
      },
    ],
  },
  {
    name: "power",
    title: "Power",
    description:
      "Small paragraph text that's not more than two lines that brings a bit more context of this particular feature if necessary",

    theme: {
      bgImage: "bg-power",
      bookColor: "text-violet-400",
    },
    path: "/power",
    icon: "power-icon@2x.png",
    books: [
      {
        name: "contract-inventory",
        title: "Showing contract inventory in user’s wallet",
        shortname: "Contract inventory",
        path: "/power/contract-inventory",
        bookIcon: "book-cover-wallet",

        description: "",
      },
      {
        name: "minting-tokens",
        title: "Minting Tokens in Web3",
        shortname: "Minting tokens",
        path: "/power/minting-tokens",
        bookIcon: "book-cover-minter",

        description: "",
      },
      {
        name: "listening-to-web3-events",
        title: "Listening to Web3 Events Using Webhooks",
        shortname: "Listening to Web3 events",
        path: "/power/listening-to-web3-events",
        bookIcon: "book-cover-list",

        description: "",
      },
    ],
  },
] as Topic[];
