import React from "react";
import moment from "moment";

interface AuthorProps {
  authorName: string;
  profile_picture: string | undefined;
  createdAt: Date;
}

const Author: React.FC<AuthorProps> = ({
  authorName,
  profile_picture,
  createdAt,
}) => {
  const formattedRelativeTime = moment(createdAt).fromNow();
  // const formattedDate = moment(createdAt).format("MMMM Do YYYY");
  const imagePath = profile_picture ? profile_picture.replace(/\\/g, "/") : "";

  return (
    <div className="flex justify-between flex-nowrap items-center mt-6">
      <div className="flex items-center gap-x-2">
        <img
          src={`http://localhost:5000/${imagePath.replace(/\\/g, "/")}`}
          alt="post profile"
          className="h-[50px] w-[50px] rounded-full"
        />
        <div className="flex flex-col gap-1">
          <h4 className="font-bold italic text-custom-color3 text-sm">
            {authorName}
          </h4>
          <h3 className="text-gray-500 text-sm">{formattedRelativeTime}</h3>
        </div>
      </div>
    </div>
  );
};

export default Author;
