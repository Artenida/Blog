import React from "react";
import { Link } from "react-router-dom";
import { MdReadMore } from "react-icons/md";

interface Tag {
  id: number;
  name: string;
}
interface BlogType {
  blogs: {
    id: number;
    cover: string;
    title: string;
    tags: Tag[];
    authorName: string;
    profilePicture: string;
    description: string;
    createdAt: Date;
  }[];
}

// interface BlogCardProps {
//   blogs: Blog[];
// }

function BlogCard({ blogs }: BlogType) {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full mt-12 gap-12">
      {blogs.map((item) => (
        <div
          key={item.id}
          className="shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] p-3 transform transition-transform hover:scale-105 bg-custom-color1 rounded-xl"
        >
          <div className="rounded-xl overflow-hidden">
            <Link to={`/blog/${item.id}`}>
              <img
                src={item.cover}
                alt="blogPicture"
                className="w-full object-cover object-center h-64"
              />
            </Link>
          </div>
          <div className="flex flex-col">
            <h3 className="mt-4 mb-2 text-custom-color3 text-sm">
              {item.tags.map((tag) => "#" + tag.name + " ")}
            </h3>
            <Link to={`/blog/${item.id}`}>
              <h2 className="mt-4 mb-2 font-bold hover:text-custom-color3 text-lg">
                {item.title.length > 30
                  ? item.title.substring(0, 30) + "..."
                  : item.title}
              </h2>
            </Link>
            <p className="text-custom-color3 mt-3 text-sm md:text-base lg:text-lg">
              {item.description.length > 145
                ? item.description.substring(0, 145) + "..."
                : item.description}
            </p>
            <div className="flex justify-between flex-nowrap items-center mt-6">
              <div className="flex items-center gap-x-2">
                <img
                  src={item.profilePicture}
                  alt="post profile"
                  className="h-[50px] w-[50px] rounded-full"
                />
                <div className="flex flex-col">
                  <h4 className="font-bold italic text-custom-color3 text-sm">
                    {item.authorName}
                  </h4>
                  <div className="flex- items-center gap-x-2"></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mx-2 mt-1">
              {/* <h3 className="text-gray-500">{item.createdAt}</h3> */}
              <h3 className="text-gray-500">
                {item.createdAt.getFullYear() +
                  "/" +
                  item.createdAt.getMonth() +
                  "/" +
                  item.createdAt.getDate()}
              </h3>
              <div className="flex justify-center gap-1 items-center">
                <Link to={`/blog/${item.id}`}>
                  <MdReadMore />
                </Link>
                <Link to={`/blog/${item.id}`}>
                  <label htmlFor="" className="cursor-pointer">
                    Read More
                  </label>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogCard;
