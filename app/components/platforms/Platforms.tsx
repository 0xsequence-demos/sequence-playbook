import { Icon } from "~/components/icon/Icon";

const availablePlatforms = [
  {
    icon: "React",
    label: "React",
    key: "web",
  },
  {
    icon: "React",
    label: "React Native",
    key: "react-native",
  },
  {
    icon: "Unreal",
    label: "Unreal",
    key: "unreal",
  },
  {
    icon: "Unity",
    label: "Unity",
    key: "unity",
  },
  {
    icon: "Telegram",
    label: "Telegram",
    key: "telegram",
  },
] as const;

// Extract the union type of keys
type PlatformKey = (typeof availablePlatforms)[number]["key"];

// Define the type of the object
export type Platform = {
  [key in PlatformKey]: string | null;
};

export function Platforms({ platforms }: { platforms: Platform }) {
  if (!platforms) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 border-b border-white/10 pb-8">
      <h2 className="font-medium text-14">Available Platforms</h2>
      <div className="flex items-center gap-x-6 gap-y-4 flex-wrap">
        {availablePlatforms.map((platform) =>
          platform.key in platforms ? (
            platforms?.[platform.key] ? (
              <a
                href={platforms?.[platform.key] || ""}
                key={platform.key}
                className="flex items-center gap-2 text-14 group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="size-7 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-white/25">
                  <Icon name={platform.icon} alt="" className="size-6" />
                </span>
                <span>{platform.label}</span>
              </a>
            ) : (
              <span
                key={platform.key}
                className="flex items-center gap-2 text-14"
              >
                <span className="size-7 flex items-center justify-center rounded-full bg-white/10">
                  <Icon name={platform.icon} alt="" className="size-6" />
                </span>
                {platform.label}
              </span>
            )
          ) : null,
        )}
      </div>
    </div>
  );
}
