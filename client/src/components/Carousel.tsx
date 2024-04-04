import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Slide {
  title: string;
  subtitle: string;
  content: string;
  image: string;
}
interface MySwiperComponentProps {
  slides: Slide[];
}

const MySwiperComponent = ({ slides }: MySwiperComponentProps) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation={true}
      modules={[Navigation]}
      className="swiper-container"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="grid gap-4 md:grid-cols-2 md:items-center md:text-left
                          bg-custom-color2 md:p-24 lg:p-24 mt-12"
          >
            <div className="flex justify-center items-center p-4">
              <img src={slide.image} alt="" className="w-96 h-96 rounded-lg" />
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-medium mb-2">{slide.title}</h3>
              <h3 className="text-lg font-semibold">{slide.subtitle}</h3>
              <p className="">{slide.content}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MySwiperComponent;
