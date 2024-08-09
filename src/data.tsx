import { PageAuthenticate } from "./pages/PageAuthenticate";
import { PageChainEventWebhooks } from "./pages/PageChainEventWebhooks";
import { PageCryptoOnramp } from "./pages/PageCryptoOnramp";
import { PageDisplayWalletInventory } from "./pages/PageDisplayWalletInventory";
import { PageDisplayWalletSubInventory } from "./pages/PageDisplayWalletSubInventory";
import { PageInGameMarketplace } from "./pages/PageInGameMarketplace";
import { PageLinkWallets } from "./pages/PageLinkWallets";
import { PageMintTokens } from "./pages/PageMintTokens";
import { PageNothingHere } from "./pages/PageNothingHere";
import { PagePrimaryOffChainSales } from "./pages/PagePrimaryOffChainSales";
import { PagePrimaryOnChainSales } from "./pages/PagePrimaryOnChainSales";

export const categories = ["Onboard", "Monetize", "Power"] as const;
export type Category = (typeof categories)[number];

export const categoryIcons: { [K in Category]: string } = {
  Onboard: "🚢",
  Monetize: "💰",
  Power: "⚡️",
};

export const demos = [
  "kit-embedded-wallet-react-boilerplate",
  "kit-embedded-wallet-nextjs-boilerplate",
  "kit-universal-wallet-nextjs-boilerplate",
  "kit-universal-wallet-react-boilerplate",
  "marketplace-boilerplate",
  "ingame-marketplace-boilerplate",
  "gift-wallet-inventory-boilerplate",
  "offchain-sales-boilerplate",
  "crypto-onramp-boilerplate",
  "purchased-minting-api-boilerplate",
] as const;

export type Demo = (typeof demos)[number];

class UserStory {
  constructor(
    public category: Category,
    public label: string,
    public summary: string,
    public page: JSX.Element = PageNothingHere,
    public demos?: Demo[],
  ) {
    //
  }
}
function us(...args: ConstructorParameters<typeof UserStory>) {
  return new UserStory(...args);
}

export const userStories: UserStory[] = [
  us(
    "Onboard",
    "Authenticate",
    "Authenticate users with email or social login using Embedded Wallet",
    PageAuthenticate,
    [
      "kit-embedded-wallet-react-boilerplate",
      "kit-embedded-wallet-nextjs-boilerplate",
    ],
  ),
  us(
    "Onboard",
    "Link Wallets",
    "Link multiple wallets to a single player profile",
    PageLinkWallets,
  ),
  us(
    "Onboard",
    "Display Wallet Inventory",
    "Display wallet inventory with Sequence Kit",
    PageDisplayWalletInventory,
    ["marketplace-boilerplate"],
  ),
  us(
    "Monetize",
    "In-Game Marketplace",
    "Launch an embedded marketplace",
    PageInGameMarketplace,
    ["ingame-marketplace-boilerplate"],
  ),
  us(
    "Monetize",
    "Primary On-Chain Sales",
    "Sell on-chain items, accept payments in credit/debit card or any cryptocurrency on any EVM chain",
    PagePrimaryOnChainSales,
    ["purchased-minting-api-boilerplate"],
  ),
  us(
    "Monetize",
    "Primary Off-Chain Sales",
    "Sell off-chain items, accept payments in any cryptocurrency on any EVM chain",
    PagePrimaryOffChainSales,
    ["offchain-sales-boilerplate"],
  ),
  us(
    "Monetize",
    "Crypto Onramp",
    "Fund wallets with easy onramp links for fiat to crypto",
    PageCryptoOnramp,
    ["crypto-onramp-boilerplate"],
  ),
  us(
    "Power",
    "Display Wallet Sub-Inventory",
    "Query wallet inventory for a specific contract",
    PageDisplayWalletSubInventory,
    ["marketplace-boilerplate", "gift-wallet-inventory-boilerplate"],
  ),
  us(
    "Power",
    "Mint Tokens",
    "Mint any token from your backend securely, leveraging Transaction APIs",
    PageMintTokens,
    ["gift-wallet-inventory-boilerplate"],
  ),
  us(
    "Power",
    "Chain Event Webhooks",
    "Listen to any blockchain event using webhooks count and list successful transactions",
    PageChainEventWebhooks,
    ["ingame-marketplace-boilerplate"],
  ),
];
