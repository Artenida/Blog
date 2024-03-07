import FormInputs from "../components/FormInputs";
import { MediumButton } from "../components/ButtonComponent";
import { FaEdit } from "react-icons/fa";
import { validateUpdateForm } from "../utils/validations";
import { selectUser } from "../store/user/userSlice";
import { updateUser } from "../api/userThunk";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { Alert } from "@material-tailwind/react";

interface FormData {
  username: string;
  email: string;
  bio: string;
  password: string;
}

export const UpdateUserForm = () => {
  const dispatch = useAppDispatch(); // Dispatch function to dispatch actions
  const navigate = useNavigate();
  const { currentUser, updateError, isUpdated } = useAppSelector(selectUser);

  const currentId = currentUser?.user?.id;
  const [valid, setValid] = useState(false);
  const [formDataErrors, setFormDataErrors] = useState<FormData>({
    username: "",
    email: "",
    bio: "",
    password: "",
  });

  const [data, setData] = useState({
    username: currentUser?.user?.username ?? "",
    email: currentUser?.user?.email ?? "",
    bio: currentUser?.user?.bio ?? "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    const updatedErrors = validateUpdateForm(id, value, formDataErrors);
    setFormDataErrors(updatedErrors);
  };

  useEffect(() => {
    if (valid) {
      const newUser = {
        username: data.username,
        email: data.email,
        password: data.password,
        bio: data.bio,
        userId: currentUser?.user?.id,
      };
      dispatch(updateUser(newUser));
    }
  }, [valid, data, dispatch, currentUser, currentId, navigate]);

  const hasErrors = Object.values(formDataErrors).some((error) => error !== "");
  const handleUpdate = async () => {
    if (hasErrors) {
      console.log("Form has errors. Please fix them before updating.");
    } else {
      setValid(true);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 border-2 rounded-xl border-custom-color2">
      <div className="">
        <div className="flex justify-between items-center px-2">
          <h2 className="text-lg sm:text-xl lg:text-2xl text-custom-color3 font-semibold">
            Personal Information
          </h2>
          <div className="flex gap-1 items-center border-2 border-gray-300 px-3 py-1 rounded-full">
            <FaEdit className="text-gray-400" />
            <span className="text-sm sm:text-base text-gray-400">Edit</span>
          </div>
        </div>
      </div>

      <div className="">
        <FormInputs
          id="username"
          label="Username"
          placeholder="Username"
          value={data.username}
          onChange={handleInputChange}
          errorMessage={formDataErrors.username}
        />
      </div>

      <div className="">
        <FormInputs
          id="email"
          label="Email"
          placeholder="Email"
          value={data.email}
          onChange={handleInputChange}
          errorMessage={formDataErrors.email}
        />
      </div>

      <div className="">
        <FormInputs
          id="bio"
          label="Bio"
          placeholder="Bio"
          value={data.bio}
          onChange={handleInputChange}
          errorMessage={formDataErrors.bio}
        />
      </div>

      <div className="mb-3">
        <FormInputs
          id="password"
          label="Password"
          placeholder="Password"
          value={data.password}
          onChange={handleInputChange}
          errorMessage={formDataErrors.password}
        />
      </div>
      <MediumButton onClick={handleUpdate}>Update</MediumButton>
      {!hasErrors && updateError && (
        <Alert className="mt-3 bg-red-200 py-2 px-6 text-red-500">
          {JSON.stringify(updateError)}
        </Alert>
      )}
      {hasErrors && (
        <Alert className="mt-3 bg-red-200 py-2 px-6 text-red-500">
          Form has errors. Please fix them before updating.
        </Alert>
      )}
    </div>
  );
};
