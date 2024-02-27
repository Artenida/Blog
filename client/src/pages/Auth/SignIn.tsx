import { FaUser, FaUserAstronaut } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert } from "@material-tailwind/react";
import { ImSpinner11 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { loginUser } from "../../api/userThunk";
import background from "../../assets/about1.avif";
import FormInputs from "../../components/FormInputs";
import { AppDispatch } from "../../store/store";
import { selectUser } from "../../store/user/userSlice";

interface FormData {
  username: string;
  password: string;
}

const SignIn = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [formDataErrors, setFormDataErrors] = useState<FormData>({
    username: "",
    password: "",
  });

  const validations = (id: string, value: string): FormData => {
    let errors: FormData = { ...formDataErrors };

    if (id === "username") {
      errors.username = value ? "" : "Username is required";
    } else if (id === "password") {
      errors.password =
        value.length < 8 ? "Password must be at least 8 characters" : "";
    }
    return errors;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value.trim() });
    setFormDataErrors(validations(id, value));
  };

  const { isLoggedIn, loading, loginError } = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      await dispatch(loginUser(formData));
    } catch (error) {
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
    >
      <form
        action=""
        className="bg-custom-color1 bg-opacity-30 shadow-md backdrop-blur-md px-8 pt-6 pb-8 mb-4 rounded-xl md:w-[400px]"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center text-custom-color3 text-2xl">
          <FaUserAstronaut />
        </div>
        <h2 className="flex justify-center text-custom-color3 text-xl font-semibold">
          Already Part of Us
        </h2>

        <FormInputs
          id="username"
          label="Username"
          placeholder="Enter your username"
          type="text"
          onChange={handleChange}
          icon={<FaUser />}
        />
        {formDataErrors.username && (
          <span className="text-red-600 pl-1">{formDataErrors.username}</span>
        )}

        <FormInputs
          id="password"
          label="Password"
          placeholder="********"
          type="password"
          onChange={handleChange}
          icon={<RiLockPasswordFill />}
        />
        {formDataErrors.password && (
          <span className="text-red-600 pl-1">{formDataErrors.password}</span>
        )}

        <div className="flex gap-2 text-sm mt-3">
          <span>Don't have an account:</span>
          <Link to="/signUp" className="text-blue-500 font-semibold">
            Register
          </Link>
        </div>

        <div className="mt-3 py-2 font-semibold cursor-pointer text-custom-color2 bg-custom-color3 active:bg-custom-color2 active:text-custom-color3 border active:border-custom-color3 rounded-lg text-center">
          <button type="submit" disabled={loading} className="w-full h-full">
            {/* Register */}
            {loading ? (
              <div className="flex justify-center items-center">
                <ImSpinner11 className="text-sm" />
                <span className="pl-3">Loading...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>

        {loginError && (
          <Alert className="mt-3 bg-red-200 py-2 px-6 text-red-500">
            {JSON.stringify(loginError)}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default SignIn;
