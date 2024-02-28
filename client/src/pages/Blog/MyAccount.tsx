import Sidebar from "../../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/userSlice";
import profile from "../../assets/posts/profile.webp";
import FormInputs from "../../components/FormInputs";
import { MediumButton } from "../../components/ButtonComponent";
import { FaEdit } from "react-icons/fa";
import { updateUser } from "../../api/userThunk";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const { currentUser } = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const currentId = currentUser?.user?.id;
  const [valid, setValid] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    bio: "",
  });

  const [data, setData] = useState({
    username: currentUser?.user?.username ?? "",
    email: currentUser?.user?.email ?? "",
    bio: currentUser?.user?.bio ?? "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validations = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!data.username.trim()) {
      errors.username = "Username is required";
      isValid = false;
    } else {
      errors.username = "";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else {
      errors.email = "";
    }

    if (!data.bio.trim()) {
      errors.bio = "Bio is required";
      isValid = false;
    } else {
      errors.bio = "";
    }

    setErrors(newErrors);
    setValid(isValid);
  };

  const handleUpdate = async () => {
    validations();
  };

  useEffect(() => {
    if (valid) {
      const newUser = {
        username: data.username,
        email: data.email,
        bio: data.bio,
        userId: currentUser?.user?.id,
      };
      dispatch(updateUser(newUser)).then(() => {
        navigate(`/myAccount/${currentId}`);
      });
    }
  }, [valid, data, dispatch, currentUser, currentId, navigate]);

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

        <div className="flex flex-col gap-3 p-4 border-2 rounded-xl border-custom-color2">
          <div className="relative">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-lg sm:text-xl lg:text-2xl text-custom-color3 font-semibold">
                Personal Information
              </h2>
              <div className="flex gap-1 items-center border-2 border-gray-300 px-3 py-1 rounded-full">
                <FaEdit className="text-gray-400" />
                <span className="cursor-pointer text-sm sm:text-base text-gray-400">
                  Edit
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <FormInputs
              id="username"
              label="Username"
              placeholder="Username"
              value={data.username}
              onChange={handleInputChange}
            />
            <span className="text-red-500">{errors.username}</span>
          </div>

          <div className="relative">
            <FormInputs
              id="email"
              label="Email"
              placeholder="Email"
              value={data.email}
              onChange={handleInputChange}
            />
            <span className="text-red-500">{errors.email}</span>
          </div>

          <div className="relative mb-3">
            <FormInputs
              id="bio"
              label="Bio"
              placeholder="Bio"
              value={data.bio}
              onChange={handleInputChange}
            />
            <span className="text-red-500">{errors.bio}</span>
          </div>
          <MediumButton onClick={handleUpdate}>Update</MediumButton>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
