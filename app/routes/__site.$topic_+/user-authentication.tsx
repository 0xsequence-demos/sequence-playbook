import { Main } from "~/components/main/Main";
import { SendTestTransactionWidget } from "~/examples/SendTestTransactionWidget";
import { SignMessageWidget } from "~/examples/SignMessageWidget";
import { BrowserWindow } from "~/components/browser-window/BrowserWindow";
import { useAccount } from "wagmi";
import { useState } from "react";
import { Providers } from "~/examples/Providers";
import { AuthenticationWidget } from "~/examples/AuthenticationWidget";
import { CopyToClipboardButton } from "../../components/copy-to-clipboard-button/CopyToClipboardButton";
import { Icon } from "~/components/icon/Icon";
import { LoaderFunctionArgs } from "@remix-run/server-runtime";
import { getLoaderBookData } from "~/helpers/get-loader-book-data";
import { useLoaderData } from "@remix-run/react";
import { BookTitle } from "~/components/book-title/BookTitle";

export async function loader({ params }: LoaderFunctionArgs) {
  const { book, topic } = getLoaderBookData({
    topic: params.topic,
    book: "user-authentication",
  });

  return {
    book,
    topic,
  };
}

export default function BookRoute() {
  const { topic, book } = useLoaderData<typeof loader>();

  const { address } = useAccount();
  const [transaction, setTransaction] = useState<`0x${string}` | undefined>();
  const [signedData, setSignedData] = useState<`0x${string}` | undefined>();

  return (
    <Main>
      <div className="w-full max-w-screen-xl px-8 py-16 gap-10 flex flex-col">
        <BookTitle book={book} topic={topic} />
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
          Now, deeper in the App, we can implement a simple authentication
          widget to connect and disconnect.
        </p>
        <div className="grid md:grid-cols-2 gap-x-4">
          <div className="relative">
            <CopyToClipboardButton value={AuthenticationWidget.String} asChild>
              <button className="absolute top-3 right-3 h-8 w-10 rounded-[7px] bg-black/20 flex items-center justify-center border border-white/15">
                <Icon name="copy" className="size-4" />
              </button>
            </CopyToClipboardButton>

            <AuthenticationWidget.Snippet />
          </div>
          <div className="top-0 sticky">
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
      </div>
    </Main>
  );
}
