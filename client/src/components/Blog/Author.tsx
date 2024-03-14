import React from "react";

interface Tag {
  id: number;
  name: string;
}
interface BlogPost {
  id: number;
  cover: string | undefined;
  title: string;
  tags: Tag[];
  authorName: string;
  profilePicture: string | undefined;
  description: string;
  createdAt: Date;
}

interface AuthorProps {
  blog: BlogPost;
}

const Author: React.FC<AuthorProps> = ({ blog }) => {
   const createdAtDate = blog.createdAt instanceof Date ? blog.createdAt : new Date(blog.createdAt);
   const year = createdAtDate.getFullYear();
   const month = createdAtDate.getMonth() + 1; 
   const date = createdAtDate.getDate();
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
          {year + "/" + month + "/" + date}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Author;