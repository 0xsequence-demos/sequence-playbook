import "./Home.css";
import { Text } from "@0xsequence/design-system";
import { Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import BigNav from "./components/BigNav";
import PlaybooksGroup from "./PlaybooksGroup";
import { PageAuthenticate } from "./pages/PageAuthenticate";
import { PageLinkWallets } from "./pages/PageLinkWallets";
import { PageDisplayWalletInventory } from "./pages/PageDisplayWalletInventory";
import { PageCryptoOnramp } from "./pages/PageCryptoOnramp";
import { PagePrimaryOffChainSales } from "./pages/PagePrimaryOffChainSales";
import { PagePrimaryOnChainSales } from "./pages/PagePrimaryOnChainSales";
import { PageInGameMarketplace } from "./pages/PageInGameMarketplace";
import { PageDisplayWalletSubInventory } from "./pages/PageDisplayWalletSubInventory";
import { PageMintTokens } from "./pages/PageMintTokens";
import { PageChainEventWebhooks } from "./pages/PageChainEventWebhooks";
import SharedPageHeader from "./SharedPageHeader";
import { Categories } from "../data/Categories";
import { getIcon } from "./utils/getIcon";
const Home = () => {
  const [category, setCategory] = useState("");
  const [currentPageDescription, setCurrentPageDescription] = useState("");
  const [currentPageName, setCurrentPageName] = useState("");
  console.log("category: ", category);
  return (
    <div>
      <div className={`top-nav`}>
        <NavLink
          className={({ isActive, isPending }) =>
            `${isPending ? "pending" : isActive ? "active" : ""} top-nav-link`
          }
          to={`/`}
        >
          {getIcon("playbook")}
          Sequence Playbooks
        </NavLink>
        <div className="spacer" />
        {Categories.map((catName) => (
          <NavLink
            key={`top-nav-${catName.toLowerCase()}`}
            className={({ isActive, isPending }) =>
              `${isPending ? "pending" : isActive ? "active" : ""} top-nav-link`
            }
            to={catName.toLowerCase()}
          >
            {getIcon(catName.toLowerCase())}
            {catName}
          </NavLink>
        ))}
      </div>
      <div className="main-content">
        <BigNav category={category} currentPageName={currentPageName} />
        <SharedPageHeader
          category={category}
          currentPageName={currentPageName}
          currentPageDescription={currentPageDescription}
        />
        <Routes>
          <Route
            path="/"
            element={
              <PlaybooksGroup
                data-category="test"
                category=""
                setCategory={setCategory}
                setCurrentPageName={setCurrentPageName}
                setCurrentPageDescription={setCurrentPageDescription}
              />
            }
          />
          <Route
            path="onboard/*"
            element={
              <PlaybooksGroup
                category="onboard"
                setCategory={setCategory}
                setCurrentPageName={setCurrentPageName}
                setCurrentPageDescription={setCurrentPageDescription}
              >
                <PageAuthenticate
                  label="Authenticate"
                  description="Authenticate users with email or social login using Embedded Wallet"
                  setCurrentPageName={setCurrentPageName}
                  setCurrentPageDescription={setCurrentPageDescription}
                />
                <PageLinkWallets
                  label="Link Wallets"
                  description="Link multiple wallets to a single player profile"
                  setCurrentPageName={setCurrentPageName}
                  setCurrentPageDescription={setCurrentPageDescription}
                />
                <PageDisplayWalletInventory
                  label="Display Wallet Inventory"
                  description="Display wallet inventory with Sequence Kit"
                  setCurrentPageName={setCurrentPageName}
                  setCurrentPageDescription={setCurrentPageDescription}
                />
              </PlaybooksGroup>
            }
          />
          <Route
            path="monetize/*"
            element={
              <PlaybooksGroup
                category="monetize"
                setCategory={setCategory}
                setCurrentPageName={setCurrentPageName}
                setCurrentPageDescription={setCurrentPageDescription}
              >
                <PageInGameMarketplace
                  label="In-Game Marketplace"
                  description="Launch an embedded marketplace"
                  setCurrentPageName={setCurrentPageName}
                  setCurrentPageDescription={setCurrentPageDescription}
                />
                <PagePrimaryOnChainSales
                  label="Primary On-Chain Sales"
                  description="Sell on-chain items, accept payments in credit/debit card or any cryptocurrency on any EVM chain"
                  setCurrentPageName={setCurrentPageName}
                  setCurrentPageDescription={setCurrentPageDescription}
                />
                <PagePrimaryOffChainSales
                  label="Primary Off-Chain Sales"
                  description="Sell off-chain items, accept payments in any cryptocurrency on any EVM chain"
                  setCurrentPageName={setCurrentPageName}
                  setCurrentPageDescription={setCurrentPageDescription}
                />
                <PageCryptoOnramp
                  label="Crypto Onramp"
                  description="Fund wallets with easy onramp links for fiat to crypto"
                  setCurrentPageName={setCurrentPageName}
                  setCurrentPageDescription={setCurrentPageDescription}
                />
              </PlaybooksGroup>
            }
          />
          <Route
            path="power/*"
            element={
              <PlaybooksGroup
                category="power"
                setCategory={setCategory}
                setCurrentPageName={setCurrentPageName}
                setCurrentPageDescription={setCurrentPageDescription}
              >
                <PageDisplayWalletSubInventory
                  label="Display Wallet Sub-Inventory"
                  description="Query wallet inventory for a specific contract"
                  setCurrentPageName={setCurrentPageName}
                  setCurrentPageDescription={setCurrentPageDescription}
                />
                <PageMintTokens
                  label="Mint Tokens"
                  description="Mint any token from your backend securely, leveraging Transaction APIs"
                  setCurrentPageName={setCurrentPageName}
                  setCurrentPageDescription={setCurrentPageDescription}
                />
                <PageChainEventWebhooks
                  label="Chain Event Webhooks"
                  description="Listen to any blockchain event using webhooks count and list successful transactions"
                  setCurrentPageName={setCurrentPageName}
                  setCurrentPageDescription={setCurrentPageDescription}
                />
              </PlaybooksGroup>
            }
          />
        </Routes>
        <footer className="homepage__footer">
          <Text>
            Want to learn more? Read the{" "}
            <a
              href={
                "https://docs.sequence.xyz/solutions/wallets/sequence-kit/overview/"
              }
              target="_blank"
              rel="noreferrer "
            >
              docs
            </a>
            !
          </Text>
        </footer>
      </div>
    </div>
  );
};

export default Home;
