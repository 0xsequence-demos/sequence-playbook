import { Topic } from "~/content/types";
import UserAuthenticationBook from "~/content/books/user-authentication";

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
    description:
      "Small paragraph text that's not more than two lines that brings a bit more context of this particular feature if necessary",
    books: [
      UserAuthenticationBook.info,
      {
        name: "multiple-wallets",
        path: "/onboard/multiple-wallets",
        title: "Connect multiple wallets",
        bookIcon: "book-cover-connection",
        description: "",
      },
      {
        name: "wallet-inventory",
        path: "/onboard/wallet-inventory",
        title: "Display Wallet Inventory",
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
    icon: "monetize",
    description:
      "Small paragraph text that's not more than two lines that brings a bit more context of this particular feature if necessary",
    books: [
      {
        name: "in-game-marketplace",
        title: "Implementing an In-Game Web3 Marketplace",
        path: "/monetize/in-game-marketplace",
        bookIcon: "book-cover-marketplace",

        description: "",
      },
      {
        name: "primary-sale-nft",
        title: "Implementing primary sale for NFTs",
        path: "/monetize/primary-sale-nft",
        bookIcon: "book-cover-coins",

        description: "",
      },
      {
        name: "primary-sale-off-chain-digital-goods",
        title: "Implementing primary sales for off-chain digital goods",
        path: "/monetize/primary-sale-off-chain-digital-goods",
        bookIcon: "book-cover-globe",

        description: "",
      },
      {
        name: "crypto-onramp-credit-card",
        title: "Implementing crypto onramp with credit card payments",
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
    icon: "power",
    books: [
      {
        name: "contract-inventory",
        title: "Showing contract inventory in user’s wallet",
        path: "/power/contract-inventory",
        bookIcon: "book-cover-wallet",

        description: "",
      },
      {
        name: "minting-tokens",
        title: "Minting Tokens in Web3",
        path: "/power/minting-tokens",
        bookIcon: "book-cover-minter",

        description: "",
      },
      {
        name: "listening-to-web3-events",
        title: "Listening to Web3 Events Using Webhooks",
        path: "/power/listening-to-web3-events",
        bookIcon: "book-cover-list",

        description: "",
      },
    ],
  },
] as Topic[];
