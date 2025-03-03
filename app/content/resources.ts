import { type ResourceItemProps } from "~/components/resources/Resources";

export type ResourceName =
  | "email-embedded-wallet-react-boilerplate"
  | "embedded-wallet-playfab-react-boilerplate"
  | "google-embedded-wallet-react-boilerplate"
  | "kit-embedded-wallet-nextjs-boilerplate"
  | "kit-embedded-wallet-react-boilerplate"
  | "kit-embedded-wallet-remix-cloudflare-boilerplate"
  | "kit-embedded-wallet-remix-nodejs-boilerplate"
  // | "kit-universal-wallet-nextjs-boilerplate"
  | "kit-universal-wallet-react-boilerplate"
  | "stytch-embedded-wallet-react-boilerplate"
  | "universal-wallet-react-boilerplate"
  | "wallet-linking-boilerplate"
  | "gift-wallet-inventory-boilerplate"
  | "crypto-onramp-boilerplate"
  | "sequence-pay-boilerplate"
  | "ingame-marketplace-boilerplate"
  | "primary-drop-sale-721-boilerplate"
  | "primary-sale-1155-boilerplate"
  | "offchain-sales-boilerplate"
  | "web3-events-boilerplate"
  | "ecosystem-wallet"
  | "server-side-transactions-boilerplate";

export const resources: {
  [K in ResourceName]: ResourceItemProps;
} = {
  "email-embedded-wallet-react-boilerplate": {
    type: "boilerplate",
    title: "Embedded Wallet - Email",
    image: {
      src: "bg-blue",
      alt: "",
    },
    links: [
      {
        label: "Demo",
        href: "https://email-embedded-wallet-react-boilerplate.sequence-demos.xyz",
      },
      {
        label: "Source",
        icon: "github",
        href: "https://github.com/0xsequence-demos/email-embedded-wallet-react-boilerplate",
      },
    ],
    icons: {
      topLeft: "sequencejs",
      topRight: "react",
    },
  },
  "embedded-wallet-playfab-react-boilerplate": {
    type: "boilerplate",
    title: "Embedded Wallet - Playfab",
    image: {
      src: "bg-blue",
      alt: "",
    },
    links: [
      // {
      //   label: "Demo",
      //   href: "http://embedded-wallet-playfab-react-boilerplate.sequence-demos.xyz",
      // },
      {
        label: "Source",
        icon: "github",
        href: "https://github.com/0xsequence-demos/embedded-wallet-playfab-react-boilerplate",
      },
    ],
    icons: {
      topLeft: "sequencejs",
      topRight: ["playfab", "react"],
    },
  },
  "google-embedded-wallet-react-boilerplate": {
    type: "boilerplate",
    title: "Embedded Wallet - Google",
    image: {
      src: "bg-blue",
      alt: "",
    },
    links: [
      {
        label: "Demo",
        href: "http://google-embedded-wallet-react-boilerplate.sequence-demos.xyz",
      },
      {
        label: "Source",
        icon: "github",
        href: "https://github.com/0xsequence-demos/google-embedded-wallet-react-boilerplate",
      },
    ],
    icons: {
      topLeft: "sequencejs",
      topRight: ["google", "react"],
    },
  },
  "kit-embedded-wallet-nextjs-boilerplate": {
    image: {
      src: "bg-purple",
      alt: undefined,
    },
    type: "boilerplate",
    title: "Sequence Kit - NextJS",
    links: [
      {
        label: "Demo",
        href: "http://kit-embedded-wallet-nextjs-boilerplate.sequence-demos.xyz",
      },
      {
        label: "Source",
        icon: "github",
        href: "https://github.com/0xsequence-demos/kit-embedded-wallet-nextjs-boilerplate",
      },
    ],
    icons: {
      topLeft: "kit",
      topRight: "nextjs",
    },
  },
  "kit-embedded-wallet-react-boilerplate": {
    image: {
      src: "bg-purple",
      alt: undefined,
    },
    type: "boilerplate",
    title: "Sequence Kit - React",
    links: [
      {
        label: "Demo",
        href: "http://kit-embedded-wallet-react-boilerplate.sequence-demos.xyz",
      },
      {
        label: "Source",
        icon: "github",
        href: "https://github.com/0xsequence-demos/kit-embedded-wallet-react-boilerplate",
      },
    ],
    icons: {
      topLeft: "kit",
      topRight: "react",
    },
  },
  "kit-embedded-wallet-remix-cloudflare-boilerplate": {
    image: {
      src: "bg-purple",
      alt: undefined,
    },
    type: "boilerplate",
    title: "Sequence Kit - Remix + Cloudflare",
    links: [
      {
        label: "Demo",
        href: "http://kit-embedded-wallet-remix-cloudflare-boilerplate.sequence-demos.xyz",
      },
      {
        label: "Source",
        icon: "github",
        href: "https://github.com/0xsequence-demos/kit-embedded-wallet-remix-cloudflare-boilerplate",
      },
    ],
    icons: {
      topLeft: "kit",
      topRight: ["remix", "cloudflare"],
    },
  },
  "kit-embedded-wallet-remix-nodejs-boilerplate": {
    image: {
      src: "bg-purple",
      alt: undefined,
    },
    type: "boilerplate",
    title: "Sequence Kit - Remix + NodeJS",
    links: [
      {
        label: "Demo",
        href: "https://kit-embedded-wallet-remix-nodejs-boilerplate.vercel.app",
      },
      {
        label: "Source",
        icon: "github",
        href: "https://github.com/0xsequence-demos/kit-embedded-wallet-remix-nodejs-boilerplate",
      },
    ],
    icons: {
      topLeft: "kit",
      topRight: ["remix", "nodejs"],
    },
  },
  // "kit-universal-wallet-nextjs-boilerplate": {
  //   image: {
  //     src: "bg-purple",
  //     alt: undefined,
  //   },
  //   type: "boilerplate",
  //   title: "Kit Universal Wallet",
  //   links: [
  //     {
  //       label: "Demo",
  //       href: "http://kit-universal-wallet-nextjs-boilerplate.sequence-demos.xyz",
  //     },
  //     {
  //       label: "Source",
  //       icon: "github",
  //       href: "https://github.com/0xsequence-demos/kit-universal-wallet-nextjs-boilerplate",
  //     },
  //   ],
  //   icons: {
  //     topLeft: "kit",
  //     topRight: "nextjs",
  //   },
  // },
  "kit-universal-wallet-react-boilerplate": {
    image: {
      src: "bg-purple",
      alt: undefined,
    },
    type: "boilerplate",
    title: "Kit Universal Wallet",
    icons: {
      topLeft: "kit",
      topRight: "react",
    },
    links: [
      {
        label: "Demo",
        href: "http://kit-universal-wallet-react-boilerplate.sequence-demos.xyz",
      },
      {
        label: "Source",
        icon: "github",
        href: "https://github.com/0xsequence-demos/kit-universal-wallet-react-boilerplate",
      },
    ],
  },
  "stytch-embedded-wallet-react-boilerplate": {
    image: {
      src: "bg-blue",
      alt: undefined,
    },
    type: "boilerplate",
    title: "Stych Embedded Wallet",
    links: [
      {
        label: "Demo",
        href: "http://stytch-embedded-wallet-react-boilerplate.sequence-demos.xyz",
      },
      {
        label: "Source",
        icon: "github",
        href: "https://github.com/0xsequence-demos/stytch-embedded-wallet-react-boilerplate",
      },
    ],
    icons: {
      topLeft: "sequencejs",
      topRight: ["stych", "react"],
    },
  },
  "universal-wallet-react-boilerplate": {
    image: {
      src: "bg-blue",
      alt: undefined,
    },
    type: "boilerplate",
    title: "Universal Wallet",
    links: [
      {
        label: "Demo",
        href: "http://universal-wallet-react-boilerplate.sequence-demos.xyz",
      },
      {
        label: "Source",
        icon: "github",
        href: "https://github.com/0xsequence-demos/universal-wallet-react-boilerplate",
      },
    ],
    icons: {
      topLeft: "sequencejs",
      topRight: "react",
    },
  },
  "wallet-linking-boilerplate": {
    image: {
      src: "",
      alt: undefined,
    },
    type: "boilerplate",
    title: "",
    links: [],
  },
  "gift-wallet-inventory-boilerplate": {
    image: {
      src: "",
      alt: undefined,
    },
    type: "boilerplate",
    title: "",
    links: [],
  },
  "crypto-onramp-boilerplate": {
    image: {
      src: "bg-blue",
      alt: undefined,
    },
    type: "boilerplate",
    title: "Onramp to Crypto with Credit Card",
    links: [
      {
        label: "Demo",
        href: "https://crypto-onramp-boilerplate.sequence-demos.xyz/",
      },
      {
        label: "Source",
        icon: "github",
        href: "https://github.com/0xsequence-demos/crypto-onramp-boilerplate",
      },
    ],
    icons: {
      topLeft: "kit",
      topRight: "react",
    },
  },
  "sequence-pay-boilerplate": {
    image: {
      src: "bg-blue",
      alt: undefined,
    },
    type: "boilerplate",
    title: "Sequence Pay - NFT Checkout",
    links: [
      {
        label: "Demo",
        href: "https://sequence-pay-boilerplate.sequence-demos.xyz",
      },
      {
        label: "Source",
        icon: "github",
        href: "https://github.com/0xsequence-demos/sequence-pay-boilerplate",
      },
    ],
    icons: {
      topLeft: "kit",
      topRight: "react",
    },
  },
  "ingame-marketplace-boilerplate": {
    image: {
      src: "",
      alt: undefined,
    },
    type: "boilerplate",
    title: "",
    links: [],
  },
  "primary-drop-sale-721-boilerplate": {
    image: {
      src: "bg-blue",
      alt: undefined,
    },
    type: "boilerplate",
    title: "Primary Drop Sale - ERC721",
    links: [
      {
        label: "Demo",
        href: "https://primary-drop-sale-721-boilerplate.sequence-demos.xyz/",
      },
      {
        label: "Source",
        icon: "github",
        href: "https://github.com/0xsequence-demos/primary-drop-sale-721-boilerplate",
      },
    ],
    icons: {
      topLeft: "kit",
      topRight: "react",
    },
  },
  "primary-sale-1155-boilerplate": {
    image: {
      src: "bg-blue",
      alt: undefined,
    },
    type: "boilerplate",
    title: "Webshop Sale - ERC1155",
    links: [
      {
        label: "Demo",
        href: "https://primary-sale-1155-boilerplate.sequence-demos.xyz/",
      },
      {
        label: "Source",
        icon: "github",
        href: "https://github.com/0xsequence-demos/primary-sale-1155-boilerplate",
      },
    ],
    icons: {
      topLeft: "kit",
      topRight: "react",
    },
  },
  "offchain-sales-boilerplate": {
    image: {
      src: "",
      alt: undefined,
    },
    type: "boilerplate",
    title: "",
    links: [],
  },
  "web3-events-boilerplate": {
    image: {
      src: "",
      alt: undefined,
    },
    type: "boilerplate",
    title: "",
    links: [],
  },
  "server-side-transactions-boilerplate": {
    image: {
      src: "bg-blue",
      alt: undefined,
    },
    type: "boilerplate",
    title: "NFT Minter",
    links: [
      {
        label: "Source",
        icon: "github",
        href: "https://github.com/0xsequence-demos/server-side-transactions-boilerplate",
      },
    ],
    icons: {
      topLeft: "sequencejs",
      topRight: ["nodejs"],
    },
  },
  "ecosystem-wallet": {
    image: {
      src: "bg-blue",
      alt: undefined,
    },
    type: "boilerplate",
    title: "Ecosystem Wallet",
    links: [
      {
        label: "Source",
        icon: "github",
        href: "https://github.com/0xsequence/ecosystem-wallet",
      },
    ],
    icons: {
      topLeft: "sequencejs",
      topRight: ["nodejs"],
    },
  },
};

for (const key of Object.keys(resources) as ResourceName[]) {
  resources[key].title = resources[key].title || key;
}

export function includeResources(list?: ResourceName | ResourceName[]) {
  if (!list) return [];

  if (typeof list === "string") {
    list = [list];
  }

  return list.map((name) => resources[name]);
  // return resources.filter((resource) => list.includes(resource.name));
}
