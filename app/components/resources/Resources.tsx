import { Fragment } from "react/jsx-runtime";
import { BackgroundImage, Image } from "~/components/image/Image";
import { InheritLinkFromChild } from "~/components/inherit-link-from-child/InheritLinkFromChild";
import { includeResources, ResourceName } from "~/content/resources";
import { arrayify } from "~/utils/arrayify";

export type ResourceItemLinkProps = {
  label: string;
  href: string;
  icon?: "github";
};

export type ResourceItemProps = {
  image: {
    src: string;
    alt?: string;
  };
  type: "guide" | "boilerplate";
  title: string;
  icons?: {
    topLeft?: string | string[];
    topRight?: string | string[];
  };
  // name: string;
  links: ResourceItemLinkProps[];
};

export type ResourcesProps = {
  title?: string;
  items?: ResourceName[] | ResourceName;
};

export function Resources(props: ResourcesProps) {
  const { title, items } = {
    title:
      "Clone a boilerplate starter kit or explore our guides to learn more",
    ...props,
  };

  const resources = includeResources(items);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-medium text-15">{title}</h3>
      {items ? (
        <ul className="grid sm:grid-cols-3 gap-4">
          {resources.map((item, index) => (
            <Resource item={item} key={index} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Resource(props: { item: ResourceItemProps }) {
  const { item } = props;
  const iconsTopLeft = arrayify(item.icons?.topLeft || "");
  const iconsTopRight = arrayify(item.icons?.topRight || "");
  return (
    <Fragment>
      <BackgroundImage name={item.image.src} />
      <InheritLinkFromChild asChild>
        <li
          className="aspect-video rounded-[0.75rem] relative flex flex-col justify-end overflow-clip bg-cover bg-center bg-no-repeat hover:-translate-y-1 hover:scale-[1.01] transition-transform duration-300 group "
          data-background={item.image.src}
        >
          <div className="flex justify-between p-4 mt-0 mb-auto">
            <div className="flex">
              {iconsTopLeft.map((iconName) => (
                <Image height={28} name={iconName} key={iconName} />
              ))}
            </div>
            <div className="flex gap-1.5 items-center">
              {iconsTopRight.map((iconName) => (
                <Image height={24} name={iconName} key={iconName} />
              ))}
            </div>
          </div>
          <div className="absolute size-full inset-0 border group-hover:border-white/30 border-white/10 transition-all duration-300 rounded-[0.75rem] pointer-events-none"></div>
          <div className="flex flex-col px-4 p-4 bg-gradient-to-b from-0% to-40% from-deep-purple-600/0 to-deep-purple-600/95">
            <span className="text-[9px] uppercase font-bold">{item.type}</span>
            <span className="text-14">{item.title}</span>

            <span className="flex gap-1 mt-3">
              {item.links?.map((link) => (
                <a
                  href={link.href}
                  key={link.label}
                  target="_blank"
                  className="last:rounded-r-[0.375rem] first:rounded-l-[0.375rem] rounded-[0.25rem] border-white/35 border bg-gradient-to-b from-deep-purple-400/30 to-deep-purple-400/35 text-white text-12 px-2 py-0.5 font-medium"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </span>
          </div>
        </li>
      </InheritLinkFromChild>
    </Fragment>
  );
}
