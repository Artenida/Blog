import React from "react";
import { Link } from "react-router-dom";
import wallpaper from "../../assets/wallpaper2.jpg";
import home from "../../assets/home4.webp";
import Carousel from "../../components/Carousel";
import { MdOutlineReadMore } from "react-icons/md";
import carousel1 from "../../assets/photo4.webp";
import carousel2 from "../../assets/carousel3.webp";
import carousel3 from "../../assets/carousel2.jpg";

const Home = () => {
  const slides = [
    {
      title: "Every detail is enough to inspire",
      subtitle: "You just have to look closely",
      content:
        "The world is filled with countless moments, nuances, and intricacies waiting to ignite creativity and motivation within us.Amidst the hustle and bustle of our daily lives, it's easy to overlook the intricate tapestry that surrounds us. Every detail is enough to inspire, whispers the wind as it gently caresses the leaves, each one a masterpiece of nature's design. You just have to look closely, the sunlight murmurs as it dances through the branches, casting shadows that tell stories of forgotten moments.",
      image: carousel1,
    },
    {
      title: "Every place is an art gallery",
      subtitle: "You just have to feel it",
      content:
        "Beauty and artistic expression can be found everywhere, not just within traditional galleries or museums. In the bustling streets of a city, amidst the quiet solitude of a forest, or along the tranquil shores of a beach, art awaits those who seek it. Every place is an art gallery, whispers the world around us, its walls adorned with the vibrant hues of life's myriad expressions. You just have to feel it, it gently reminds us, urging us to open our hearts to the beauty that surrounds us.",
      image: carousel2,
    },
    {
      title: "Every little thing is a memory",
      subtitle: "You only have to remember it",
      content:
        "Our lives are composed of countless moments, experiences, and interactions, each imbued to leave a lasting imprint on our hearts and minds. In the tapestry of our lives, every little thing we encounter becomes a memory waiting to be cherished. Every little thing is a memory, whispers the breeze as it rustles through the trees, carrying with it the echoes of days gone by. You only have to remember it, it gently reminds us, urging us to embrace the moments that shape our journey.",
      image: carousel3,
    },
  ];

  const newLocal = "flex items-center mt-2 pl-2 lg:pl-[80%] lg:mt-0";
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
              ...
              <div className={newLocal}>
                <MdOutlineReadMore className="mr-1 text-xl text-custom-color3" />
                <Link
                  to="/about"
                  className="text-custom-color3 text-sm lg:text-base"
                >
                  Read more
                </Link>
              </div>
            </p>
          </div>
        </div>
      </div>

      <Carousel slides={slides} />
    </div>
  );
};

export default Home;
