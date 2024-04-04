import { useParams } from "react-router-dom";
import BlogCard from "../../components/Blog/BlogCard";
import { useAppDispatch } from "../../store/hooks";
import { useEffect } from "react";
import { getBloggerPosts } from "../../api/postThunk";
import { useSelector } from "react-redux";
import { selectPost } from "../../store/posts/postSlice";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const BloggerPosts = () => {
  const dispatch = useAppDispatch();
  const { bloggerPosts, retrieveError, loading } = useSelector(selectPost);
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
console.log(bloggerPosts)
  return (
    <div className="relative max-w-7xl mx-auto flex-1">
      {bloggerPosts.length === 0 && !loading && !retrieveError && (
        <p>This author hasn't posted anything yet or doesn't exist.</p>
      )}
      {bloggerPosts.length > 0 && <BlogCard posts={bloggerPosts} />}
    </div>
  );
};

export default BloggerPosts;
