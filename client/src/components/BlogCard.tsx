import { Link } from "react-router-dom";
import images from "../constants/images";
import { MdReadMore } from "react-icons/md";

interface Tag {
  id: number;
  name: string;
}
interface BlogType {
  blogs: {
    id: number;
    image: string;
    tags: Tag[];
    title: string;
    description: string;
    user: string;
    profile: string;
    date: Date;
  }[];
}

const BlogCard = ({ blogs }: BlogType) => {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full mt-12 gap-12">
<div className="shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] p-3 transform transition-transform hover:scale-105 bg-custom-color1 rounded-xl">
        <div className="rounded-xl overflow-hidden">
          <Link to=''><img
            src={images.blog1}
            alt="blogPicture"
            className="w-full object-cover object-center h-64"
          /></Link>
        </div>
        <div className="flex flex-col">
          <h3 className="mt-4 mb-2 hover:text-custom-color3 text-sm">Tags</h3>
          <h2 className="mt-4 mb-2 font-bold hover:text-custom-color3 text-lg">
            Places to photograph
          </h2>
          <p className="text-custom-color3 mt-3 text-sm md:text-base lg:text-lg">
            All people can make pictures on different locations
            dcedshvcsvdhsvcjscehjkshjskcnhdgsjfdhyeuir
          </p>

          <div className="flex justify-between flex-nowrap items-center mt-6">
            <div className="flex items-center gap-x-2">
              <img
                src={images.profilePicture}
                alt="post profile"
                className="h-[50px] w-auto rounded-full"
              />
              <div className="flex flex-col">
                <h4 className="font-bold italic text-custom-color3 text-sm">
                  Author
                </h4>
                <div className="flex- items-center gap-x-2"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mx-2 mt-1">
            <h3 className="text-gray-500">Published: 12 February</h3>
            <div className="flex justify-center gap-1 items-center text-gray-500">
              <MdReadMore />
              <label htmlFor="">Read More</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
