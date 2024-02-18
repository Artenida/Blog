import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert } from "@material-tailwind/react";
import { ImSpinner11 } from "react-icons/im";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from "../store/user/userSlice";
import background from "../assets/about1.avif";
import FormInputs from "../components/FormInputs";

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

  const { error: errorMessage } = useAppSelector((state) => state.user);
  const { loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      dispatch(registerFailure("Please fill out all fields"));
      console.log(errorMessage);
      return;
    }

    if (!formData.email.trim()) {
      dispatch(registerFailure("Email is not valid"));
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      dispatch(registerFailure("Email is not valid"));
    }

    if (formData.password.length < 8) {
      dispatch(registerFailure("Password must be at least 8 characters"));
      return;
    } else if (formData.password !== formData.confirmPassword) {
      dispatch(registerFailure("Password not matched"));
      // console.log(errorMessage);
      return;
    }

    try {
      dispatch(registerStart());
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(registerFailure(data));
        return;
      }

      if (res.ok) {
        dispatch(registerSuccess(data));
        navigate("/signIn");
      }
    } catch (error: any) {
      dispatch(registerFailure(error.message));
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
    >
      <form
        action=""
        className="bg-custom-color1 bg-opacity-30 shadow-md px-8 pt-6 pb-8 mb-4 rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center text-custom-color3 text-2xl">
          <FaUserAstronaut />
        </div>
        <h2 className="flex justify-center text-custom-color3 text-xl font-semibold">
          Become part of us
        </h2>

        <FormInputs id="username" label="Username" placeholder="Enter your username" type="text" onChange={handleChange} icon={<FaUser />}/>
        <FormInputs id="email" label="Email" placeholder="email@email.com" type="email" onChange={handleChange} icon={<MdEmail />}/>
        <FormInputs id="password" label="Password" placeholder="********" type="password" onChange={handleChange} icon={<RiLockPasswordFill />}/>
        <FormInputs id="confirmPassword" label="Confirm Password" placeholder="Confirm Password" type="password" onChange={handleChange} icon={<RiLockPasswordFill />}/>

        <div className="flex gap-2 text-sm mt-3">
          <span>Already part of us:</span>
          <Link to="/signIn" className="text-blue-500 font-semibold">
            Login
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
              "Register"
            )}
          </button>
        </div>
        {errorMessage && (
          <Alert className="mt-3 bg-red-200 py-2 px-6 text-red-500">
            {errorMessage}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default Register;
