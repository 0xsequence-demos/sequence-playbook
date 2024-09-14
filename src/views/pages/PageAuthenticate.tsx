import { useAccount } from "wagmi";
import { AuthenticationWidget } from "../components/AuthenticationWidget";
import AuthenticationWidgetSource from "../components/AuthenticationWidget?raw";
import { formatAsCode } from "../components/formatAsCode";
import { SignMessageWidget } from "../components/SignMessageWidget";
import SignMessageWidgetSource from "../components/SignMessageWidget?raw";
import { SendTestTransactionWidget } from "../components/SendTestTransactionWidget";
import SendTestTransactionWidgetSource from "../components/SendTestTransactionWidget?raw";
import { LittleWindow } from "../components/LittleWindow";
import { useState } from "react";

export const PageAuthenticate = () => {
  const { address } = useAccount();

  const [signedData, setSignedData] = useState<`0x${string}` | undefined>();
  const [transaction, setTransaction] = useState<`0x${string}` | undefined>();

  return (
    <div>
      <h2>User Authentication via Sequence Embedded Wallet</h2>
      <p>
        Everything starts with user authentication. To authenticate a user with
        an embedded web3 wallet, we first need to integrate web3 providers into
        the base of our application.
      </p>
      <p>For the purposes of this demo, we're using 3 providers, like so:</p>
      <div className="full code">
        {formatAsCode(`...
<WagmiProvider config={config}>
  <QueryClientProvider client={queryClient}>
    <KitProvider config={kitConfig}>
      <Home />
    </KitProvider>
  </QueryClientProvider>
</WagmiProvider>
);`)}
      </div>
      <p>
        Now, deeper in the App, we can implement a simple authentication widget
        to connect and disconnect.
      </p>
      <div className="row">
        <div className="column code">
          {formatAsCode(AuthenticationWidgetSource)}
        </div>
        <div className="column widget">
          <LittleWindow botStatus={!address ? "dead" : "happy"}>
            <AuthenticationWidget />
          </LittleWindow>
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
          <div className="column code">
            {formatAsCode(SignMessageWidgetSource)}
          </div>
          <div className="column widget">
            <LittleWindow
              botStatus={!address ? "dead" : signedData ? "happy" : "alive"}
            >
              <SignMessageWidget setData={setSignedData} />
            </LittleWindow>
          </div>
        </div>
        <h3>Send a test transaction</h3>
        <div className="row">
          <div className="column code">
            {formatAsCode(SendTestTransactionWidgetSource)}
          </div>
          <div className="column widget">
            <LittleWindow
              botStatus={!address ? "dead" : transaction ? "happy" : "alive"}
            >
              <SendTestTransactionWidget setData={setTransaction} />
            </LittleWindow>
          </div>
        </div>
      </div>
    </div>
  );
};
