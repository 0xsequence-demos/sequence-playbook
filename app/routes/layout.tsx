import { NavLink, Outlet, Link } from "react-router";
import Topics from "~/content/topics";
import { Icon } from "../components/icon/Icon";
import Drawer from "~/components/drawer/Drawer";

export default function SiteLayout() {
  return (
    <div className="flex flex-col flex-1">
      <header className="bg-black py-2 shadow-[0_1px_0_0_theme(colors.white/20%)] z-50">
        <div className="max-w-screen-xl w-full mx-auto flex justify-between gap-x-4 min-h-[4rem] py-1 items-center px-4  sm:px-8">
          <Link to="/" className="flex gap-2 items-center font-bold">
            <Icon name="sequence-logo" className="size-8" />
            Sequence Playbook
          </Link>

          <Drawer
            trigger={
              <button
                type="button"
                className="block sm:hidden border border-white/20 p-1 rounded-[8px] bg-white/10"
              >
                <Icon name="menu" className="size-5" alt="Menu" />
              </button>
            }
          >
            {Topics.map((link) => (
              <NavLink
                to={link.path}
                key={link.path}
                className="p-4 rounded-[0.5rem] hover:bg-white/10 inline-flex gap-2 items-center aria-[current]:text-white font-semibold "
              >
                <Icon name={link.icon} className="size-[1.5rem]" />

                {link.title}
              </NavLink>
            ))}
          </Drawer>

          <nav className="hidden sm:flex gap-1">
            {Topics.map((link) => (
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
