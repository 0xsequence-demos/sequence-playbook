import { useOpenWalletModal } from "@0xsequence/kit-wallet";
import { useOpenConnectModal } from "@0xsequence/kit";
import { useAccount } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";
export const ContractInventoryWidget = () => {
  const { address } = useAccount();
  const { setOpenConnectModal } = useOpenConnectModal();
  const { setOpenWalletModal } = useOpenWalletModal();
  return address ? (
    <>
      <p>Connected as {address}</p>
      <button onClick={() => setOpenWalletModal(true, {
        defaultNavigation: {
          location: 'collection-details',
          params: {
            contractAddress: '0xdbac91902dce61d231154bbcbb16227dca31141c',
            chainId: arbitrumSepolia.id
          }
        }
        })}>
        Open Wallet Inventory
      </button>
    </>
  ) : (
    <>
      <p>Not connected</p>
      <button onClick={() => setOpenConnectModal(true)}>Connect</button>
    </>
  );
};
