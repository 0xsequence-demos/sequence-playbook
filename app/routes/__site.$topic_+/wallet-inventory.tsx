import { Main } from "~/components/main/Main";
import { SendTestTransactionWidget } from "~/examples/SendTestTransactionWidget";
import { SignMessageWidget } from "~/examples/SignMessageWidget";

import { BrowserWindow } from "~/components/browser-window/BrowserWindow";
import { getDefaultWaasConnectors, KitProvider } from "@0xsequence/kit";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, useAccount, WagmiProvider } from "wagmi";
import { LoaderFunctionArgs } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";

import chains from "~/utils/chains";
import { useState } from "react";
import { CopyToClipboardButton } from "~/components/copy-to-clipboard-button/CopyToClipboardButton";

export async function loader({ request, context }: LoaderFunctionArgs) {
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
    walletConnectProjectId: env.WALLET_CONNECT_ID,
  };
}

export default function BookRoute() {
  const queryClient = new QueryClient();

  const {
    projectAccessKey,
    waasConfigKey,
    googleClientId,
    appleClientId,
    appleRedirectURI,
    walletConnectProjectId,
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

  const [transaction, setTransaction] = useState<`0x${string}` | undefined>();
  const [signedData, setSignedData] = useState<`0x${string}` | undefined>();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <KitProvider config={kitConfig}>
          <Main>
            <div className="w-full max-w-screen-xl px-8 py-16 gap-10 flex flex-col">
              <h3>Sign a message</h3>
              <div className="grid md:grid-cols-2">
                <div className="">
                  <CopyToClipboardButton
                    value={SendTestTransactionWidget.String}
                  >
                    Copy
                  </CopyToClipboardButton>
                  <SendTestTransactionWidget.Snippet />
                </div>
                <div className="">
                  <AccountProvider>
                    {({ address }: { address: `0x${string}` | undefined }) => (
                      <BrowserWindow
                        botMood={
                          !address ? "dead" : signedData ? "happy" : "neutral"
                        }
                      >
                        <SendTestTransactionWidget setData={setTransaction} />
                      </BrowserWindow>
                    )}
                  </AccountProvider>
                </div>
              </div>

              <div className="grid md:grid-cols-2">
                <div className="">
                  <CopyToClipboardButton value={SignMessageWidget.String}>
                    Copy
                  </CopyToClipboardButton>
                  <SignMessageWidget.Snippet />
                </div>
                <div className="">
                  <AccountProvider>
                    {({ address }: { address: `0x${string}` | undefined }) => (
                      <BrowserWindow
                        botMood={
                          !address ? "dead" : signedData ? "happy" : "neutral"
                        }
                      >
                        <SignMessageWidget setData={setTransaction} />
                      </BrowserWindow>
                    )}
                  </AccountProvider>
                </div>
              </div>
            </div>
          </Main>
        </KitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function AccountProvider({
  children,
}: {
  children: ({
    address,
  }: {
    address: `0x${string}` | undefined;
  }) => React.ReactNode | null;
}) {
  const { address } = useAccount();

  return typeof children === "function" ? children({ address }) : null;
}
