import { SendTestTransactionWidget } from "~/examples/SendTestTransactionWidget";
import { SignMessageWidget } from "~/examples/SignMessageWidget";
import { useAccount } from "wagmi";
import { useState } from "react";
import { Providers } from "~/examples/Providers";
import { AuthenticationWidget } from "~/examples/AuthenticationWidget";
import { PlayCard } from "../../components/playcard/PlayCard";

const info = {
  name: "user-authentication",
  path: "/onboard/user-authentication",
  title: "User Authentication via Sequence Embedded Wallet",
  shortname: "User authentication",
  hero: {
    image: "user-authentication@2x.png",
    width: 170,
    height: 122,
    className: "right-[-20px] top-[-10px]",
  },
  description:
    "Everything starts with user authentication. To authenticate a user  with an embedded web3 wallet, we first need to integrate web3 providers into the base of our application.",
};

function Book() {
  const { address } = useAccount();
  const [transaction, setTransaction] = useState<`0x${string}` | undefined>();
  const [signedData, setSignedData] = useState<`0x${string}` | undefined>();

  return (
    <>
      <p>For the purposes of this demo, we're using 3 providers, like so:</p>

      <PlayCard>
        <PlayCard.Code copy={Providers.String}>
          <Providers.Snippet />
        </PlayCard.Code>
      </PlayCard>

      <p>
        Now, deeper in the App, we can implement a simple authentication widget
        to connect and disconnect.
      </p>

      <PlayCard>
        <PlayCard.Preview botMood={!address ? "dead" : "happy"}>
          <AuthenticationWidget />
        </PlayCard.Preview>

        <PlayCard.Code copy={AuthenticationWidget.String}>
          <AuthenticationWidget.Snippet />
        </PlayCard.Code>
      </PlayCard>

      {!address ? (
        <div className="px-12">
          <div className="bg-white/10 rounded-[12px] p-8 flex items-center justify-center text-center">
            <p>
              To see what you can do once you're authenticated, Connect a wallet
              above.
            </p>
          </div>
        </div>
      ) : (
        <p>While a user is connected, they can do various things, like:</p>
      )}

      <div className={`flex flex-col gap-10 ${address ? "" : "opacity-40"}`}>
        <h3>Sign a message</h3>

        <PlayCard>
          <PlayCard.Preview
            botMood={!address ? "dead" : signedData ? "happy" : "neutral"}
          >
            <SignMessageWidget setData={setSignedData} />
          </PlayCard.Preview>

          <PlayCard.Code copy={SignMessageWidget.String}>
            <SignMessageWidget.Snippet />
          </PlayCard.Code>
        </PlayCard>

        <h3>Send a test transaction</h3>

        <PlayCard>
          <PlayCard.Preview
            botMood={!address ? "dead" : transaction ? "happy" : "neutral"}
          >
            <SendTestTransactionWidget setData={setTransaction} />
          </PlayCard.Preview>

          <PlayCard.Code copy={SendTestTransactionWidget.String}>
            <SendTestTransactionWidget.Snippet />
          </PlayCard.Code>
        </PlayCard>
      </div>
    </>
  );
}

export default Object.assign(Book, { info });
