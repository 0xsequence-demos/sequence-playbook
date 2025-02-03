import { useDialogEnterExit } from "../helpers/useDialogEnterExit";

export function Backdrop() {
  const visible = useDialogEnterExit();
  return (
    <div
      className={`Backdrop w-full h-full fixed bg-black/80 ${
        visible ? "open" : ""
      }`}
    ></div>
  );
}
