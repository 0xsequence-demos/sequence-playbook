import { NavLink, Outlet } from "@remix-run/react";

export default function SiteLayout() {
  return (
    <div className="flex flex-col flex-1">
      <header className="bg-black  py-2 border-b border-white/20">
        <div className="max-w-screen-xl w-full mx-auto flex justify-between gap-x-4 min-h-[4rem] py-1 items-center px-8">
          <span>Sequence Playbook</span>

          <nav className="flex gap-1">
            {navLinks.map((link) => (
              <NavLink
                to={link.path}
                key={link.path}
                className="rounded-full px-4 py-1.5 hover:bg-white/10 border border-transparent hover:border-white/5"
              >
                {link.label}
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

const navLinks = [
  { label: "Onboard", path: "/onboard" },
  { label: "Monetize", path: "/monetize" },
  { label: "Power", path: "/power" },
];
