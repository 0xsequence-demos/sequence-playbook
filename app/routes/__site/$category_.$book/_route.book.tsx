import { Main } from "~/components/main/Main";
import { Code } from "../../../components/code/Code";
import { SendTestTransactionWidget } from "~/examples/authenticate/SendTestTransactionWidget";
import SendTestTransactionWidgetSource from "~/examples/authenticate/SendTestTransactionWidget?raw";
import { BrowserWindow } from "~/components/browser-window/BrowserWindow";
import { getDefaultWaasConnectors, KitProvider } from "@0xsequence/kit";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { LoaderFunctionArgs } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request, context }: LoaderFunctionArgs){
  const env = context.cloudflare.env;
  const url = new URL(request.url);
  const origin = url.origin;
  const pathname = url.pathname;
  return {
    projectAccessKey: env.PROJECT_ACCESS_KEY,
    waasConfigKey: env.WAAS_CONFIG_KEY,
    googleClientId: env.GOOGLE_CLIENT_ID,
    appleClientId: env.APPLE_CLIENT_ID,
    appleRedirectURI: origin + pathname,
    walletConnectProjectId: env.WALLET_CONNECT_ID
  }

}

export default function BookRoute() {
  const queryClient = new QueryClient();

  const {
    projectAccessKey,
    waasConfigKey,
    googleClientId,
    appleClientId,
    appleRedirectURI,
    walletConnectProjectId
  } = useLoaderData<typeof loader>();


  const connectors = getDefaultWaasConnectors({
    walletConnectProjectId,
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
    ssr: true,
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
              Book11
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
