import emptyPage from "../../assets/photographer4.webp";
import { Link } from "react-router-dom";

const EmptyPage = () => {
  return (
    <div className="flex justify-between align-center p-16 px-56 bg-custom-color2 h-screen">
      <div>
        <img className="h-[500px]" src={emptyPage} alt="Error" />
      </div>
      <div className="pt-32">
        <h4 className="font-bold text-[40px]">
          Oops! Your post list is empty.
        </h4>
        <h5 className="text-[20px]">
          Looks like there's a blank canvas waiting for your adventures!
        </h5>
        <h5 className="text-[20px]">
          Why not share your stories, memories, or insights with us?
        </h5>
        <div className="py-3 mr-56 mt-8 border-2 border-custom-color3 bg-blue-300 rounded-lg text-center text-[20px]">
          <Link to="/createPost">Create Post</Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyPage;
