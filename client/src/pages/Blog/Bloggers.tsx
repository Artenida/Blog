import { useEffect } from "react";
import { selectPost } from "../../store/posts/postSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/hooks";
import { retrieveAllAuthors } from "../../api/postThunk";
import AuthorsCard from "../../components/Blog/AuthorsCard";

interface Authors {
  id: string;
  username: string;
  profile_picture: string;
  bio: string;
}
const Bloggers = () => {
  const dispatch = useAppDispatch();
  const { currentAuthor } = useSelector(selectPost);

  useEffect(() => {
    dispatch(retrieveAllAuthors());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 sm:px-2 lg:px-4 gap-6 mt-12">
      <AuthorsCard authors={currentAuthor}/>
    </div>
  );
};

export default Bloggers;
