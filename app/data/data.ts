export const TOPICS = [
  {
    name:"onboard",
    title:"Onboard",
    path: "/onboard",
    description: "",
    books: [
      {
        name: "user-authentication",
        path: "/onboard/user-authentication",
        title: "User Authentication via Sequence Embedded Wallet",
        description: "",
      },
      {
        name:"multiple-wallets",
        path: "/onboard/multiple-wallets",
        title:"Connect multiple wallets",
        description:"",
      },
      {
        name:"wallet-inventory",
        path: "/onboard/wallet-inventory",
        title:"Display Wallet Inventory",
        description:"",
      }
    ]
  },
  {
    name:"monetize",
    title:"Monetize",
    path: "/monetize",
    description: "",
    books: [
      {
        name: "in-game-marketplace",
        title: "Implementing an In-Game Web3 Marketplace",
        path: "/monetize/in-game-marketplace",
        description: "",
      },
      {
        name:"primary-sale-nft",
        title:"Implementing primary sale for NFTs",
        path: "/monetize/primary-sale-nft",
        description:"",
      },
      {
        name:"primary-sale-off-chain-digital-goods",
        title:"Implementing primary sales for off-chain digital goods",
        path: "/monetize/primary-sale-off-chain-digital-goods",
        description:"",
      },
      {
        name:"crypto-onramp-credit-card",
        title:"Implementing crypto onramp with credit card payments",
        path: "/monetize/crypto-onramp-credit-card",
        description:"",
      }
    ]
  },
  {
    name:"power",
    title:"Power",
    description: "",
    path: "/power",
    books: [
      {
        name: "contract-inventory",
        title: "Showing contract inventory in user’s wallet",
        path: "/power/contract-inventory",
        description: "",
      },
      {
        name:"minting-tokens",
        title:"Minting Tokens in Web3",
        path: "/power/minting-tokens",
        description:"",
      },
      {
        name:"listening-to-web3-events",
        title:"Listening to Web3 Events Using Webhooks",
        path: "/power/listening-to-web3-events",
        description:"",
      }
    ]
  }
] as const