import { CommonPageProps } from "./common/Props";
import { useCommonPageEffects } from "./common/UseEffects";

export const PageCryptoOnramp = (props: CommonPageProps) => {
  useCommonPageEffects(props);
  return (
    <div>
      <h2>
        Implementing an Onramp Solution for Cryptocurrency with Credit Card
        Payments
      </h2>
      <ul>
        <li>Authenticate user with email or social auth</li>
        <li>Show onramp options for the wallet</li>
      </ul>
    </div>
  );
};
