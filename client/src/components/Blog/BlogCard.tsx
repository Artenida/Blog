import React from "react";
import { Link } from "react-router-dom";
import { MdReadMore } from "react-icons/md";
import Author from "./Author";

interface BlogType {
  id: number;
  cover: string;
  title: string;
  tags: Tag[];
  authorName: string;
  profilePicture: string;
  description: string;
  createdAt: Date;
}

interface Tag {
  id: number;
  name: string;
}

interface BlogCardProps {
  blogs: BlogType[];
}

const BlogCard: React.FC<BlogCardProps> = ({ blogs }) => {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full mt-12 gap-12">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] p-3 transform transition-transform hover:scale-105 bg-custom-color1 rounded-xl"
        >
          <div className="rounded-xl overflow-hidden">
            <Link to={`/blog/${blog.id}`}>
              <img
                src={blog.cover}
                alt="blogPicture"
                className="w-full object-cover object-center h-64"
              />
            </Link>
          </div>
          <div className="flex flex-col">
            <h3 className="mt-4 mb-2 text-custom-color3 text-sm">
              {blog.tags.map((tag) => "#" + tag.name + " ")}
            </h3>
            <Link to={`/blog/${blog.id}`}>
              <h2 className="mt-4 mb-2 font-bold hover:text-custom-color3 text-lg">
                {blog.title.length > 30
                  ? blog.title.substring(0, 30) + "..."
                  : blog.title}
              </h2>
            </Link>
            <p className="text-custom-color3 mt-3 text-sm md:text-base lg:text-lg">
              {blog.description.length > 145
                ? blog.description.substring(0, 100) + "..."
                : blog.description}
            </p>

            <Author blog={blog} />

            <div className="flex justify-end mx-2 mt-1">
              <div className="flex justify-center gap-1 items-center">
                <Link to={`/blog/${blog.id}`}>
                  <MdReadMore />
                </Link>
                <Link to={`/blog/${blog.id}`}>
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
};

export default BlogCard;
