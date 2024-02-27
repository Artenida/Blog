import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/user/userSlice";
import image from "../assets/userProfile.jpg";
import { Menus } from "../constants/constants"
import { NavLink, useNavigate } from "react-router-dom";
import { signOutSuccess } from "../store/user/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { deleteUser } from "../api/userThunk";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const { currentUser } = useAppSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  console.log(currentUser.user.id);

  const handleSignOut = async () => {
    try {
      await dispatch(signOutSuccess());
      navigate('/');
    } catch (error) {}
  }

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteUser(currentUser.user.id));
      console.log("User account deleted successfully");
      await dispatch(signOutSuccess());
      navigate('/')
    } catch (error) {
      console.error("Error deleting user account: ", error);
    }
  };
  
  return (
    <div className="sm:max-h-screen md:h-[900px] flex flex-col md:flex-row ">
      <div
        className={`opacity-90 p-5 pt-8 fixed ${
          open ? "md:w-72" : "w-20"
        } duration-300 relative`}
      >
        <BsArrowLeftShort
          className={`bg-white text-custom-color3 text-3xl rounded-full
                absolute -right-3 top-9 border border-custom-color3 cursor-pointer mr-3 ${
                  !open && "rotate-180"
                }`}
          onClick={() => setOpen(!open)}
        />

        <div className="inline-flex justify-center items-center gap-2">
          {currentUser?.user?.profile_picture !== null ? (
            <FaRegUserCircle
              className={`text-custom-color3 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
          ) : (
            <img
              className="rounded-full w-14 h-14 cursor-pointer ml-4"
              src={image}
              alt="User"
            />
          )}
          <h1
            className={`text-custom-color3 origin-left font-medium text-2xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            <div className="text-custom-color3 font-semibold text-2xl cursor-pointer">
              {currentUser?.user?.username}
            </div>
          </h1>
        </div>

        <ul className="pt-2">
      {Menus.map((menu, index: number) => (
        <div key={index}>
          {menu.title === "Sign out" || menu.title === "Delete account" ? (
            <div
              onClick={menu.title === "Sign out" ? handleSignOut : handleDeleteAccount}
              className="text-red-600 text-lg flex items-center gap-x-4
              cursor-pointer p-4 hover:bg-custom-color2 rounded-md mt-2"
            >
              <span className="text-2xl block float-left">{menu.icon}</span>
              <span
                className={`text-base font-medium flex-1 duration-200 ${
                  !open && "hidden"
                }`}
              >
                {menu.title}
              </span>
            </div>
          ) : (
            <NavLink
              to={menu.path}
              className="text-custom-color3 text-lg flex items-center gap-x-4
              cursor-pointer p-4 hover:bg-custom-color2 rounded-md mt-2"
            >
              <span className="text-2xl block float-left">{menu.icon}</span>
              <span
                className={`text-base font-medium flex-1 duration-200 ${
                  !open && "hidden"
                }`}
              >
                {menu.title}
              </span>
            </NavLink>
          )}
        </div>
      ))}
    </ul>
      </div>
    </div>
  );
};

export default Sidebar;
