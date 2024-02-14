import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Menus = [{ title: "Dashboard" }, { title: "Blog" }, { title: "Authors" }];

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="mt-12">
      <div
        className={`bg-custom-color3 p-5 pt-8 ${
          open ? "w-72" : "w-20"
        } duration-300 relative`}
      >
        <BsArrowLeftShort
          className={`bg-white text-custom-color3 text-3xl rounded-full
                absolute -right-3 top-9 border border-custom-color3 cursor-pointer ${
                  !open && "rotate-180"
                }`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <FaRegUserCircle
            className={`text-white text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-2xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            My Account
          </h1>
        </div>

        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <>
              <li
                key={index}
                className="text-white text-lg flex items-center gap-x-4
                    cursor-pointer p-2 hover:bg-custom-color2 rounded-md mt-2 hover:text-custom-color3"
              >
                <span className="text-2xl block float-left">
                  <MdDashboard />
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
              </li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
