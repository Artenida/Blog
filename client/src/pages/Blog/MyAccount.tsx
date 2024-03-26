import Sidebar from "../../components/Sidebar";
import { selectUser } from "../../store/user/userSlice";
import { UpdateUserForm } from "../../components/UpdateUserForm";
import { useEffect, useState } from "react";
import { MediumButton } from "../../components/ButtonComponent";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUser, updateProfilePicture } from "../../api/userThunk";
import profile from "../../assets/userProfile.jpg";

const MyAccount = () => {
  const [image, setImage] = useState<File>();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(selectUser);
  const { user } = useAppSelector(selectUser);
  const userId = currentUser?.user?.id;
console.log(user)

const imagePath = user[0].profile_picture.replace(/\\/g, '/');
console.log(imagePath)

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId])

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("userId", userId ?? "");
    formData.append("files", image ?? "");

    dispatch(updateProfilePicture(formData));
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
                src={
                  user[0].profile_picture
                    ? `http://localhost:5000/${imagePath}`
                    : profile
                }
                alt="Profile"
                className="rounded-full w-32 h-32"
              />
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(event) => setImage(event.target.files?.[0])}
              />
            </label>
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
        <MediumButton onClick={handleUpload}>
          Update Profile Picture
        </MediumButton>

        <UpdateUserForm />
      </div>
    </div>
  );
};

export default MyAccount;
