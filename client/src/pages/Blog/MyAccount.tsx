import Sidebar from "../../components/Sidebar";
import { selectUser } from "../../store/user/userSlice";
import { UpdateUserForm } from "../../components/UpdateUserForm";
import { useEffect, useState } from "react";
import { SmallButton } from "../../components/ButtonComponent";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUser, updateProfilePicture } from "../../api/userThunk";
import profile from "../../assets/userProfile.jpg";

const MyAccount = () => {
  const [image, setImage] = useState<File>();
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(selectUser);
  const { user } = useAppSelector(selectUser);
  const userId = currentUser?.user?.id;
  const imagePath =
    user && user.length > 0 && user[0]?.profile_picture
      ? user[0].profile_picture.replace(/\\/g, "/")
      : "";

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("userId", userId ?? "");
    formData.append("files", image ?? "");

    try {
      dispatch(updateProfilePicture(formData));
      dispatch(getUser(userId));
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
      setSelectedImage(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="flex flex-col md:flex-row -z-50">
      <Sidebar />
      <div className="mx-auto flex flex-col gap-4 px-12 pt-12 w-full">
        <h2 className="text-custom-color3 text-lg font-semibold pl-2">
          My profile
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-2 rounded-xl border-custom-color2">
          <div>
            <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full border-4">
              <label htmlFor="file" className="cursor-pointer">
                <img
                  src={
                    selectedImage ||
                    (user &&
                      user.length > 0 &&
                      user[0]?.profile_picture &&
                      `http://localhost:5000/${imagePath}`) ||
                    profile
                  }
                  alt="Profile"
                  className="rounded-full w-32 h-32"
                />
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div className="pt-4 pl-1">
              <SmallButton onClick={handleUpload}>Update</SmallButton>
            </div>
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
