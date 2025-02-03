import { Icon } from "~/components/icon/Icon";
import { useDialogContext } from "../helpers/useDialogContext";

export const OptionalDialogTitle = ({
  className = "",
}: {
  className?: string;
}) => {
  const { id, title, handleWillClose } = useDialogContext();

  if (!title) {
    return null;
  }

  return (
    <div
      className={`w-full px-6 py-3 border-b flex justify-between items-center sticky top-0 rounded-t-lg ${className}`}
    >
      <h2 id={id} className="text-15 font-semibold">
        {title}
      </h2>
      <button type="button" onClick={handleWillClose}>
        <span className="sr-only">Close</span>
        {/* <X size="16" role="none" /> */}
        <Icon name="x" className="size-4" alt="Close" />
      </button>
    </div>
  );
};
