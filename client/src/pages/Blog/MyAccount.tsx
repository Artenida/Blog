import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/userSlice";
import profile from "../../assets/posts/profile.webp";
import { UpdateUserForm } from "../../components/UpdateUserForm";

const MyAccount = () => {
  const { currentUser } = useSelector(selectUser);
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="border-r-4 border-opacity-50 my-12 ml-4 border-custom-color2"></div>
      <div className="mx-auto flex flex-col gap-4 p-12 w-full">
        <h2 className="text-custom-color3 text-lg font-semibold pl-2">
          My profile
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-2 rounded-xl border-custom-color2">
          <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full border-4">
            <img
              src={profile}
              alt="Profile"
              className="rounded-full w-32 h-32"
            />
          </div>

          <div className="p-4">
            <h2 className="text-xl text-custom-color3 font-bold ml-2">
              {currentUser?.user?.username}
            </h2>
            <div className="pt-2">
              <span className="ml-2 text-lg text-custom-color3">
                {currentUser?.user?.email}
              </span>
            </div>
            <div className="">
              <span className="ml-2 text-custom-color3">
                {currentUser?.user?.bio}
              </span>
            </div>
          </div>
        </div>

        <UpdateUserForm />
      </div>
    </div>
  );
};

export default MyAccount;
