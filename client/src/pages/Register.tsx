import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { Alert } from "@material-tailwind/react";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  // Define your props if any
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage('Please fill out all fields');
      console.log(errorMessage);
      return;
    } 

    if (!formData.email.trim()) {
      setErrorMessage("Email is not valid");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage("Email is not valid");
    }

    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters");
      return;
    }  else if( formData.password !== formData.confirmPassword) {
      setErrorMessage('Password not matched');
      // console.log(errorMessage);
      return;
    }

   

    navigate('/signIn');
  }

  return (
    <div className="flex justify-center items-center h-screen bg-custom-color2">
      <form
        action=""
        className="bg-custom-color1 shadow-md px-8 pt-6 pb-8 mb-4 rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center text-custom-color3 text-2xl">
          <FaUserAstronaut />
        </div>
        <h2 className="flex justify-center text-custom-color3 text-xl font-semibold">
          Register
        </h2>

        <div className="mt-3">
          <div className="flex items-center align-center gap-1">
            <FaUser />
            <label
              htmlFor="username"
              className="font-semibold text-custom-color3"
            >
              Username
            </label>
          </div>
          <input
          autoComplete="off"
            type="text"
            placeholder="Username"
            id="username"
            className="mt-2 border border-custom-color2 px-3 py-2 rounded-md focus:outline-none focus:border-custom-color3 text-custom-color3 w-[350px]"
            onChange={handleChange}
            />
        </div>

        <div className="mt-3">
          <div className="flex items-center align-center gap-1">
            <MdEmail />
            <label htmlFor="email" className="font-semibold text-custom-color3">
              Email
            </label>
          </div>
          <input
            autoComplete="off"
            type="email"
            placeholder="email@email.com"
            id="email"
            className="mt-2 border border-custom-color2 px-3 py-2 rounded-md focus:outline-none focus:border-custom-color3 w-[350px]"
          onChange={handleChange}/>
        </div>

        <div className="mt-3">
          <div className="flex items-center align-center gap-1">
            <RiLockPasswordFill />
            <label
              htmlFor="password"
              className="font-semibold text-custom-color3"
            >
              Password
            </label>
          </div>
          <input
            type="password"
            placeholder="********"
            id="password"
            className="mt-2 border border-custom-color2 px-3 py-2 rounded-md focus:outline-none focus:border-custom-color3 w-[350px]"
          onChange={handleChange}/>
        </div>

        <div className="mt-3">
          <div className="flex items-center align-center gap-1">
            <RiLockPasswordFill />
            <label
              htmlFor="confirmPassword"
              className="font-semibold text-custom-color3"
            >
              Confirm Password
            </label>
          </div>
          <input
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            className="mt-2 border border-custom-color2 px-3 py-2 rounded-md focus:outline-none focus:border-custom-color3 w-[350px]"
          onChange={handleChange}/>
        </div>

        <div className="flex gap-2 text-sm mt-3">
            <span>Already part of us:</span>
            <Link to="/signIn" className="text-blue-500 font-semibold">Login</Link>
        </div>

        <div className="mt-3 font-semibold cursor-pointer text-custom-color2 bg-custom-color3 active:bg-custom-color2 active:text-custom-color3 border active:border-custom-color3 rounded-lg text-center">
            <button type="submit" className="py-2 px-4" disabled={loading}>
                Register
            </button>
        </div>
        {
          errorMessage && (
            <Alert className="mt-3 bg-red-200 py-2 px-6 text-red-500">{errorMessage}</Alert>
            )
        }
      </form>
    </div>
  );
};

export default Register;
