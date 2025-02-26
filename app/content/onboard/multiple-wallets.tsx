import { PlayCard } from "../../components/playcard/PlayCard";
import { Resources } from "~/components/resources/Resources";
import { MultipleWalletConnectWidget } from "~/examples/MultipleWalletConnectWidget";
import { useAccount } from "wagmi";

const info = {
  name: "multiple-wallets",
  path: "/onboard/multiple-wallets",
  title: "Wallet Linking for Better Wallet Management",
  shortname: "Multiple Wallets",
  image: {
    src: "multiple-wallets",
  },
  description: "Link Multiple Wallets to bring your players' assets together",
} as const;

const resources = ["wallet-linking-boilerplate"];

const dependencies = [MultipleWalletConnectWidget];

function component() {
  const { address } = useAccount();
  return (
    <>
      <h2>Nobody has just one wallet anymore</h2>
      Make life easier for your users, by letting them link wallets together and
      stop shuffling assets back and forth
      <PlayCard>
        <PlayCard.Preview botMood={!address ? "dead" : "happy"}>
          <MultipleWalletConnectWidget />
        </PlayCard.Preview>

        <PlayCard.Code
          copy={MultipleWalletConnectWidget.String}
          steps={MultipleWalletConnectWidget.steps}
        />
      </PlayCard>
      {/* <Divide /> */}
      {/* Now that you linked wallets, you can: */}
      {/* <h2>Pay for an item with funds from a linked wallet</h2> */}
      {/* <PlayCard> */}
      {/*   <PlayCard.Preview */}
      {/*     botMood={!address ? "dead" : signedData ? "happy" : "neutral"} */}
      {/*   > */}
      {/*     {address ? ( */}
      {/*       <SignMessageWidget setData={setSignedData} /> */}
      {/*     ) : ( */}
      {/*       <RequireWalletButton title="Connect a wallet test signing a message" /> */}
      {/*     )} */}
      {/*   </PlayCard.Preview> */}
      {/**/}
      {/*   <PlayCard.Code */}
      {/*     copy={SignMessageWidget.String} */}
      {/*     steps={SignMessageWidget.steps} */}
      {/*   /> */}
      {/* </PlayCard> */}
      {/* <Resources items={resources} /> */}
    </>
  );
}

export default {
  info,
  component,
};
