import { Link } from "react-router-dom";
import wallpaper from "../../assets/wallpaper2.jpg";
import home from "../../assets/home4.webp";
import Carousel from "../../components/Carousel";
import { MdOutlineReadMore } from "react-icons/md";
import { homeSlides } from "../../constants/constants";

const Home = () => {
  return (
    <div className="relative">
      <div className="relative h-screen">
        <img src={wallpaper} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-45"></div>

        <div className="absolute inset-0 flex justify-center items-center">
          <div className="relative md:pl-18">
            <img
              src={home}
              alt=""
              className="max-w-full h-auto max-h-96 opacity-80"
            />{" "}
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="text-white text-center md:pl-12 z-10">
                <h1 className="text-4xl font-bold mb-6">In The Photosphere</h1>
                <p>
                  "Capture the world through your lens:
                  <br />
                  <span className="block">
                    journeys, events, and raw emotions,
                  </span>
                  <span className="block">encapsulated in moments."</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto rounded bg-custom-color2 shadow-md p-6 mt-12">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-custom-color3">
            In Our Photosphere
          </h2>
          <div className="space-y-3 mt-4">
            <p className="text-base">
              In our blog, we celebrate the artistry of photography not merely
              as a medium of documentation, but as a profound means of
              communication and connection. We encourage individuals from all
              walks of life to partake in this enriching endeavor, regardless
              ...</p>
              <div className="flex items-center mt-2 pl-2 lg:pl-[80%] lg:mt-0">
                <MdOutlineReadMore className="mr-1 text-xl text-custom-color3" />
                <Link
                  to="/about"
                  className="text-custom-color3 text-sm lg:text-base"
                >
                  Read more
                </Link>
              </div>
          </div>
        </div>
      </div>

      <Carousel slides={homeSlides} />
    </div>
  );
};

export default Home;
