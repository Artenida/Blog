import emptyPage from "../../assets/photographer4.webp";
import { Link } from "react-router-dom";

const EmptyPage = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center p-5 md:p-10 bg-custom-color2 min-h-screen">
      <div className="md:mr-12 md:w-1/2">
        <img className="h-auto md:h-full max-w-full" src={emptyPage} alt="Error" />
      </div>
      <div className="pt-8 md:pt-0 md:w-1/2">
        <div className="border border-custom-color3 p-8 rounded-lg">
          <h4 className="font-bold text-4xl md:text-5xl mb-4">
            Oops! Your post list is empty.
          </h4>
          <h5 className="text-lg md:text-xl mb-4">
            Looks like there's a blank canvas waiting for your adventures!
          </h5>
          <h5 className="text-lg md:text-xl mb-4">
            Why not share your stories, memories, or insights with us?
          </h5>
          <div className="py-3 mt-8 border-2 border-custom-color3 bg-blue-300 rounded-lg text-center text-lg md:text-xl">
            <Link to="/createPost">Create Post</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyPage;
