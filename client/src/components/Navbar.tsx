import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";

type NavBarRoutes = {
    path: string;
    name: string;
}

const navBarRoutes: NavBarRoutes[] = [
  {
    path: '/',
    name: 'Home'
  },
  {
    path: '/about',
    name: 'About'
  },
  {
    path: '/contact',
    name: 'Contact'
  },
  {
    path: '/blog',
    name: 'Blog'
  }
];

const Navbar = () =>  {
  const location = useLocation(); // Invoke the useLocation hook
  const active = 'text-xl font-bold  text-custom-color3 leading-6 border-b-2 border-custom-color2'
  const inActive = 'leading-6 text-custom-color2 transition-all duration-200 hover:text-custom-color3 hover:border-b-2 hover:border-custom-color3 text-xl'
  
  let [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <nav className="m-auto flex items-center justify-between p-4 md:p-6 lg:px-8">
        
        {/* <div className="flex md:hidden">
          <button className="-m-2 5 inline-flex items-center justify-center rounded-md p-2.5
                 text-gray-900 hover:text-custom-color3 transition duration-100 md:ml-8 text-xl md:my-0 my-7"><CiMenuBurger /></button>
        </div> */}

        <div onClick={() => setOpen(!open)} className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
        <CiMenuBurger name={open ? 'close' : 'menu'} />
        </div>

        <div className="hidden md:flex md:space-x-8">
          <ul className="flex space-x-8 gap-8">
            {
              navBarRoutes.map((item, index) => (
                <NavLink key={index} to={item.path}>
                  <li className={location.pathname === item.path ? active : inActive}>{item.name}</li>
                </NavLink>
              ))
            }
          </ul>
        </div>
      </nav>
    </React.Fragment>
    )
}

export default Navbar;