import { useParams } from "react-router-dom";
import BlogCard from "../../components/Blog/BlogCard";
import { useAppDispatch } from "../../store/hooks";
import { useEffect } from "react";
import { getBloggerPosts } from "../../api/postThunk";
import { useSelector } from "react-redux";
import { selectPost } from "../../store/posts/postSlice";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Empty from "../../components/Empty";

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

  return (
    <div>
      {bloggerPosts.length === 0 && !loading && !retrieveError && <Empty />}
      <div className="relative max-w-7xl mx-auto flex-1 h-screen">
        {bloggerPosts.length > 0 && <BlogCard posts={bloggerPosts} />}
      </div>
    </div>
  );
};

export default BloggerPosts;
