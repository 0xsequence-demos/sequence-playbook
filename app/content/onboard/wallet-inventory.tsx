import { useAccount } from "wagmi";
import { AuthenticationWidget } from "~/examples/AuthenticationWidget";
import { PlayCard } from "../../components/playcard/PlayCard";
import { Resources } from "~/components/resources/Resources";
import { Divide } from "~/components/divide/Divide";
import { includeResources } from "~/content/resources";

const info = {
  name: "wallet-inventory",
  path: "/onboard/wallet-inventory",
  title: "View your Wallet Inventory via Sequence Kit",
  shortname: "Wallet Inventory",
  image: {
    src: "wallet-inventory",
    // width: 170,
    // height: 122,
    // className: "right-[-20px] top-[-10px]",
  },
  description:
    "A simple and elegant way to view your wallet inventory, with Sequence Kit",
} as const;

const resources = includeResources([
  "gift-wallet-inventory-boilerplate",
]);

function Book() {
  const { address } = useAccount();

  return (
    <>
      <h2>View every asset in your wallet</h2>
      <PlayCard>
        <PlayCard.Preview botMood={!address ? "dead" : "happy"}>
          <AuthenticationWidget />
        </PlayCard.Preview>

        <PlayCard.Code copy={AuthenticationWidget.String}>
          <AuthenticationWidget.Snippet />
        </PlayCard.Code>
      </PlayCard>

      <Divide />

      <Resources items={resources} />
    </>
  );
}

export default Object.assign(Book, { info });
