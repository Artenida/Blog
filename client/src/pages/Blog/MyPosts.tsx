import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPost } from "../../store/posts/postSlice";
import { getMyPosts } from "../../api/postThunk";
import { selectUser } from "../../store/user/userSlice";
import { useAppDispatch } from "../../store/hooks";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import EmptyPage from "../../components/EmptyPage";
import BlogCard from "../../components/Blog/BlogCard";
import Sidebar from "../../components/Sidebar";

const MyPosts = () => {
  const dispatch = useAppDispatch();
  const { myPost, loading, deleteError } = useSelector(selectPost);
  const { currentUser, token } = useSelector(selectUser);
  const userId = currentUser?.user?.id;

  useEffect(() => {
    dispatch(getMyPosts({ userId: userId, token: token }));
  }, [dispatch, userId, token]); // Dispatch getMyPosts when userId or token changes

  useEffect(() => {
    if (!deleteError) {
      dispatch(getMyPosts({ userId: userId, token: token }));
    }
  }, [dispatch, userId, token, deleteError]); // Dispatch getMyPosts when deleteError changes

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
    <div className="flex flex-col md:flex-row -z-50">
    <Sidebar />
    <div className="border-r-4 border-opacity-50 my-12 ml-4 border-custom-color2"></div>
    <div className="flex flex-col gap-4 p-8 px-[10%]">
      <BlogCard posts={myPost}/>
    </div>
    </div>
  );
};

export default MyPosts;
