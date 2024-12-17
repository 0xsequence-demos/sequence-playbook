import { useOpenConnectModal } from "@0xsequence/kit";
export function RequireWalletButton(props: { title?: string; label?: string }) {
  const { title, label } = props;

  const { setOpenConnectModal } = useOpenConnectModal();
  return (
    <div className="flex flex-col gap-1 items-center">
      {title ? <p>{title}</p> : null}

      <button onClick={() => setOpenConnectModal(true)}>
        {label || "Connect"}
      </button>
    </div>
  );
}
