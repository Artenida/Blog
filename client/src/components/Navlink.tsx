import { NavLink } from "react-router-dom";
import { navBarRoutes, NavBarRoutes } from "../constants/constants";

interface NavLinksProps {
  closeMobileMenu: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ closeMobileMenu }) => {
  const active = "md:my-0 my-7 text-xl font-bold text-custom-color3";
  const inActive =
    "md:my-0 my-7 text-xl text-custom-color3 hover:border-b hover:border-custom-color3";

  return (
    <>
      {navBarRoutes.map((item: NavBarRoutes, index: number) => (
        <NavLink key={index} to={item.path} onClick={closeMobileMenu}>
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
