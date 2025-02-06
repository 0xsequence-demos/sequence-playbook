import { Button } from "boilerplate-design-system";

export function CollectableSkeleton() {
  return (
    <div className="bg-grey-900 p-4 text-left rounded-[1rem] flex flex-col gap-3 opacity-50">
      <div className="w-full aspect-square rounded-[0.5rem] bg-grey-800 "></div>
      <span className="text-10 font-bold">Token id: --</span>
      <span className="text-20 font-bold leading-tight">--</span>

      <div className="mt-auto mb-0 flex flex-col gap-4">
        <div>
          <span className="text-12 font-medium">-- Minted</span>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-12 font-medium text-grey-50 ">Price</span>
            <span className="text-14 font-bold inline-flex items-center gap-1">
              <span className="size-4 bg-grey-800"></span>
              0.00
            </span>
          </div>
          <div className="flex flex-col items-end text-end">
            <span className="text-grey-50 font-medium text-12">Owned</span>
            <span className="text-white font-bold text-14">--</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            variant="primary"
            className="rounded-[0.5rem] w-full font-bold text-14"
          >
            Loading
          </Button>
        </div>
      </div>
    </div>
  );
}
