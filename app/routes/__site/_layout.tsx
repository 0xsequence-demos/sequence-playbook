import { NavLink, Outlet, Link } from "@remix-run/react";
import { TOPICS } from "~/data/data";
import { Icon } from "../../components/icon/Icon";

export default function SiteLayout() {
  return (
    <div className="flex flex-col flex-1">
      <header className="bg-black  py-2 border-b border-white/20">
        <div className="max-w-screen-xl w-full mx-auto flex justify-between gap-x-4 min-h-[4rem] py-1 items-center px-8">
          <Link to="/">Sequence Playbook</Link>

          <nav className="flex gap-1">
            {TOPICS.map((link) => (
              <NavLink
                to={link.path}
                key={link.path}
                className="rounded-full px-4 py-1.5 hover:bg-white/10 border border-transparent hover:border-white/5 inline-flex gap-2 items-center aria-[current]:text-white font-semibold text-neutral-400"
              >
                <Icon name={link.icon} className="size-[1.25rem]" />

                {link.title}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <Outlet />
      <footer className="border-t border-white/20">
        <h2 className="sr-only">Footer</h2>
      </footer>
    </div>
  );
}
