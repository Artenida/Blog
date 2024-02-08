import logo from '../assets/about6.jpg';
import '../styles/about.css';

const About = () => {
    return (
        <div className="bg-custom-color1 min-h-screen flex justify-center items-center mt-12 mr-12 ml-12">
            <div className="max-w-7xl mx-auto lg:flex lg:justify-center lg:items-center">
            <div className="block bg-white pr-12"><img src={logo} alt="" className="lg:w-full lg:h-auto" /></div>
                <div className="lg:w-1/2 lg:m-0">
                    <h1 className="text-3xl font-bold mt-4">About Us</h1>
                    <p className="text-lg mt-6">
                        Welcome to our photography blog, where every click captures a moment, a story, and a world of emotions.
                    </p>
                    <p className="text-lg mt-6">
                        From stunning landscapes to intimate portraits, from bustling cityscapes to serene nature scenes, we strive to capture the beauty and essence of life in every image we create. Through our lens, we invite you to see the world from a different perspective, to uncover the extraordinary in the ordinary, and to experience the magic of photography.
                    </p>
                    <p className="text-lg mt-6">
                        Whether you're a seasoned photographer looking for inspiration, an amateur enthusiast eager to learn, or simply someone who appreciates the beauty of visual storytelling, our blog is your sanctuary. Here, you'll find tips, tricks, and techniques to improve your photography skills, along with captivating stories behind the images that inspire us.
                    </p>
                    <p className="text-lg mt-6">
                        Join us on this visual journey as we explore the world through our lens, one photograph at a time. Let's capture moments, create memories, and embark on an adventure of light, shadow, and infinite possibilities together.
                    </p>
                    <p className="text-lg">
                        Thank you for visiting ShutterScene. Let's capture the beauty of life, one click at a time.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
