import { useEffect, useState } from "react";
import { selectPost } from "../../store/posts/postSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/hooks";
import { retrieveAllAuthors } from "../../api/postThunk";
interface Authors {
  id: string;
  username: string;
  profilePicture: string | undefined;
}
const AuthorsPage = () => {
  const dispatch = useAppDispatch();
  const [authors, setAuthors] = useState<Authors[]>([]);
  const { currentAuthor } = useSelector(selectPost)

  useEffect(() => {
    dispatch(retrieveAllAuthors());
  }, [dispatch]);

  useEffect(() => {
    if(currentAuthor) {
      setAuthors(currentAuthor)
    }
  }, [currentAuthor])


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {authors.length > 0 ? (
        authors.map(({ id, profilePicture, username }) => (
          <div
            key={id}
            className="border cursor-pointer border-gray-200 rounded-md p-4 hover:border-blue-500 hover:shadow-md transition duration-300 flex flex-col items-center"
          >
            <div className="w-20 h-20 mb-2 overflow-hidden rounded-full">
              <img
                src={profilePicture}
                alt={`Image of ${name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1">{username}</h4>
              {/* <p className="text-gray-600">{posts} posts</p> */}
            </div>
          </div>
        ))
      ) : (
        <h2 className="text-xl font-semibold text-gray-800">
          No users/authors found
        </h2>
      )}
    </div>
  );
};

export default AuthorsPage;
