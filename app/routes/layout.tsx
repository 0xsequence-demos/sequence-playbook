import { Outlet, Link, NavLink } from "react-router";
import Topics from "~/content/topics";
import { Icon } from "../components/icon/Icon";
import Drawer from "~/components/drawer/Drawer";
import { Fragment } from "react";

export default function SiteLayout() {
  return (
    <>
      <header className="z-50 h-[8rem] flex items-center md:sticky top-0">
        <div className="max-w-screen-xl w-full mx-auto flex justify-between gap-x-4 min-h-[4rem]  items-center px-4 md:px-12">
          <div className="my-12">
            <Link to="/">
              <img
                src="/playbook-logo@2x.png"
                width="120"
                height="32"
                alt="Playbook"
              />
            </Link>
          </div>

          <Drawer
            trigger={
              <button
                type="button"
                className="block md:hidden border border-white/20 p-1 rounded-[8px] bg-white/10"
              >
                <Icon name="menu" className="size-5" alt="Menu" />
              </button>
            }
          >
            <ul className="flex flex-col gap-1">
              {Topics.map((topic, index) => (
                <Fragment key={topic.path}>
                  <li>
                    <Link
                      to={topic.path}
                      className="text-15 font-medium mb-2 flex items-center gap-3"
                    >
                      <img
                        src={`/${topic.icon}`}
                        alt=""
                        width="20"
                        height="20"
                      />
                      {topic.title}
                    </Link>
                  </li>
                  {topic.books.map((book) => (
                    <li key={book.path} className="text-14 w-full flex">
                      <NavLink
                        to={book.path}
                        className="hover:underline text-white/70 aria-[current='page']:bg-white/10 rounded-[5px] flex-1 px-3 py-1.5"
                      >
                        {book.shortname || book.title}
                      </NavLink>
                    </li>
                  ))}
                  {index < Topics.length - 1 ? (
                    <hr className="w-full border-white/10 my-3" />
                  ) : null}
                </Fragment>
              ))}
            </ul>
          </Drawer>
        </div>
      </header>
      <div className="w-full h-[50rem] absolute inset-0 isolate z-0"></div>

      <div className="flex flex-col md:grid md:grid-cols-[16rem_1fr] gap-24 flex-1 items-stretch px-4 md:px-12 isolate max-w-screen-xl w-full mx-auto relative">
        <nav
          aria-label="books"
          className="hidden md:flex flex-col gap-3 sticky top-[8rem] self-start overflow-auto max-h-[calc(100vh-8rem)]"
        >
          <ul className="flex flex-col gap-1">
            {Topics.map((topic, index) => (
              <Fragment key={topic.path}>
                <li>
                  <Link
                    to={topic.path}
                    className="text-15 font-medium mb-2 flex items-center gap-3"
                  >
                    <img src={`/${topic.icon}`} alt="" width="20" height="20" />
                    {topic.title}
                  </Link>
                </li>
                {topic.books.map((book) => (
                  <li key={book.path} className="text-14 w-full flex">
                    <NavLink
                      to={book.path}
                      className="hover:underline text-white/70 aria-[current='page']:bg-white/10 rounded-[5px] flex-1 px-3 py-1.5"
                    >
                      {book.shortname || book.title}
                    </NavLink>
                  </li>
                ))}
                {index < Topics.length - 1 ? (
                  <hr className="w-full border-white/10 my-3" />
                ) : null}
              </Fragment>
            ))}
          </ul>
        </nav>
        <Outlet />
      </div>

      {/* <footer className="border-t border-white/20">
        <h2 className="sr-only">Footer</h2>
      </footer> */}
    </>
  );
}
