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

export const Web3EventsWidget = () => {
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

  return address ? (
    <div className="m-4 space-y-4">
      <div className="flex items-center justify-between gap-4 border rounded-lg bg-white/5 border-white/10 p-2">
        <span className="text-sm">Listen to USDC transfers on Arbitrum</span>
        <button
          onClick={subscribe}
          disabled={isLoading}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            isLoading
              ? "bg-gray-500/50 cursor-not-allowed"
              : "bg-green-500/10 text-green-400 hover:bg-green-500/20"
          }`}
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
      </div>

      <div className="max-h-[400px] overflow-y-auto space-y-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {events.map((event) => (
          <div
            key={event.eventData.txHash}
            className={`m-2 p-4 border rounded-lg transition-colors ${
              event.eventData.args.from.toLowerCase() === address.toLowerCase()
                ? "bg-red-500/5 border-red-500/10 hover:border-red-500/20"
                : "bg-green-500/5 border-green-500/10 hover:border-green-500/20"
            }`}
          >
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">From</span>
                <span className="font-mono text-sm">
                  {event.eventData.args.from}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">To</span>
                <span className="font-mono text-sm">
                  {event.eventData.args.from}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Amount</span>
                <span
                  className={`font-mono text-sm font-medium ${
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
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors truncate"
            >
              View on Arbiscan →
            </a>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p className="text-sm text-gray-400">
      Connect wallet to view USDC transfers
    </p>
  );
};
