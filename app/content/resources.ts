import { type ResourceItemProps } from "~/components/resources/Resources";

export const resources = [
  {
    name: "sequence-wallet-boilerplate",
    type: "boilerplate",
    title: "Sequence Wallet Boilerplate",
    image: {
      src: "example1",
      alt: "",
    },
    links: [
      {
        label: "Demo",
        href: "",
      },
      {
        label: "Source",
        icon: "github",
        href: "",
      },
    ],
  },

  {
    name: "sequence-wallet-boilerplate-2",
    type: "boilerplate",
    title: "Sequence Wallet Boilerplate",
    image: {
      src: "example1",
      alt: "",
    },
    links: [
      {
        label: "Demo",
        href: "",
      },
      {
        label: "Source",
        icon: "github",
        href: "",
      },
    ],
  },
  {
    name: "sequence-wallet-boilerplate-3",
    type: "boilerplate",
    title: "Sequence Wallet Boilerplate",
    image: {
      src: "example1",
      alt: "",
    },
    links: [
      {
        label: "Demo",
        href: "",
      },
      {
        label: "Source",
        icon: "github",
        href: "",
      },
    ],
  },
] as ResourceItemProps[];

export function includeResources(list: string | string[]) {
  if (typeof list === "string") {
    list = [list];
  }

  return resources.filter((resource) => list.includes(resource.name));
}
