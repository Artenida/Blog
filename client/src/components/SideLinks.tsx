import { Menus } from "../constants/constants";
import { NavLink, useNavigate } from "react-router-dom";
import { signOutSuccess } from "../store/user/userSlice";
import { deleteUser } from "../api/userThunk";
import { useAppDispatch } from "../store/hooks";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/user/userSlice";

export const SideLinks = () => {
  const dispatch = useAppDispatch(); // Dispatch function to dispatch actions
  const navigate = useNavigate();
  const { currentUser } = useAppSelector(selectUser);

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteUser(currentUser.user.id));
      console.log("User account deleted successfully");
      // await dispatch(signOutSuccess());
      // navigate('/')
      handleSignOut();
    } catch (error) {
      console.error("Error deleting user account: ", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await dispatch(signOutSuccess());
      navigate("/");
    } catch (error) {}
  };

  return (
    <div>
      {Menus.map((menu, index: number) => (
        <div key={index}>
          {menu.title === "Sign out" || menu.title === "Delete account" ? (
            <div
              onClick={
                menu.title === "Sign out" ? handleSignOut : handleDeleteAccount
              }
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
    </div>
  );
};
