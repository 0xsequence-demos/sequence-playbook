import { CommonPageProps } from "./common/Props";
import { useCommonPageEffects } from "./common/UseEffects";

export const PageDisplayWalletSubInventory = (props: CommonPageProps) => {
  useCommonPageEffects(props);
  return (
    <div>
      <h2>Displaying Inventory for a Specific Contract in a User's Wallet</h2>
      <ul>
        <li>Authenticate user with email or social auth</li>
        <li>Mint a group of NFTs to the wallet</li>
        <li>Display wallet inventory with an API call to Indexer</li>
      </ul>
    </div>
  );
};
