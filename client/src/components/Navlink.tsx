import { IoHome } from "react-icons/io5";
import { GrBlog } from "react-icons/gr";
import { FaRegQuestionCircle } from "react-icons/fa";
import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";

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
    icon: <FaRegQuestionCircle />,
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

const NavLinks = () => {
  const location = useLocation();
  const active =
    "md:my-0 my-7 text-xl font-bold text-custom-color3";
  const inActive =
    "md:my-0 my-7 text-xl text-custom-color3 hover:border-b hover:border-custom-color3";
  return (
    <>
      {navBarRoutes.map((item, index) => (
        <NavLink key={index} to={item.path}>
          <li className={location.pathname === item.path ? active : inActive}>
            <div className="flex items-center gap-1">
              {item.icon}
              {item.name}
            </div>
          </li>
        </NavLink>
      ))}
    </>
  );
};

export default NavLinks;
