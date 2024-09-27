import { CommonPageProps } from "./common/Props";
import { useCommonPageEffects } from "./common/UseEffects";

export const PagePrimaryOffChainSales = (props: CommonPageProps) => {
  useCommonPageEffects(props);
  return (
    <div>
      <h2>Implementing a Primary Sale Mechanism for Off-Chain Digital Goods</h2>
      <ul>
        <li>Authenticate user with email or social auth</li>
        <li>
          Display a list of available items for sale (off-chain, no contract
          involved)
        </li>
        <li>
          Click on an item to trigger checkout options: Crypto on any chain,
          with any currency
        </li>
        <li>Pay and show successful purchase</li>
      </ul>
    </div>
  );
};
