import React from "react";
import { Link } from "react-router-dom";

interface Author {
  id: string;
  username: string;
  profile_picture: string;
  bio: string;
}

interface AuthorsProp {
  authors: Author[];
}

const AuthorsCard: React.FC<AuthorsProp> = ({ authors }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {authors.length > 0 ? (
        authors.map((author) => (
          <Link to={`/bloggers/${author.id}`}>
          <div
            key={author.id}
            className="border cursor-pointer border-gray-200 rounded-md p-2 hover:border-blue-500 hover:shadow-md transition duration-300 flex flex-col items-center mt-3"
          >
            <div className="w-12 h-12 overflow-hidden rounded-full">
              {author.profile_picture && (
                <img
                  src={`http://localhost:5000/${author.profile_picture.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt={`Image of ${author.username}`}
                />
              )}
            </div>
            <div>
              <h4 className="text-md font-semibold mt-1">{author.username}</h4>  {/* Use author.username */}
            </div>
            <div>
              <h6 className="text-sm mt-1">{author.bio}</h6>  {/* Use author.bio */}
            </div>
          </div>
          </Link>
        ))
      ) : (
        <h2 className="text-xl font-semibold text-gray-800">
          No users/authors found
        </h2>
      )}
    </div>
  );
};

export default AuthorsCard;
