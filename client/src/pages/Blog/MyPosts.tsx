import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPost } from "../../store/posts/postSlice";
import { getMyPosts } from "../../api/postThunk";
import { useParams } from "react-router-dom";
import { selectUser } from "../../store/user/userSlice";
import { useAppDispatch } from "../../store/hooks";

interface BlogPost {
  id: string; // Change type to string since BlogPost id is string in the new state structure
  title: string;
  description: string;
  createdAt: string;
}

const MyPosts = () => {
  const dispatch = useAppDispatch();
  const { myPost, loading, retrieveError } = useSelector(selectPost);
  const { currentUser, token } = useSelector(selectUser);
  const userId = currentUser?.user?.id;
  console.log(userId)
  console.log(myPost, 'myPost')

  useEffect(() => {
    dispatch(getMyPosts({userId: userId,token: token}));
  }, [dispatch, userId, token]); // Add token to dependencies array

  // Convert myPost object into an array of posts
  const postsArray: BlogPost[] = Object.values(myPost);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (retrieveError) {
    return <div>Error: {retrieveError}</div>;
  }

  return (
    <div>
      {postsArray.map((post: BlogPost) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <p>Created at: {new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
