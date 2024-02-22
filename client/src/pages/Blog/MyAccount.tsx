import Sidebar from "../../components/Sidebar";
import background from "../../assets/about1.avif";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/userSlice";
import profile from "../../assets/posts/profile.webp";
import FormInputs from "../../components/FormInputs";
import { MediumButton } from "../../components/ButtonComponent";

const MyAccount = () => {
  const { currentUser } = useSelector(selectUser);
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

      <div className="max-w-lg mx-auto p-3 w-full">
        <div className="flex flex-col gap-3">
          <div
            className="w-32 h-32 self-center cursor-pointer shadow-md 
          overflow-hidden rounded-full border-4"
          >
            {/* <img src={currentUser.user.profile_picture} alt="" /> */}
            <img src={profile} alt="" className="rounded-full w-32 h-32" />
          </div>
          <FormInputs
            id="username"
            label="Username"
            placeholder="Username"
            defaultValue={currentUser.username}
          />
          <FormInputs
            id="email"
            label="Email"
            placeholder="Email"
            defaultValue={currentUser.email}
          />
          <FormInputs id="password" label="Password" placeholder="Password" />
          <FormInputs id="bio" label="Bio" placeholder="Bio" />

          <MediumButton>Update</MediumButton>

          <div className="text-red-500 flex justify-between mt-5">
            <span className="cursor-pointer">Delete Account</span>
            <span className="cursor-pointer">Sign Out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
