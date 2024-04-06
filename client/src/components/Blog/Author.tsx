import React from "react";
import moment from "moment";
import profile from "../../assets/userProfile.jpg"
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
  const formattedDate = moment(createdAt).format("MMMM Do YYYY");
  const imagePath = profile_picture ? profile_picture.replace(/\\/g, "/") : "";

  return (
    <div className="flex justify-between flex-nowrap items-center mt-6">
      <div className="flex items-center gap-x-2">
        {profile_picture ?
        <img
          src={`http://localhost:5000/${imagePath.replace(/\\/g, "/")}`}
          alt="post profile"
          className="h-[50px] w-[50px] rounded-full"
        /> : <img src={profile} alt="Profile" className="h-[50px] w-[50px] rounded-full"/>
}
        <div className="flex flex-col gap-1">
          <h4 className="font-bold italic text-custom-color3 text-sm">
            {authorName}
          </h4>
          <h3 className="text-gray-500 text-sm">{formattedDate}</h3>
        </div>
      </div>
    </div>
  );
};

export default Author;
