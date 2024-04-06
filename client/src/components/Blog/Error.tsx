import error from "../../assets/error3.png";
import { Link } from "react-router-dom";

interface Error {
  message1?: String,
  message2?: String,
  message3?: String;
  message4?: String;
  message5?: String;
}

const Error: React.FC<Error> = ({message1, message2, message3, message4, message5}) => {
  return (
    <div className="flex justify-between align-center p-10 px-56 bg-custom-color2">
      <div>
        <h1 className="font-bold text-[180px]">{message1}</h1>
        <h3 className="font-semibold text-[60px]">{message2}</h3>
        <h2 className="font-bold text-[30px]">{message3}</h2>
        <h5 className="text-[25px]">{message4}</h5>
        <h5 className="text-[25px]">{message5}</h5>
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
