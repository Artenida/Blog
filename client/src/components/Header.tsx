import React, { useState, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Dialog } from "@headlessui/react";
import Logo from "./Logo";
import NavLinks from "./Navlink";
import Account from "./Account";

const Navbar = () => {
  const [mobile, setMobile] = useState(false);
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    setPath(location.pathname);
    setMobile(false);
  }, [location]);

  return (
    <React.Fragment>
      <header className="mx-auto bg-custom-color1 max-w-7xl sticky top-0 z-50">
        <nav className="flex justify-between items-center p-3 ">
          <Logo />
          <div className="hidden md:flex ">
            <ul className="flex space-x-8 gap-8 pr-14">
              <NavLinks />
            </ul>
          </div>

          <div className="hidden md:flex">
            <Account />
          </div>

          <div className="mr-4 md:hidden flex justify-center">
            <button onClick={() => setMobile(true)}>
              <IoMdMenu className="text-2xl" />
            </button>
          </div>
        </nav>

        <Dialog
          as="div"
          className={"md:hidden"}
          open={mobile}
          onClose={setMobile}
        >
          <div>
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 overflow-y-auto bg-white px-3 py-3 sm:max-w-sm sm:ring-1 sm:ring-text/10 w-full max-w-screen">
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  className=" mr-4 inline-flex items-center justify-center rounded-md hover:bg-custom-color transition duration-100"
                  onClick={() => setMobile(false)}
                >
                  <IoClose className="text-2xl" />
                </button>
              </div>

                <div className="-my-2 divide-y divide-gray-500/50">
                  <ul className="py-8 ml-4">
                    <NavLinks />
                  </ul>
                  <div className="pt-2">
                    <Account />
                  </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </header>
    </React.Fragment>
  );
};

export default Navbar;
