import { useState } from "react";
import profile from "../assets/posts/profile2.png";
import { Link } from "react-router-dom";

const AuthorsData = [
  {
    id: 1,
    profile: profile,
    name: "Ernest",
    posts: 3,
  },
  {
    id: 2,
    profile: profile,
    name: "Jane",
    posts: 3,
  },
  {
    id: 3,
    profile: profile,
    name: "Nana",
    posts: 3,
  },
];

const AuthorsPage = () => {
    const [authors, setAuthors] = useState(AuthorsData);
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {authors.length > 0 ? (
                authors.map(({ id, profile, name, posts }) => (
                    <Link key={id} to={`/blogs/authors/${id}`} className="border border-gray-200 rounded-md p-4 hover:border-blue-500 hover:shadow-md transition duration-300 flex flex-col items-center">
                        <div className="w-20 h-20 mb-2 overflow-hidden rounded-full">
                            <img src={profile} alt={`Image of ${name}`} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-1">{name}</h4>
                            <p className="text-gray-600">{posts} posts</p>
                        </div>
                    </Link>
                ))
            ) : (
                <h2 className="text-xl font-semibold text-gray-800">No users/authors found</h2>
            )}
        </div>
    );
};



export default AuthorsPage