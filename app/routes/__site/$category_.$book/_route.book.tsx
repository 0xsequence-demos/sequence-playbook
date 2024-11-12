import { Main } from "~/components/main/Main";
import { Code } from "../../../components/code/Code";
import { SendTestTransactionWidget } from "~/examples/authenticate/SendTestTransactionWidget";
import SendTestTransactionWidgetSource from "~/examples/authenticate/SendTestTransactionWidget?raw";
import { BrowserWindow } from "~/components/browser-window/BrowserWindow";
import { getDefaultWaasConnectors, KitProvider } from "@0xsequence/kit";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";

export default function BookRoute() {
  const queryClient = new QueryClient();

  const projectAccessKey = import.meta.env.VITE_PROJECT_ACCESS_KEY;
  const waasConfigKey = import.meta.env.VITE_WAAS_CONFIG_KEY;
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const appleClientId = import.meta.env.VITE_APPLE_CLIENT_ID;
  const appleRedirectURI = window.location.origin + window.location.pathname;
  const walletConnectId = import.meta.env.VITE_WALLET_CONNECT_ID;

  const connectors = getDefaultWaasConnectors({
    walletConnectProjectId: walletConnectId,
    waasConfigKey,
    googleClientId,
    // Notice: Apple Login only works if deployed on https (to support Apple redirects)
    appleClientId,
    appleRedirectURI,
    /* Arbitrum sepolia chainId */
    defaultChainId: 421614,
    appName: "Kit Starter",
    projectAccessKey,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transports: { [key: number]: any } = {};

  chains.forEach((chain) => {
    transports[chain.id] = http();
  });

  const config = createConfig({
    transports,
    connectors,
    chains,
  });

  const kitConfig = {
    projectAccessKey,
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <KitProvider config={kitConfig}>
          <Main>
            <div className="w-full max-w-screen-xl px-8 py-16 gap-10 flex flex-col">
              Book
              <h3>Sign a message</h3>
              <div className="grid md:grid-cols-2">
                <div className="">
                  <Code>{SendTestTransactionWidgetSource}</Code>
                </div>
                <div className="">
                  <BrowserWindow
                  // botMood={!address ? "dead" : signedData ? "happy" : "neutral"}
                  >
                    <SendTestTransactionWidget />
                    string.
                  </BrowserWindow>
                </div>
              </div>
            </div>
          </Main>
        </KitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
