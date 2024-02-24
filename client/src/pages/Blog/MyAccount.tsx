import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/userSlice";
import profile from "../../assets/posts/profile.webp";
import FormInputs from "../../components/FormInputs";
import { MediumButton } from "../../components/ButtonComponent";
import { FaEdit } from "react-icons/fa";

const MyAccount = () => {
  const { currentUser } = useSelector(selectUser);
  console.log(currentUser.user.bio);
  return (
    <div className="flex flex-col md:flex-row bg-custom-color2 ">
      <div className="opacity-30 inset-0 md:h-screen"></div>
      <Sidebar />

      <div className="border-r border-opacity-50 my-12 ml-4 border-gray-300"></div>

      <div className="mx-auto pb-12 pt-12 md:w-[700px]  flex justify-center items-center">
        <div className="flex flex-col gap-3 w-full">
          <div className="flex gap-4 border-2 p-2 shadow-md">
            <div
              className="w-32 h-32 self-center cursor-pointer shadow-md 
                      overflow-hidden rounded-full border-4"
            >
              {/* <img src={currentUser.user.profile_picture} alt="" /> */}
              <img src={profile} alt="" className="rounded-full w-32 h-32" />
            </div>
            <div className="p-4">
              <h2 className="text-2xl text-custom-color3 font-bold ml-2">
                {currentUser.user.username}
              </h2>
              <div className="">
                {/* <span className="text-gray-600">Email:</span> */}
                <span className="ml-2 text-custom-color3">
                  {currentUser?.user?.email}
                </span>
              </div>
              <div className="">
                {/* <span className="text-gray-600">Bio:</span> */}
                <span className="ml-2 text-custom-color3">
                  {currentUser?.user?.bio}
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <FormInputs
              id="username"
              label="Username"
              placeholder="Username"
              defaultValue={currentUser?.user?.username}
            />
            <div className="absolute flex gap-1 items-center text-gray-400 right-3 top-12">
              <FaEdit />
              <span>Edit</span>
            </div>
          </div>

          <div className="relative">
            <FormInputs
              id="email"
              label="Email"
              placeholder="Email"
              defaultValue={currentUser?.user?.email}
            />
            <div className="absolute flex gap-1 items-center text-gray-400 right-3 top-12">
              <FaEdit />
              <span>Edit</span>
            </div>
          </div>

          {/* <div className="relative">
            <FormInputs
              id="password"
              label="Password"
              placeholder="Password"
              defaultValue={undefined}
            />
            <div className="absolute flex gap-1 items-center text-gray-400 right-3 top-12">
              <FaEdit />
              <span>Edit</span>
            </div>
            </div> */}

          <div className="relative mb-3">
            <FormInputs
              id="bio"
              label="Bio"
              placeholder="Bio"
              defaultValue={currentUser?.user?.bio}
            />
            <div className="absolute flex gap-1 items-center text-gray-400 right-3 top-12">
              <FaEdit />
              <span>Edit</span>
            </div>
          </div>

          <MediumButton>Update</MediumButton>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
