import { SendTestTransactionWidget } from "~/examples/SendTestTransactionWidget";
import { SignMessageWidget } from "~/examples/SignMessageWidget";
import { BrowserWindow } from "~/components/browser-window/BrowserWindow";
import { useAccount } from "wagmi";
import { useState } from "react";
import { Providers } from "~/examples/Providers";
import { AuthenticationWidget } from "~/examples/AuthenticationWidget";
import { CopyToClipboardButton } from "../../components/copy-to-clipboard-button/CopyToClipboardButton";
import { Icon } from "~/components/icon/Icon";

const info = {
  name: "user-authentication",
  path: "/onboard/user-authentication",
  title: "User Authentication via Sequence Embedded Wallet",
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
        <CopyToClipboardButton value={Providers.String} asChild>
          <button className="absolute top-3 right-3 h-8 w-10 rounded-[7px] bg-black/20 flex items-center justify-center border border-white/15">
            <Icon name="copy" className="size-4" />
          </button>
        </CopyToClipboardButton>
        <Providers.Snippet />
      </div>
      <p>
        Now, deeper in the App, we can implement a simple authentication widget
        to connect and disconnect.
      </p>
      <div className="grid md:grid-cols-2 rounded-[12px] bg-neutral-900 overflow-hidden">
        <div className="relative">
          <CopyToClipboardButton value={AuthenticationWidget.String} asChild>
            <button className="absolute top-3 right-3 h-8 w-10 rounded-[7px] bg-black/20 flex items-center justify-center border border-white/15">
              <Icon name="copy" className="size-4" />
            </button>
          </CopyToClipboardButton>

          <AuthenticationWidget.Snippet />
        </div>
        <div
          className="flex flex-col items-center p-8"
          style={{ backgroundImage: "url('/bg-chessboard.svg')" }}
        >
          <BrowserWindow botMood={!address ? "dead" : "happy"}>
            <AuthenticationWidget />
          </BrowserWindow>
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
      <div className={address ? "" : "opacity-40"}>
        <h3>Sign a message</h3>
        <div className="grid md:grid-cols-2 gap-x-4">
          <div className="relative">
            <CopyToClipboardButton value={SignMessageWidget.String} asChild>
              <button className="absolute top-3 right-3 h-8 w-10 rounded-[7px] bg-black/20 flex items-center justify-center border border-white/15">
                <Icon name="copy" className="size-4" />
              </button>
            </CopyToClipboardButton>
            <SignMessageWidget.Snippet />
          </div>
          <div className="top-0 sticky">
            <BrowserWindow
              botMood={!address ? "dead" : signedData ? "happy" : "neutral"}
            >
              <SignMessageWidget setData={setSignedData} />
            </BrowserWindow>
          </div>
        </div>

        <h3>Send a test transaction</h3>
        <div className="grid md:grid-cols-2 gap-x-4">
          <div className="relative">
            <CopyToClipboardButton
              value={SendTestTransactionWidget.String}
              asChild
            >
              <button className="absolute top-3 right-3 h-8 w-10 rounded-[7px] bg-black/20 flex items-center justify-center border border-white/15">
                <Icon name="copy" className="size-4" />
              </button>
            </CopyToClipboardButton>
            <SendTestTransactionWidget.Snippet />
          </div>
          <div className="top-0 sticky">
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
