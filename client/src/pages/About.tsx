import about from "../assets/about.jpg";
import Button from "../components/Buttons";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-custom-color2 min-h-screen pb-14 pt-14">
      <h1 className="text-4xl text-center font-semibold">In the Photosphere</h1>
      <div className="flex flex-col lg:flex-row items-center justify-center mt-10">
        <div className="lg:w-full lg:order-2">
          <img src={about} alt="" className="h-auto w-full max-w-md mb-8 lg:mb-0 lg:ml-auto lg:w-full" />
        </div>
        <div className="lg:w-1/2 lg:order-1 space-y-6 flex justify-center flex-col items-center px-6">
          <p className="text-base w-[70%]">
            In our blog, we celebrate the artistry of photography not merely as
            a medium of documentation, but as a profound means of communication
            and connection. We encourage individuals from all walks of life to
            partake in this enriching endeavor, regardless of their level of
            expertise or the equipment at their disposal. For in the world of
            photography, every place becomes a canvas, every object a subject,
            and every moment an opportunity to create something truly
            remarkable.
          </p>
          <p className="text-base w-[70%]">
            Through our blog, we invite you to share the places that have left
            an indelible mark on your soul—the hidden gems nestled within
            bustling cities, the serene landscapes that whisper tales of
            tranquility, and the vibrant streets pulsating with life and energy.
            Whether it's the breathtaking vistas of nature or the intricate
            architecture of urban jungles, each locale holds its own magic
            waiting to be captured through the lens.
          </p>
          <Link to="/blog">
            <Button>Explore Blog</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
