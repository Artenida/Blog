import error from "../assets/error3.png";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex justify-between align-center p-10 px-56 bg-custom-color2">
      <div>
        <h1 className="font-bold text-[180px]">404</h1>
        <h3 className="font-semibold text-[60px]">Oooops!</h3>
        <h2 className="font-bold text-[70px]">Page Not Found</h2>
        <h5 className="text-[25px]">This page doesn't exist or was removed!</h5>
        <h5 className="text-[25px]">We suggest you go back to home!</h5>
        <div className="py-3 mr-56 mt-8 border-2 border-custom-color3 bg-blue-300 rounded-lg text-center text-[20px]">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
      <div>
        <img className="h-[500px]" src={error} alt="Error" />
      </div>
    </div>
  );
};

export default Error;
