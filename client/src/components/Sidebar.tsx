import { FaRegUserCircle } from "react-icons/fa";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/user/userSlice";
import { SideLinks } from "./SideLinks";

const Sidebar = () => {
  const { currentUser, user } = useAppSelector(selectUser);
  const imagePath =
    user && user.length > 0 && user[0]?.profile_picture
      ? user[0].profile_picture.replace(/\\/g, "/")
      : "";

  return (
    <div className="sm:max-h-screen md:h-[900px] flex flex-col md:flex-row ">
      <div className={`opacity-90 p-5 pt-8 duration-300 relative`}>
        <div className="inline-flex justify-center items-center gap-2">
          {user && user.length > 0 && user[0]?.profile_picture === null ? (
            <FaRegUserCircle
              className={
                "text-custom-color3 text-4xl rounded cursor-pointer block float-left mr-2 duration-500"
              }
            />
          ) : (
            <img
              className="rounded-full w-14 h-14 cursor-pointer ml-4"
              src={`http://localhost:5000/${imagePath}`}
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
          <SideLinks />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
