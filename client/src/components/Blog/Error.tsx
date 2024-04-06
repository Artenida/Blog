import error from "../../assets/error3.png";
import { Link } from "react-router-dom";

interface ErrorProps {
  message1?: string;
  message2?: string;
  message3?: string;
  message4?: string;
  message5?: string;
}

const Error: React.FC<ErrorProps> = ({ message1, message2, message3, message4, message5 }) => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-center items-center p-5 md:p-10 bg-custom-color2">
      <div className="md:mr-12 text-center md:text-left">
        <h1 className="font-bold text-8xl md:text-9xl">{message1}</h1>
        <h3 className="font-semibold text-4xl md:text-5xl">{message2}</h3>
        <h2 className="font-bold text-3xl md:text-4xl">{message3}</h2>
        <h5 className="text-lg md:text-xl">{message4}</h5>
        <h5 className="text-lg md:text-xl">{message5}</h5>
        <div className="py-3 mt-8 border-2 border-custom-color3 bg-blue-300 rounded-lg text-center text-xl md:text-2xl">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
      <div className="text-center md:text-right">
        <img className="h-auto md:h-[500px] max-w-full" src={error} alt="Error" />
      </div>
    </div>
  );
};

export default Error;
