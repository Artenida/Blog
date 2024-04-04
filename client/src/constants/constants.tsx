import { IoHome } from "react-icons/io5";
import { GrBlog } from "react-icons/gr";
import { FaRegQuestionCircle, FaUser } from "react-icons/fa";
import { ReactNode } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { PiCardsFill } from "react-icons/pi";
import { MdAddBox } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoLogoInstagram } from "react-icons/io";
import { FaTiktok, FaYoutube } from "react-icons/fa";
import carousel1 from "../assets/photo4.webp";
import carousel2 from "../assets/carousel3.webp";
import carousel3 from "../assets/carousel2.jpg";

export type NavBarRoutes = {
  path: string;
  name: string;
  icon: ReactNode;
};

export const navBarRoutes: NavBarRoutes[] = [
  {
    path: "/",
    name: "Home",
    icon: <IoHome />,
  },
  {
    path: "/about",
    name: "About",
    icon: <FaRegQuestionCircle />,
  },
  {
    path: "/blog",
    name: "Blog",
    icon: <GrBlog />,
  },
  {
    path: "/bloggers",
    name: "Bloggers",
    icon: <FaUser />,
  },
];

export const Menus = [
  { title: "Create post", icon: <MdAddBox />, path: "/createPost" },
  { title: "View posts", icon: <PiCardsFill />, path: "/viewPosts" },
  {
    title: "Sign out",
    icon: <FaSignOutAlt />,
    path: "/signout",
  },
  {
    title: "Delete account",
    icon: <MdDelete />,
    path: "/delete",
  },
];

export const footerCategories = [
  {
    title: "Photography Categories",
    links: [
      { title: "Portfolios", url: "/", icon: " " },
      { title: "Photography tips", url: "/", icon: " " },
      { title: "Gear Reviews", url: "/", icon: " " },
    ],
  },
  {
    title: "About Us",
    links: [
      { title: "Our Story", url: "/", icon: " " },
      { title: "Meet the team", url: "/", icon: " " },
      { title: "Contact Us", url: "/", icon: " " },
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

export const homeSlides = [
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