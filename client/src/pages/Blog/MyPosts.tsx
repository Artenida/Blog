import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPost } from "../../store/posts/postSlice";
import { getMyPosts } from "../../api/postThunk";
import { selectUser } from "../../store/user/userSlice";
import { useAppDispatch } from "../../store/hooks";
import Loading from "../../components/Blog/Loading";
import Error from "../../components/Blog/Error";
import EmptyPage from "../../components/Blog/EmptyPage";
import BlogCard from "../../components/Blog/BlogCard";
import Sidebar from "../../components/Sidebar";

const MyPosts = () => {
  const dispatch = useAppDispatch();
  const { myPost, loading, deleteError } = useSelector(selectPost);
  const { currentUser, token } = useSelector(selectUser);
  const userId = currentUser?.user?.id;

  useEffect(() => {
    dispatch(getMyPosts({ userId: userId, token: token }));
  }, [dispatch, userId, token]); 

  useEffect(() => {
    if (!deleteError) {
      dispatch(getMyPosts({ userId: userId, token: token }));
    }
  }, [dispatch, userId, token, deleteError]);

  if (loading) {
    return <Loading />;
  }

  if (deleteError) {
    return <Error />;
  }

  if (myPost.length === 0) {
    return <EmptyPage />;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="border-r-4 border-opacity-50 my-12 ml-4 border-custom-color2 h-[900px]"></div>
      <div className="flex flex-col flex-grow">
        <div className="px-12">
          <BlogCard posts={myPost}/>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
