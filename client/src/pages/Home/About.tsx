import about from "../../assets/about.jpg";
import background from "../../assets/about1.avif";
import Button from "../../components/Buttons";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div
      className="min-h-screen pb-14 pt-14 relative bg-custom-color2"
      // style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}

      <h1 className="text-4xl text-center font-semibold z-10 relative text-black">
        In the Photosphere
      </h1>
      <div className="flex flex-col lg:flex-row items-center justify-center mt-10 z-10 relative">
        <div className="lg:w-full lg:order-2">
          <img
            src={about}
            alt=""
            className="h-auto w-full max-w-md mb-8 lg:mb-0 lg:ml-auto lg:w-full"
          />
        </div>
        <div className="relative lg:w-1/2 lg:order-1 space-y-6 flex justify-center flex-col items-center px-6 text-black">
          <p className="text-lg w-[70%]">
            In our blog, we celebrate the artistry of photography not merely as
            a medium of documentation, but as a profound means of communication
            and connection. We encourage individuals from all walks of life to
            partake in this enriching endeavor, regardless of their level of
            expertise or the equipment at their disposal. For in the world of
            photography, every place becomes a canvas, every object a subject,
            and every moment an opportunity to create something truly
            remarkable.
          </p>
          <p className="text-lg w-[70%]">
            Through our blog, we invite you to share the places that have left
            an indelible mark on your soul—the hidden gems nestled within
            bustling cities, the serene landscapes that whisper tales of
            tranquility, and the vibrant streets pulsating with life and energy.
            Whether it's the breathtaking vistas of nature or the intricate
            architecture of urban jungles, each locale holds its own magic
            waiting to be captured through the lens.
          </p>
          <p className="text-lg w-[70%]">
            Expanding on the essence of photography and its celebration through
            our blog, consider the following paragraph: --- In the realm of
            photography, we find a boundless journey where every click captures
            not just an image, but a story waiting to be told. Our blog stands
            as a testament to the belief that photography transcends mere
            documentation; it becomes a conduit through which we connect,
            empathize, and perceive the world around us. With each snapshot, we
            embark on a voyage of self-discovery, unraveling the intricate
            layers of our surroundings and ourselves. Here, amidst the pixels
            and frames, we celebrate the beauty of imperfection, the allure of
            the unexplored, and the poetry of the mundane. Whether you're a
            seasoned photographer or an aspiring enthusiast, our platform
            welcomes all to embark on this enriching odyssey of visual
            storytelling. Join us as we traverse the landscapes of imagination,
            where every image becomes a window into the soul and every moment a
            brushstroke on the canvas of time.
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
