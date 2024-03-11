import React from "react";

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

interface AuthorProps {
  blog: BlogType;
}

const Author: React.FC<AuthorProps> = ({ blog }) => {
  return (
    <div className="flex justify-between flex-nowrap items-center mt-6">
      <div className="flex items-center gap-x-2">
        <img
          src={blog.profilePicture}
          alt="post profile"
          className="h-[50px] w-[50px] rounded-full"
        />
        <div className="flex flex-col gap-1">
          <h4 className="font-bold italic text-custom-color3 text-sm">
            {blog.authorName}
          </h4>
          <h3 className="text-gray-500 text-sm">
            {blog.createdAt.getFullYear() +
              "/" +
              blog.createdAt.getMonth() +
              "/" +
              blog.createdAt.getDate()}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Author;
