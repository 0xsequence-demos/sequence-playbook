import { Outlet, Link, NavLink } from "react-router";
import Books from "~/content/books";
import { Icon } from "../components/icon/Icon";
import Drawer from "~/components/drawer/Drawer";
import { Fragment, useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useOpenConnectModal } from "@0xsequence/kit";
import { Button } from "~/components/button/Button";
import { useSticky } from "~/components/sticky/useSticky";
import { AccountPopup } from "boilerplate-design-system";
import { useOpenWalletModal } from "@0xsequence/kit-wallet";

function patchFocusToHandleRecursionError() {
  // handle focus recursion issue with opening wallet inventory

  const originalFocus = window.HTMLElement.prototype.focus;
  window.HTMLElement.prototype.focus = function (...args) {
    if (this.__focusCalled) return; // Prevent infinite recursion
    this.__focusCalled = true;
    try {
      originalFocus.apply(this, args);
    } finally {
      delete this.__focusCalled; // Cleanup
    }
  };
}

function Wallet() {
  const { chain, address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { setOpenConnectModal } = useOpenConnectModal();

  const { setOpenWalletModal } = useOpenWalletModal();

  return (
    <>
      {address ? (
        <>
          <AccountPopup
            address={address}
            chain={chain}
            disconnect={disconnectAsync}
            walletCallback={() => {
              patchFocusToHandleRecursionError();
              setOpenWalletModal(true);
            }}
          />
        </>
      ) : (
        <Button onClick={() => setOpenConnectModal(true)}>Connect</Button>
      )}
    </>
  );
}

export default function SiteLayout() {
  const [ref, isStuck] = useSticky();
  return (
    <div className="flex flex-col flex-1 pb-12">
      <div
        data-component="sticky-reference"
        ref={ref}
        className="top-[3rem] absolute"
      ></div>

      <header className="z-10 w-full flex items-center isolate  md:py-0 md:sticky top-0">
        {/* <div
          data-stuck={isStuck}
          className={`hidden md:block absolute w-full top-[-3rem]
            transition-opacity duration-200 ease-in-out opacity-0 backdrop-blur-xl data-[stuck='true']:md:opacity-100
             bg-black
          `}
        ></div> */}
        {/* <div
          data-stuck={isStuck}
          className={`hidden md:block absolute h-[3rem] w-full top-0
            transition-opacity duration-200 ease-in-out opacity-0 bg-gradient-to-b from-deep-purple-950/5 to-deep-purple-950/10 border-b border-deep-purple-200/10 data-[stuck='true']:md:opacity-100 bg-black
            `}
        ></div> */}

        {/* data-[stuck='true']:md:translate-y-[-1.5rem] */}
        <div className="w-full py-4 bg-black border-b border-white/10">
          <div className="max-w-[108rem] w-full mx-auto flex justify-between gap-x-4 items-center px-4 md:px-12">
            <Link to="/" className="flex gap-1 items-center justify-center">
              <Icon
                name="sequence-blueprints"
                alt="Sequence Blueprints"
                width={228}
              />
            </Link>

            <Drawer
              trigger={({ handleOpen }) => (
                <button
                  type="button"
                  className="block md:hidden p-2 rounded-full bg-white/20"
                  onClick={handleOpen}
                >
                  <Icon name="menu" className="size-5" alt="Menu" />
                </button>
              )}
            >
              <ul className="flex flex-col gap-1">
                {Books.map((topic, index) => (
                  <Fragment key={topic.path}>
                    <li>
                      <Link
                        to={topic.path}
                        className="text-15 font-medium mb-2 flex items-center gap-3"
                      >
                        <Icon name={topic.icon} className="size-5" />
                        {topic.title}
                      </Link>
                    </li>
                    {topic.books.map((book) => (
                      <li key={book.info.path} className="text-14 w-full flex">
                        <NavLink
                          to={book.info.path}
                          className="hover:underline text-white/70 aria-[current='page']:text-white aria-[current='page']:bg-white/10 rounded-[5px] flex-1 px-3 py-1.5"
                        >
                          {book.info.shortname || book.info.title}
                        </NavLink>
                      </li>
                    ))}
                    {index < Books.length - 1 ? (
                      <hr className="w-full border-white/10 my-3" />
                    ) : null}
                  </Fragment>
                ))}
              </ul>
            </Drawer>

            <div className={`hidden md:flex items-center gap-4 `}>
              <Wallet />
            </div>
          </div>
        </div>
      </header>
      <div className="bg-black/50 w-full flex border-b border-white/10 md:hidden justify-between gap-2 py-4 mb-8 items-center px-4 relative isolate z-[10]">
        <Wallet />
      </div>
      <div className="max-w-[108rem] w-full mx-auto relative flex-1 flex flex-col">
        <div className="w-full h-full max-h-[50rem] absolute inset-0 isolate z-0 pointer-events-none"></div>
        <div className=" flex flex-col md:grid md:grid-cols-[minmax(8rem,16rem)_minmax(32rem,1fr)] gap-16 flex-1 items-stretch px-4 md:px-12 isolate w-full mx-auto ">
          <nav
            aria-label="books"
            className="hidden md:flex flex-col gap-3 sticky top-[8rem] self-start overflow-auto max-h-[calc(100vh-8rem)]"
          >
            <ul className="flex flex-col gap-1">
              {Books.map((topic, index) => (
                <Fragment key={topic.path}>
                  <li>
                    <Link
                      to={topic.path}
                      className="text-15 font-medium mb-2 flex items-center gap-3"
                    >
                      <Icon name={topic.icon} className="size-5" />
                      {topic.title}
                    </Link>
                  </li>
                  {topic.books.map((book) => (
                    <li
                      key={book.info.path}
                      className="text-14 w-full flex pl-5"
                    >
                      <NavLink
                        to={book.info.path}
                        className="hover:bg-white/[1%] hover:text-white  focus:bg-white/[1%] focus:text-white  text-white/70 aria-[current='page']:text-white aria-[current='page']:bg-white/20  rounded-[5px] flex-1 px-3 py-1.5"
                      >
                        {book.info.shortname || book.info.title}
                      </NavLink>
                    </li>
                  ))}
                  {index < Books.length - 1 ? (
                    <hr className="w-full border-white/10 my-3" />
                  ) : null}
                </Fragment>
              ))}
            </ul>
          </nav>
          <div className="md:pt-[4rem]">
            <Outlet />
          </div>
        </div>
      </div>

      {/* <footer className="border-t border-white/20">
        <h2 className="sr-only">Footer</h2>
        </footer> */}
    </div>
  );
}
