import React from "react";
interface AuthorProps {
  authorName: string;
  profilePicture: string | undefined;
  createdAt: Date | undefined;
}

const Author: React.FC<AuthorProps> = ({ authorName, profilePicture, createdAt }) => {
  // const createdAtDate = createdAt instanceof Date ? createdAt : new Date(createdAt);
  //  const year = createdAtDate.getFullYear();
  //  const month = createdAtDate.getMonth() + 1; 
  //  const date = createdAtDate.getDate();
  return (
    <div className="flex justify-between flex-nowrap items-center mt-6">
      <div className="flex items-center gap-x-2">
        <img
          src={profilePicture}
          alt="post profile"
          className="h-[50px] w-[50px] rounded-full"
        />
        <div className="flex flex-col gap-1">
          <h4 className="font-bold italic text-custom-color3 text-sm">
            {authorName}
          </h4>
          {/* <h3 className="text-gray-500 text-sm">
          {year + "/" + month + "/" + date}
          </h3> */}
        </div>
      </div>
    </div>
  );
};

export default Author;