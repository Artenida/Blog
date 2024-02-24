import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/user/userSlice";
import { useState, useEffect, useRef } from "react";
import { SmallButton } from "./ButtonComponent";
import image from "../assets/userProfile.jpg";
import { MdDashboard } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";

const Account = () => {
  const { currentUser } = useAppSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <>
      {currentUser ? (
        <div className="relative">
          <div className="shadow-md px-1 sm:w-full md:w-[240px] rounded-full">
            <div
              className="flex items-center gap-3"
              onClick={toggleDropdown}
              ref={dropdownRef}
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
              <div>
                <div className="text-custom-color3 font-semibold text-xl cursor-pointer">
                  {currentUser?.user?.username}
                </div>
                <div className="text-custom-color3 text-sm cursor-pointer">
                  {currentUser?.user?.bio}
                </div>
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
        <div className="pr-14">
          <Link to="/signIn">
            <SmallButton>Login</SmallButton>
          </Link>
        </div>
      )}
    </>
  );
};

export default Account;
