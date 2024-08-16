import { useAccount } from "wagmi";
import { AuthenticationWidget } from "../components/AuthenticationWidget";
import AuthenticationWidgetSource from "../components/AuthenticationWidget?raw";
import { formatAsCode } from "../components/formatAsCode";
import { SignMessageWidget } from "../components/SignMessageWidget";
import SignMessageWidgetSource from "../components/SignMessageWidget?raw";
import { SendTestTransactionWidget } from "../components/SendTestTransactionWidget";
import SendTestTransactionWidgetSource from "../components/SendTestTransactionWidget?raw";

export const PageAuthenticate = () => {
  const { address } = useAccount();

  return (
    <div>
      <h2>User Authentication via Sequence Embedded Wallet</h2>
      <p>
        Everything starts with user authentication. To authenticate a user with
        an embedded web3 wallet, we first need to integrate web3 providers into
        the base of our application.
      </p>
      <p>For the purposes of this demo, we're using 3 providers, like so:</p>
      <p className="full code">
        {formatAsCode(`...
<WagmiProvider config={config}>
  <QueryClientProvider client={queryClient}>
    <KitProvider config={kitConfig}>
      <Home />
    </KitProvider>
  </QueryClientProvider>
</WagmiProvider>
);`)}
      </p>
      <p>
        Now, deeper in the App, we can implement a simple authentication widget
        to connect and disconnect.
      </p>
      <div className="row">
        <p className="column code">
          {formatAsCode(AuthenticationWidgetSource)}
        </p>
        <div className="column">
          <AuthenticationWidget />
        </div>
      </div>
      {!address ? (
        <p>
          <b>
            To see what you can do once you're authenticated, Connect a wallet
            above.
          </b>
        </p>
      ) : (
        <p>While a user is connected, they can do various things, like:</p>
      )}
      <div className={address ? "" : "ghost"}>
        <h3>Sign a message</h3>
        <div className="row">
          <p className="column code">{formatAsCode(SignMessageWidgetSource)}</p>
          <div className="column">
            <SignMessageWidget />
          </div>
        </div>
        <h3>Send a test transaction</h3>
        <div className="row">
          <p className="column code">
            {formatAsCode(SendTestTransactionWidgetSource)}
          </p>
          <div className="column">
            <SendTestTransactionWidget />
          </div>
        </div>
      </div>
    </div>
  );
};
