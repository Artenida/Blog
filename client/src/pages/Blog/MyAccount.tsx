import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/userSlice";
import { UpdateUserForm } from "../../components/UpdateUserForm";
import { useState } from "react";
import { MediumButton } from "../../components/ButtonComponent";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateProfilePicture } from "../../api/userThunk";

const MyAccount = () => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const { currentUser, token } = useAppSelector(selectUser);

  const update = () => {
    if (file) {
      const formData = new FormData();
      formData.append("profile_picture", file); 
      formData.append("userId", currentUser?.user?.id); 

      // dispatch(updateProfilePicture({ token: token, body: formData }));
    }
  };

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
  };

  return (
    <div className="flex flex-col md:flex-row -z-50">
      <Sidebar />
      <div className="border-r-4 border-opacity-50 my-12 ml-4 border-custom-color2"></div>
      <div className="mx-auto flex flex-col gap-4 p-12 w-full">
        <h2 className="text-custom-color3 text-lg font-semibold pl-2">
          My profile
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-2 rounded-xl border-custom-color2">
          <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full border-4">
            <label htmlFor="file" className="cursor-pointer">
              <img
                src={currentUser?.user?.profile_picture}
                alt="Profile"
                className="rounded-full w-32 h-32"
              />
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleClick}
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
        <MediumButton onClick={update}>Update Profile Photo</MediumButton>

        <UpdateUserForm />
      </div>
    </div>
  );
};

export default MyAccount;
