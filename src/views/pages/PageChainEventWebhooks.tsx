import { CommonPageProps } from "./common/Props";
import { useCommonPageEffects } from "./common/UseEffects";

export const PageChainEventWebhooks = (props: CommonPageProps) => {
  useCommonPageEffects(props);

  return (
    <div>
      <h2>Listening to Web3 Events Using Webhooks</h2>
      <ul>
        <li>Show code sample for listening to events</li>
      </ul>
    </div>
  );
};
