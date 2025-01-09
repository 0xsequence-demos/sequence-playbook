import { Fragment } from "react/jsx-runtime";
import { BackgroundImage } from "~/components/image/Image";
import { InheritLinkFromChild } from "~/components/inherit-link-from-child/InheritLinkFromChild";

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
  // name: string;
  links: ResourceItemLinkProps[];
};

export type ResourcesProps = {
  title?: string;
  items?: ResourceItemProps[];
};

export function Resources(props: ResourcesProps) {
  const { title, items } = {
    title:
      "Clone a boilerplate starter kit or explore our guides to learn more",
    ...props,
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-medium text-15">{title}</h3>

      {items ? (
        <ul className="grid sm:grid-cols-3 gap-4">
          {items?.map((item, index) => (
            <Fragment key={index}>
              <BackgroundImage name={item.image.src} />
              <InheritLinkFromChild asChild>
                <li
                  className="aspect-video rounded-[0.75rem] relative flex flex-col justify-end overflow-clip bg-cover bg-center bg-no-repeat hover:-translate-y-1 hover:scale-[1.01] transition-transform duration-300 group"
                  data-background={item.image.src}
                >
                  <div className="absolute size-full inset-0 border group-hover:border-white/30 border-white/10 transition-all duration-300 rounded-[0.75rem] pointer-events-none"></div>
                  <div className="flex flex-col px-4 p-4 bg-gradient-to-b from-0% to-40% from-deep-purple-600/0 to-deep-purple-600/95">
                    <span className="text-[9px] uppercase font-bold">
                      {item.type}
                    </span>
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
          ))}
        </ul>
      ) : null}
    </div>
  );
}
