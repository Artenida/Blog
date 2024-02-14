import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom"

const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-custom-color2">
      <form
        action=""
        className="bg-custom-color1 shadow-md px-8 pt-6 pb-8 mb-4 rounded-xl"
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
            type="text"
            placeholder="Username"
            id="username"
            className="mt-2 border border-custom-color2 px-3 py-2 rounded-md focus:outline-none focus:border-custom-color3 text-custom-color3 w-[350px]"
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
            type="email"
            placeholder="email@email.com"
            id="email"
            className="mt-2 border border-custom-color2 px-3 py-2 rounded-md focus:outline-none focus:border-custom-color3 w-[350px]"
          />
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
          />
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
          />
        </div>

        <div className="flex gap-2 text-sm mt-3">
            <span>Already part of us:</span>
            <Link to="/signIn" className="text-blue-500 font-semibold">Login</Link>
        </div>

        <div className="mt-3 py-2 px-4 font-semibold text-custom-color2 bg-custom-color3 hover:bg-custom-color2 hover:text-custom-color3 border hover:border-custom-color3 rounded-lg text-center">
            <button type="submit">
                Register
            </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
