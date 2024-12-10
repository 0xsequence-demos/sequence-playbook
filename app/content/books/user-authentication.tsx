import { SendTestTransactionWidget } from "~/examples/SendTestTransactionWidget";
import { SignMessageWidget } from "~/examples/SignMessageWidget";
import { BrowserWindow } from "~/components/browser-window/BrowserWindow";
import { useAccount } from "wagmi";
import { useState } from "react";
import { Providers } from "~/examples/Providers";
import { AuthenticationWidget } from "~/examples/AuthenticationWidget";
import { CopyExampleCode } from "../../components/copy-to-clipboard-button/CopyToClipboardButton";

const info = {
  name: "user-authentication",
  path: "/onboard/user-authentication",
  title: "User Authentication via Sequence Embedded Wallet",
  shortname: "User authentication",
  bookIcon: "book-cover-wallet",
  description:
    "Everything starts with user authentication. To authenticate a user  with an embedded web3 wallet, we first need to integrate web3 providers into the base of our application.",
};

function Book({ children }: { children: React.ReactNode }) {
  const { address } = useAccount();
  const [transaction, setTransaction] = useState<`0x${string}` | undefined>();
  const [signedData, setSignedData] = useState<`0x${string}` | undefined>();

  return (
    <>
      {children}

      <p>For the purposes of this demo, we're using 3 providers, like so:</p>

      <div className="relative">
        <CopyExampleCode value={Providers.String} />
        <Providers.Snippet />
      </div>

      <p>
        Now, deeper in the App, we can implement a simple authentication widget
        to connect and disconnect.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 sm:rounded-[12px] text-13 bg-deep-purple-950 border border-white/10 overflow-hidden">
        <div className="relative">
          <CopyExampleCode value={AuthenticationWidget.String} />
          <div className="max-w-full overflow-x-auto">
            <AuthenticationWidget.Snippet />
          </div>
        </div>
        <div className="flex flex-col items-center p-8 bg-gradient-to-b from-white/[4%] to-white/[2%]">
          <BrowserWindow botMood={!address ? "dead" : "happy"}>
            <AuthenticationWidget />
          </BrowserWindow>
        </div>
      </div>

      {!address ? (
        <p>
          To see what you can do once you're authenticated, Connect a wallet
          above.
        </p>
      ) : (
        <p>While a user is connected, they can do various things, like:</p>
      )}

      <div className={`flex flex-col gap-10 ${address ? "" : "opacity-40"}`}>
        <h3>Sign a message</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:rounded-[12px] text-13 bg-deep-purple-950 border border-white/10 overflow-hidden">
          <div className="relative">
            <CopyExampleCode value={SignMessageWidget.String} />
            <div className="pt-8">
              <SignMessageWidget.Snippet />
            </div>
          </div>
          <div className="flex flex-col items-center p-8 bg-gradient-to-b from-white/[4%] to-white/[2%]">
            {" "}
            <BrowserWindow
              botMood={!address ? "dead" : signedData ? "happy" : "neutral"}
            >
              <SignMessageWidget setData={setSignedData} />
            </BrowserWindow>
          </div>
        </div>

        <h3>Send a test transaction</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:rounded-[12px] text-13 bg-deep-purple-950 border border-white/10 overflow-hidden">
          <div className="relative">
            <CopyExampleCode value={SendTestTransactionWidget.String} />
            <SendTestTransactionWidget.Snippet />
          </div>
          <div className="flex flex-col items-center p-8 bg-gradient-to-b from-white/[4%] to-white/[2%]">
            {" "}
            <BrowserWindow
              botMood={!address ? "dead" : transaction ? "happy" : "neutral"}
            >
              <SendTestTransactionWidget setData={setTransaction} />
            </BrowserWindow>
          </div>
        </div>
      </div>
    </>
  );
}

export default Object.assign(Book, { info });
