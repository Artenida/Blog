import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import carousel1 from "../assets/carousel2.jpg";
import carousel2 from "../assets/carousel3.webp";
import carousel3 from "../assets/carousel4.jpg";

const MySwiperComponent = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation={true}
      modules={[Navigation]}
    >
      <SwiperSlide>
        <div className="relative pt-12 pl-6 pr-6 lg:pl-36 pb-12 bg-custom-color2 mt-10 h-full flex flex-col lg:flex-row items-center">
          <img
            src={carousel1}
            alt=""
            className="h-96 w-auto mb-8 lg:mb-0 lg:mr-12 lg:order-2"
          />
          <div className="space-y-3 lg:order-1">
            <h3 className="text-4xl text-custom-color3 font-semibold">
              Every detail is enough to inspire
            </h3>
            <h3 className="text-lg">You just have to look closely</h3>
            <p className="text-base">
              The world is filled with countless moments, nuances, and
              intricacies waiting to ignite creativity and motivation within us.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative pt-12 pl-6 pb-12 bg-custom-color2 mt-10 h-full flex flex-col lg:flex-row items-center">
          <img
            src={carousel2}
            alt=""
            className="h-96 w-auto mb-8 lg:mb-0 lg:mr-12 lg:ml-36"
          />
          <div className="space-y-3">
            <h3 className="text-4xl text-custom-color3 font-semibold">
              Every place is an art gallery
            </h3>
            <h3 className="text-lg">You just have to feel it</h3>
            <p className="text-base">
              Beauty and artistic expression can be found everywhere, not just
              within traditional galleries or museums.
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative pt-12 pl-6 pb-12 bg-custom-color2 mt-10 h-full flex flex-col lg:flex-row items-center">
          <img
            src={carousel3}
            alt=""
            className="h-96 w-auto mb-8 lg:mb-0 lg:mr-12 lg:ml-36"
          />
          <div className="space-y-3">
            <h3 className="text-4xl text-custom-color3 font-semibold">
              Every little thing is a memory
            </h3>
            <h3 className="text-lg">You only have to remember it</h3>
            <p className="text-base">
              Our lives are composed of countless moments, experiences, and
              interactions, each imbued to leave a lasting imprint on our hearts
              and minds.
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default MySwiperComponent;
