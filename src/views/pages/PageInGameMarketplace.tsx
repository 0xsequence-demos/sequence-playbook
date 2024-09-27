import { CommonPageProps } from "./common/Props";
import { useCommonPageEffects } from "./common/UseEffects";

export const PageInGameMarketplace = (props: CommonPageProps) => {
  useCommonPageEffects(props);
  return (
    <div>
      <h2>Implementing an In-Game Web3 Marketplace</h2>
      <ul>
        <li>Authenticate user with email or social auth</li>
        <li>Display a list of available items for sale in the marketplace</li>
        <li>
          Click on an item to trigger checkout options: Credit/Debit Card,
          Crypto Payment, Swap and Pay, Onramp and Pay
        </li>
        <li>Submit transaction and monitor purchase</li>
      </ul>
    </div>
  );
};
