import { type ResourceItemProps } from "~/components/resources/Resources";

type ResourceName = 
"email-embedded-wallet-react-boilerplate" |
"embedded-wallet-playfab-react-boilerplate" |
"google-embedded-wallet-react-boilerplate" |
"kit-embedded-wallet-nextjs-boilerplate" |
"kit-embedded-wallet-react-boilerplate" |
"kit-embedded-wallet-remix-cloudflare-boilerplate" |
"kit-embedded-wallet-remix-nodejs-boilerplate" |
"kit-universal-wallet-nextjs-boilerplate" |
"kit-universal-wallet-react-boilerplate" |
"stytch-embedded-wallet-react-boilerplate" |
"telegram-kit-embedded-wallet-react-boilerplate" |
"telegram-metamask-react-boilerplate" |
"telegram-sequencejs-react-boilerplate" |
"universal-wallet-react-boilerplate" |
"wallet-linking-boilerplate" |
"gift-wallet-inventory-boilerplate" |
"crypto-onramp-boilerplate" |
"sequence-pay-boilerplate" | 
"ingame-marketplace-boilerplate" |
"primary-drop-sale-721-boilerplate" |
"primary-sale-1155-boilerplate" | 
"offchain-sales-boilerplate" | 
"web3-events-boilerplate" |
"server-side-transactions-boilerplate"

export const resources: {
  [K in ResourceName]: ResourceItemProps;
} = {
  "email-embedded-wallet-react-boilerplate": {
    type: "boilerplate",
    title: "Sequence Wallet Boilerplate",
    image: {
      src: "example1",
      alt: "",
    },
    links: [
      {
        label: "Demo",
        href: "",
      },
      {
        label: "Source",
        icon: "github",
        href: "",
      },
    ],
  },
  "embedded-wallet-playfab-react-boilerplate": {
    type: "boilerplate",
    title: "Sequence Wallet Boilerplate",
    image: {
      src: "example1",
      alt: "",
    },
    links: [
      {
        label: "Demo",
        href: "",
      },
      {
        label: "Source",
        icon: "github",
        href: "",
      },
    ],
  },
  "google-embedded-wallet-react-boilerplate": {
    type: "boilerplate",
    title: "Sequence Wallet Boilerplate",
    image: {
      src: "example1",
      alt: "",
    },
    links: [
      {
        label: "Demo",
        href: "",
      },
      {
        label: "Source",
        icon: "github",
        href: "",
      },
    ],
  },
  "kit-embedded-wallet-nextjs-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  },
  "kit-embedded-wallet-react-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  },
  "kit-embedded-wallet-remix-cloudflare-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  },
  "kit-embedded-wallet-remix-nodejs-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  },
  "kit-universal-wallet-nextjs-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  },
  "kit-universal-wallet-react-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  },
  "stytch-embedded-wallet-react-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  },
  "telegram-kit-embedded-wallet-react-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  },
  "telegram-metamask-react-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  },
  "telegram-sequencejs-react-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  },
  "universal-wallet-react-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  },
  "wallet-linking-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  },
  "gift-wallet-inventory-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  },
  "crypto-onramp-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  },
  "sequence-pay-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  },
  "ingame-marketplace-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  },
  "primary-drop-sale-721-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  },
  "primary-sale-1155-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  },
  "offchain-sales-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  },
  "web3-events-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  },
  "server-side-transactions-boilerplate": {
    image: {
      src: "",
      alt: undefined
    },
    type: "boilerplate",
    title: "",
    links: []
  }
};
for (const key of Object.keys(resources) as ResourceName[]) {
  resources[key].title = resources[key].title || key
}


export function includeResources(list: ResourceName | ResourceName[]) {
  if (typeof list === "string") {
    list = [list];
  }

  return list.map(name => resources[name]);
  // return resources.filter((resource) => list.includes(resource.name));
}
