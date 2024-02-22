import Sidebar from "../../components/Sidebar";
import background from "../../assets/about1.avif";
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
    <div
      className="flex flex-col md:flex-row"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white opacity-30 inset-0"></div>
      <Sidebar />

      <div className="mx-auto pb-12 pt-12 md:w-[800px]">
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
              <h2 className="text-2xl font-bold mb-2">
                {currentUser.user.username}
              </h2>
              <div className="mb-2">
                <span className="text-gray-600">Email:</span>
                <span className="ml-2">{currentUser.user.email}</span>
              </div>
              <div>
                <span className="text-gray-600">Bio:</span>
                <p className="mt-1">{currentUser.user.bio}</p>
              </div>
            </div>
          </div>

          <div className="relative items-center">
            <FormInputs
              id="username"
              label="Username"
              placeholder="Username"
              defaultValue={currentUser?.user?.username}
            />
            <FaEdit className="absolute right-3 top-2/3 transform -translate-y-1/2 text-custom-color3" />
          </div>

          <div className="relative items-center">
            <FormInputs
              id="email"
              label="Email"
              placeholder="Email"
              defaultValue={currentUser?.user?.email}
            />
            <FaEdit className="absolute right-3 top-2/3 transform -translate-y-1/2 text-custom-color3" />
          </div>

          <div className="relative">
            <FormInputs
              id="password"
              label="Password"
              placeholder="Password"
              defaultValue={undefined}
            />
            <FaEdit className="absolute right-3 top-2/3 transform -translate-y-1/2 text-custom-color3" />
          </div>

          <div className="relative">
            <FormInputs
              id="bio"
              label="Bio"
              placeholder="Bio"
              defaultValue={currentUser?.user?.bio}
            />
            <FaEdit className="absolute right-3 top-2/3 transform -translate-y-1/2 text-custom-color3" />
          </div>

          <MediumButton>Update</MediumButton>

          {/* <div className="text-red-500 flex justify-between mt-5">
            <span className="cursor-pointer">Delete Account</span>
            <span className="cursor-pointer">Sign Out</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
