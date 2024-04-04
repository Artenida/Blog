import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert } from "@material-tailwind/react";
import { ImSpinner11 } from "react-icons/im";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import background from "../../assets/about1.avif";
import FormInputs from "../../components/FormInputs";
import { selectUser } from "../../store/user/userSlice";
import { registerUser } from "../../api/userThunk";
import { useEffect } from "react";
import { validateRegisterForm } from "../../utils/validations";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formDataErrors, setFormDataErrors] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { currentUser, loading, registerError } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const updatedErrors = validateRegisterForm(id, value, formDataErrors);
    setFormData({ ...formData, [id]: value.trim() });
    setFormDataErrors(updatedErrors);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { username, email, password, confirmPassword } = formData;
      const resultAction = await dispatch(
        registerUser({ username, email, password, confirmPassword })
      );
      if (registerUser.fulfilled.match(resultAction)) {
        navigate("/signIn");
      } else if (registerUser.rejected.match(resultAction)) {
        console.error(resultAction.error.message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
    >
      <form
        action=""
        className="bg-custom-color1 bg-opacity-30 shadow-md px-8 pt-6 pb-8 mb-4 rounded-xl md:w-[400px]"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center text-custom-color3 text-2xl">
          <FaUserAstronaut />
        </div>
        <h2 className="flex justify-center text-custom-color3 text-xl font-semibold">
          Become part of us
        </h2>

        <FormInputs
          id="username"
          label="Username"
          placeholder="Enter your username"
          type="text"
          onChange={handleChange}
          icon={<FaUser />}
          errorMessage={formDataErrors.username}
        />

        <FormInputs
          id="email"
          label="Email"
          placeholder="email@email.com"
          type="email"
          onChange={handleChange}
          icon={<MdEmail />}
          errorMessage={formDataErrors.email}
        />

        <FormInputs
          id="password"
          label="Password"
          placeholder="********"
          type="password"
          onChange={handleChange}
          icon={<RiLockPasswordFill />}
          errorMessage={formDataErrors.password}
        />

        <FormInputs
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          onChange={handleChange}
          icon={<RiLockPasswordFill />}
          errorMessage={formDataErrors.confirmPassword}
        />

        <div className="flex gap-2 text-sm mt-3">
          <span>Already part of us:</span>
          <Link to="/signIn" className="text-blue-500 font-semibold">
            Login
          </Link>
        </div>

        <div className="mt-4 py-2 font-semibold cursor-pointer text-custom-color2 bg-custom-color3 active:bg-custom-color2 active:text-custom-color3 border active:border-custom-color3 rounded-lg text-center">
          <button type="submit" disabled={loading} className="w-full h-full">
            {loading ? (
              <div className="flex justify-center items-center">
                <ImSpinner11 className="text-sm" />
                <span className="pl-3">Loading...</span>
              </div>
            ) : (
              "Register"
            )}
          </button>
        </div>
        {registerError && (
          <Alert className="mt-3 bg-red-200 py-2 px-6 text-red-500">
            {JSON.stringify(registerError)}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default Register;
