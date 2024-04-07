import { useParams } from "react-router-dom";
import BlogCard from "../../components/Blog/BlogCard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { getBloggerPosts } from "../../api/postThunk";
import { useSelector } from "react-redux";
import { selectPost } from "../../store/posts/postSlice";
import Loading from "../../components/Blog/Loading";
import Error from "../../components/Blog/Error";

const BloggerPosts = () => {
  const dispatch = useAppDispatch();
  const { bloggerPosts, retrieveError, loading } = useAppSelector(selectPost);
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getBloggerPosts(userId));
  }, [dispatch, userId]);

  if (loading) {
    return <Loading />;
  }

  if (retrieveError) {
    return <Error />;
  }

  return (
    <div>
      {bloggerPosts.length === 0 && !loading && !retrieveError && (
        <Error
          message1={"404"}
          message2={"Oooops!"}
          message3={
            "This user isn't a blogger or he hasn't posted anything yet!"
          }
        />
      )}
      <div className="relative max-w-7xl mx-auto flex-1">
        {bloggerPosts.length > 0 && <BlogCard posts={bloggerPosts} />}
      </div>
    </div>
  );
};

export default BloggerPosts;
