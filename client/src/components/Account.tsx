import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { signOutSuccess, selectUser } from "../store/user/userSlice";
import { useState, useEffect, useRef } from "react";
import { SmallButton } from "./ButtonComponent";
import image from "../assets/userProfile.jpg";
import { MdDashboard } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import profile from "../assets/userProfile.jpg";

const Account = () => {
  const { currentUser, user } = useAppSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const imagePath = user.length > 0 && user[0]?.profile_picture ? user[0].profile_picture.replace(/\\/g, "/") : '';

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

  const handleSignOut = () => {
    dispatch(signOutSuccess());
    setIsOpen(false);
    navigate("/");
  };
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
                {user[0].profile_picture !== null ? (
                  <img
                    className="rounded-full w-14 h-14"
                    src={
                      user[0]?.profile_picture
                        ? `http://localhost:5000/${imagePath}`
                        : profile
                    }
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
              >
                <div
                  className="flex items-center gap-1"
                  onClick={() => {
                    handleSignOut();
                  }}
                >
                  <FaSignOutAlt />
                  Sign Out
                </div>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <Link to="/signIn">
            <SmallButton>Login</SmallButton>
          </Link>
        </div>
      )}
    </>
  );
};

export default Account;
