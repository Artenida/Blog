import React from "react";
import { Link } from "react-router-dom";
import { MdReadMore } from "react-icons/md";
import Author from "./Author";

interface Tag {
  id: number;
  name: string;
}

interface Image {
  url: string;
}

interface BlogPost {
  id: string;
  images: Image[]; 
  title: string;
  tags: Tag[];
  username: string;
  profilePicture: string | undefined;
  description: string;
  createdAt: Date;
}

interface BlogCardProps {
  posts: BlogPost[];
}

const BlogCard: React.FC<BlogCardProps> = ({ posts }) => {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full mt-12 gap-12">
      {posts &&
        posts.map((post) => (
          <div
            key={post.id}
            className="shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] p-3 transform transition-transform hover:scale-105 bg-custom-color1 rounded-xl"
          >
            <div className="rounded-xl overflow-hidden">
              {post.images && post.images.length > 0 && ( 
                <Link to={`/blog/${post.id}`}>
                  <img
                    src={`http://localhost:5000/${post.images[0].url.replace(/\\/g, "/")}`}
                    alt="blogPicture"
                    className="w-full object-cover object-center h-64"
                  />
                </Link>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex">
                {post.tags.map((tag) => (
                  <h3 key={tag.id} className="mr-2">
                    #{tag.name}
                  </h3>
                ))}
              </div>
              <Link to={`/blog/${post.id}`}>
                <h2 className="mt-4 mb-2 font-bold hover:text-custom-color3 text-lg">
                  {post.title.length > 30
                    ? post.title.substring(0, 30) + "..."
                    : post.title}
                </h2>
              </Link>
              <p className="text-custom-color3 mt-3 text-sm md:text-base lg:text-lg">
                {post.description.length > 145
                  ? post.description.substring(0, 100) + "..."
                  : post.description}
              </p>

              <Author
                authorName={post.username}
                profilePicture={post.profilePicture}
                createdAt={post.createdAt}
              />

              <div className="flex justify-end mx-2 mt-1">
                <div className="flex justify-center gap-1 items-center">
                  <Link to={`/blog/${post.id}`}>
                    <MdReadMore />
                  </Link>
                  <Link to={`/blog/${post.id}`}>
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
