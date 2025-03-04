import { Resources } from "~/components/resources/Resources";
import { MultipleWalletConnectWidget } from "~/examples/MultipleWalletConnectWidget";
import { useAccount } from "wagmi";
import { ResourceName } from "../resources";

const info = {
  name: "ecosystem-wallets",
  path: "/onboard/ecosystem-wallets",
  title: "Ecosystem Wallets",
  shortname: "Ecosystem Wallets",
  // image: {
  //   src: "ecosystem-wallets",
  // },

  platforms: {
    web: "https://docs.sequence.xyz/solutions/wallets/ecosystem/overview",
  },
  description: "Manage your wallet with ease for your ecosystem",
} as const;

const resources: ResourceName[] = ["ecosystem-wallet"];

const dependencies = [MultipleWalletConnectWidget];

function component() {
  const { address } = useAccount();

  const handleIframeClick = () => {
    // redirect to the web platform
    window.open("https://acme.ecosystem-demo.xyz/auth", "_blank");
  };

  return (
    <>
      <h2>Explore the Ecosystem of Wallets</h2>
      Create a wallet for your ecosystem and manage it with ease
      <div className="relative aspect-[calc(3/4)] lg:aspect-[calc(8/5)] w-full overflow-hidden mx-auto rounded-xl">
        <button
          className="absolute top-0 left-0 w-full h-full bg-transparent"
          onClick={handleIframeClick}
          rel="noreferrer"
        />

        <iframe
          className="rounded-xl w-full h-full"
          src="https://acme.ecosystem-demo.xyz/auth"
        />
      </div>
      <Resources items={resources} />
    </>
  );
}

export default {
  info,
  component,
  dependencies,
};
