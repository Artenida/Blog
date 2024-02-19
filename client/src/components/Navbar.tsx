import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineMenuFold } from "react-icons/ai";
import { Dialog } from "@headlessui/react";
import Logo from "./Logo";
import logo from "../assets/logo3.webp";
import { SmallButton } from "./ButtonComponent";

type NavBarRoutes = {
  path: string;
  name: string;
};

const navBarRoutes: NavBarRoutes[] = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/about",
    name: "About",
  },
  // {
  //   path: "/contact",
  //   name: "Contact",
  // },
  {
    path: "/blog",
    name: "Blog",
  },
];

const Navbar = () => {
  const location = useLocation();
  const active =
    "md:my-0 my-7 text-xl font-bold text-custom-color3 border-b border-custom-color3";
  const inActive =
    "md:my-0 my-7 leading-2 text-custom-color3 transition-all duration-200 hover:text-custom-color3 hover:border-b-2 hover:border-custom-color3 text-xl";

  const [mobile, setMobile] = useState(false);

  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    setPath(location.pathname);
    setMobile(false);
  }, [location]);

  return (
    <React.Fragment>
      <header className="mx-auto bg-custom-color1 max-w-7xl border-b sticky top-0 z-50">
        <nav className="flex justify-between items-center p-4 lg:mr-24 md:p-6 lg:px-8">
          <Logo />

          <div className="hidden md:flex md:space-x-8">
            <ul className="flex space-x-8 gap-8 pr-14">
              {navBarRoutes.map((item, index) => (
                <NavLink key={index} to={item.path}>
                  <li
                    className={
                      location.pathname === item.path ? active : inActive
                    }
                  >
                    {item.name}
                  </li>
                </NavLink>
              ))}
            </ul>
          </div>

          <Link to="/signIn">
          <SmallButton >Login</SmallButton>
          </Link>

          <div className="pr-12 md:hidden">
            <button
              className="-m-2 5 inline-flex items-center justify-center 
            rounded-md hover:bg-custom-color transition duration-100"
              onClick={() => setMobile(true)}
            >
              <AiOutlineMenuUnfold className="text-xl" />
            </button>
          </div>
        </nav>

        <Dialog
          as="div"
          className={"md:hidden"}
          open={mobile}
          onClose={setMobile}
        >
          <div className="fixed inset-0 z-50 bg-gray-50 bg-opacity-80">
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-text/10 w-full max-w-screen">
              <div className="flex items-center justify-between mb-3">
                <Logo />

                <button
                  className="-m-2 5 pr-12 inline-flex items-center justify-center rounded-md hover:bg-custom-color transition duration-100"
                  onClick={() => setMobile(false)}
                >
                  <AiOutlineMenuFold className="text-xl" />
                </button>
              </div>

              <div className="mt-6 flow-root">
                <div className="-my-2 divide-y divide-gray-500/50">
                  <ul className="space-y-10 text-center py-8">
                    {navBarRoutes.map((item, index) => (
                      <NavLink key={index} to={item.path}>
                        <li
                          className={
                            location.pathname === item.path ? active : inActive
                          }
                        >
                          {item.name}
                        </li>
                      </NavLink>
                    ))}
                  </ul>

                  <div className="py-6">
                    <Link to="/signIn">
                      <button className="block w-full text-center rounded bg-custom-color3 px-8 py-3 text-xl font-medium text-custom-color1 hover:bg-custom-color1 hover:text-custom-color3 hover:border-2 hover:border-custom-color3 active:bg-custom-color3 sm:w-auto">
                        {" "}
                        Login
                      </button>
                    </Link>
                  </div>
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
