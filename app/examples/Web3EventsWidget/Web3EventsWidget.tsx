/* starthide */
import { useAccount } from "wagmi";
import { useState } from "react";
import { decodeEventLog, formatUnits } from "viem";
import {
  SequenceIndexer,
  SubscribeEventsArgs,
  SubscribeEventsReturn,
  WebrpcError,
} from "@0xsequence/indexer";

type DecodedEvent = {
  eventData: {
    args: {
      from: string;
      to: string;
      value: bigint;
    };
    eventName: "Transfer";
    txHash: string;
  };
};
/* endhide */
export const Web3EventsWidget = () => {
  /* starthide */
  const { address } = useAccount();
  const [events, setEvents] = useState<DecodedEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const indexer = new SequenceIndexer(
    "https://arbitrum-indexer.sequence.app",
    "c3bgcU3LkFR9Bp9jFssLenPAAAAAAAAAA",
  );

  const req: SubscribeEventsArgs = {
    filter: {
      events: ["Transfer(address,address,uint256)"],
      contractAddresses: ["0xaf88d065e77c8cC2239327C5EDb3A432268e5831"],
    },
  };
  /* endhide */

  const subscribe = async () => {
    try {
      setIsLoading(true);
      await indexer.subscribeEvents(req, {
        onMessage: (msg: SubscribeEventsReturn) => {
          const decoded = decodeEventLog({
            abi: [
              {
                type: "event",
                name: "Transfer",
                inputs: [
                  { indexed: true, name: "from", type: "address" },
                  { indexed: true, name: "to", type: "address" },
                  { indexed: false, name: "value", type: "uint256" },
                ],
              },
            ],
            data: msg.log.rawLog?.data,
            topics: msg.log.rawLog?.topics,
          });

          setEvents((prev) => [
            ...prev,
            {
              eventData: { ...decoded, txHash: msg.log.txnHash },
            },
          ]);
        },
        onError: (err: WebrpcError) => {
          console.error("err", err);
        },
      });
    } catch (error) {
      console.error("Failed to subscribe:", error);
    } finally {
      setIsLoading(false);
    }
  };
  /* starthide */

  return address ? (
    <div className="m-4 space-y-4">
      <div className="flex items-center flex-col gap-4">
        {/* endhide */}
        <span>Listen to USDC transfers on Arbitrum</span>
        <button
          onClick={subscribe}
          disabled={isLoading}
          className="disabled:bg-gray-500/50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="size-4 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
              Listening...
            </span>
          ) : (
            "Start Listening"
          )}
        </button>
        {/* starthide */}
      </div>

      <div className="max-h-[400px] overflow-y-auto space-y-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {events.map((event) => (
          <div
            key={event.eventData.txHash}
            className="m-2 p-4 bg-white/10 rounded-lg"
          >
            <div className="grid gap-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-12 text-gray-400">From</span>
                <span className="font-mono text-12">
                  {event.eventData.args.from}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-12 text-gray-400">To</span>
                <span className="font-mono text-12">
                  {event.eventData.args.from}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-12 text-gray-400">Amount</span>
                <span
                  className={`font-mono text-12 font-medium ${
                    event.eventData.args.from.toLowerCase() ===
                    address.toLowerCase()
                      ? "text-red-400"
                      : "text-green-400"
                  }`}
                >
                  {formatUnits(event.eventData.args.value, 6)} USDC
                </span>
              </div>
            </div>
            <a
              href={`https://arbiscan.io/tx/${event.eventData.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-12 underline self-start"
            >
              View on Arbiscan
            </a>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p className="text-12 text-gray-400">
      Connect wallet to view USDC transfers
    </p>
  );
};
/* endhide */
