import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPost } from "../../store/posts/postSlice";
import { deletePost, getMyPosts, getSinglePost } from "../../api/postThunk";
import { selectUser } from "../../store/user/userSlice";
import { useAppDispatch } from "../../store/hooks";
import { Dialog } from "../../components/Dialog";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

const MyPosts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { myPost, loading, deleteError, deleteSuccessful } =
    useSelector(selectPost);
  const { currentUser, token } = useSelector(selectUser);
  const userId = currentUser?.user?.id;
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getMyPosts({ userId: userId, token: token }));
  }, [dispatch, userId, token]);

  const postsArray: BlogPost[] = Object.values(myPost);

  const handleDeleteAccount = (postId: string) => {
    setSelectedPostId(postId);
    setIsDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setSelectedPostId(null);
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedPostId) {
      dispatch(deletePost(selectedPostId)).then(() => {
        setIsDeleteDialogOpen(false);
        dispatch(getMyPosts({ userId: userId, token: token }))
      });
    }
  };

  const handlePostClick = (postId: string) => {
    dispatch(getSinglePost(postId));
    navigate(`/blog/${postId}`);
  };
  
  const handleEditClick = (postId: string) => {
    navigate(`/updatePost/${postId}`)
  }

  if (loading) {
    return <Loading />;
  }

  if(deleteError){
    return (
      <Error />
    )
  }

  return (
    <div className="flex flex-col gap-4 p-8 px-[10%]">
      {postsArray.map((post: BlogPost) => (
        <div
          key={post.id}
          className="bg-gray-100 p-4 rounded shadow-md flex justify-between items-start"
        >
          <div>
            <h3
              onClick={() => handlePostClick(post.id)}
              className="text-lg font-bold cursor-pointer"
            >
              {post.title}
            </h3>
            <p className="text-gray-600 mt-1">{post.description}</p>
            <p className="text-sm text-gray-500">
              Created at: {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <button 
            onClick={() => handleEditClick(post.id)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Edit
            </button>
            <button
              onClick={() => handleDeleteAccount(post.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <Dialog
        isOpen={isDeleteDialogOpen}
        message="Are you sure you want to delete this post?"
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default MyPosts;
