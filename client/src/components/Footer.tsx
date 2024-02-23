import { Link } from "react-router-dom";
import { IoLogoInstagram } from "react-icons/io";
import { FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";

 // Define footer data
 const footerCategories = [
  {
    title: "Photography Categories",
    links: [
      { title: "Portfolios", url: "/",  icon: " " },
      { title: "Photography tips", url: "/",  icon: " " },
      { title: "Gear Reviews", url: "/",  icon: " " },
    ],
  },
  {
    title: "About Us",
    links: [
      { title: "Our Story", url: "/",  icon: " "},
      { title: "Meet the team", url: "/",  icon: " " },
      { title: "Contact Us", url: "/",  icon: " " },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Photography Shops", url: "/", icon: " " },
      { title: "Photography Courses", url: "/", icon: " " },
      { title: "Photography Equipment Store", url: "/", icon: " " },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { title: "Instagram", url: "/", icon: <IoLogoInstagram /> },
      { title: "TikTok", url: "/", icon: <FaTiktok /> },
      { title: "YouTube", url: "/", icon: <FaYoutube /> },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-custom-color3 py-8">
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-4">
        <div className="grid grid-cols-2 gap-5 lg:col-span-4 md:grid-cols-4">
          {/* Map through footer categories */}
          {footerCategories.map((category, index) => (
            <div key={index}>
              <p className="text-lg  tracking-wide text-custom-color2">
                {category.title}
              </p>
              <ul className="mt-2 space-y-2">
                {/* Map through links within each category */}
                {category.links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.url}
                      className="text-custom-color1 duration-300 hover:text-custom-color2"
                    >
                      <div className="flex gap-1 items-center">
                        {link.icon}
                        {link.title}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center align-center pt-9">
        <p className="text-custom-color2 text-sm">
          © {new Date().getFullYear()} Writer. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
