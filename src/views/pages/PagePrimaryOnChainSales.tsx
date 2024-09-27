import { CommonPageProps } from "./common/Props";
import { useCommonPageEffects } from "./common/UseEffects";

export const PagePrimaryOnChainSales = (props: CommonPageProps) => {
  useCommonPageEffects(props);
  return (
    <div>
      <h2>Implementing a Primary Sale Mechanism for NFTs</h2>
      <ul>
        <li>Authenticate user with email or social auth</li>
        <li>
          Display a list of available items, available to mint with a sale
          contract
        </li>
        <li>Optionally gate access through audience tool or by token-gating</li>
        <li>
          Click on an item to trigger checkout options: Credit/Debit Card,
          Crypto Payment, Swap and Pay, Onramp and Pay
        </li>
        <li>Submit transaction and monitor purchase</li>
      </ul>
    </div>
  );
};
