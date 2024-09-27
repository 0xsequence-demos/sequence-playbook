import { CommonPageProps } from "./common/Props";
import { useCommonPageEffects } from "./common/UseEffects";

export const PageDisplayWalletInventory = (props: CommonPageProps) => {
  useCommonPageEffects(props);
  return (
    <div>
      <h2>Displaying the Inventory of a Web3 Wallet</h2>
      <ul>
        <li>Authenticate user with email or social auth</li>
        <li>Mint a group of NFTs to the wallet</li>
        <li>Display wallet inventory</li>
      </ul>
    </div>
  );
};
