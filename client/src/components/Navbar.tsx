import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineMenuFold } from "react-icons/ai";
import { Dialog } from "@headlessui/react";
import Logo from "./Logo";
import { SmallButton } from "./ButtonComponent";
import { IoHome } from "react-icons/io5";
import { GrBlog } from "react-icons/gr";
import { FaHistory } from "react-icons/fa";
import { ReactNode } from "react";
import { useAppSelector } from "../store/hooks";
import image from "../assets/userProfile.jpg";
import { MdDashboard } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { selectUser } from "../store/user/userSlice";

type NavBarRoutes = {
  path: string;
  name: string;
  icon: ReactNode;
};

const navBarRoutes: NavBarRoutes[] = [
  {
    path: "/",
    name: "Home",
    icon: <IoHome />,
  },
  {
    path: "/about",
    name: "About",
    icon: <FaHistory />,
  },
  // {
  //   path: "/contact",
  //   name: "Contact",
  // },
  {
    path: "/blog",
    name: "Blog",
    icon: <GrBlog />,
  },
];

const Navbar = () => {
  const location = useLocation();
  const active =
    "md:my-0 my-7 text-xl font-bold text-custom-color3 border-b border-custom-color3";
  const inActive =
    "md:my-0 my-7 leading-3 text-custom-color3 transition-all duration-200 hover:text-custom-color3 hover:border-b-2 hover:border-custom-color3 text-xl";
  const { currentUser } = useAppSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
            <ul className="flex space-x-8 gap-8 pr-14 ml-24">
              {navBarRoutes.map((item, index) => (
                <NavLink key={index} to={item.path}>
                  <li
                    className={
                      location.pathname === item.path ? active : inActive
                    }
                  >
                    <div className="flex justify-center align-center items-center gap-1">
                      {item.icon}
                      {item.name}
                    </div>
                  </li>
                </NavLink>
              ))}
            </ul>
          </div>

          {currentUser ? (
            <div className="relative">
              <div className="hidden md:flex border shadow-md px-1 sm:w-[240px] rounded-full">
                <div
                  className="flex items-center gap-3"
                  onClick={toggleDropdown}
                >
                  <div>
                    {currentUser?.user?.profile_picture !== null ? (
                      <img
                        className="rounded-full w-14 h-14"
                        src={currentUser?.user?.profile_picture}
                        alt="User"
                      />
                    ) : (
                      <img
                        className="rounded-full w-14 h-14 cursor-pointer"
                        src={image}
                        alt="User"
                      />
                    )}
                  </div>
                  <div className="text-custom-color3 font-semibold text-2xl cursor-pointer">
                    {currentUser?.user?.username}
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="absolute w-full mt-2 py-2 text-custom-color3 text-xl bg-custom-color1 rounded-lg divide-y divide-gray-100 shadow-lg">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-custom-color2 hover:text-gray-900"
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-1">
                      <MdDashboard />
                      Dashboard
                    </div>
                  </Link>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-custom-color2 hover:text-gray-900"
                    role="menuitem"
                    onClick={() => {
                      setIsOpen(false);
                      // Perform sign out action
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <FaSignOutAlt />
                      Sign Out
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signIn">
              <SmallButton>Login</SmallButton>
            </Link>
          )}
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
                          <div className="flex justify-center align-center items-center gap-1">
                            {item.icon}
                            {item.name}
                          </div>
                        </li>
                      </NavLink>
                    ))}
                  </ul>

                  <div className="pt-2">
              {currentUser ? (
                    <div className="relative">
                      <div className="flex border shadow-md px-1 sm:w-[240px] rounded-full">
                        <div
                          className="flex items-center gap-3"
                          onClick={toggleDropdown}
                        >
                          <div>
                            {currentUser?.user?.profile_picture !== null ? (
                              <img
                                className="rounded-full w-14 h-14"
                                src={currentUser?.user?.profile_picture}
                                alt="User"
                              />
                            ) : (
                              <img
                                className="rounded-full w-14 h-14 cursor-pointer"
                                src={image}
                                alt="User"
                              />
                            )}{" "}
                          </div>
                          <div className="text-custom-color3 font-semibold text-2xl cursor-pointer">
                            {currentUser?.user?.username}
                          </div>
                        </div>
                      </div>

                      {isOpen && (
                        <div className="absolute w-full mt-2 py-2 text-custom-color3 text-xl bg-custom-color1 rounded-lg divide-y divide-gray-100 shadow-lg">
                          <Link
                            to="/dashboard"
                            className="block px-4 py-2 text-gray-700 hover:bg-custom-color2 hover:text-gray-900"
                            role="menuitem"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="flex items-center gap-1">
                              <MdDashboard />
                              Dashboard
                            </div>
                          </Link>
                          <button
                            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-custom-color2 hover:text-gray-900"
                            role="menuitem"
                            onClick={() => {
                              setIsOpen(false);
                              // Perform sign out action
                            }}
                          >
                            <div className="flex items-center gap-1">
                              <FaSignOutAlt />
                              Sign Out
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link to="/signIn">
                      <SmallButton>Login</SmallButton>
                    </Link>
                  )}
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
