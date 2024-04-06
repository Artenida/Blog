import { Link } from "react-router-dom";
import { MdReadMore } from "react-icons/md";
import Author from "./Author";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPost } from "../../store/posts/postSlice";
import { deletePost, getMyPosts, getSinglePost } from "../../api/postThunk";
import { selectUser } from "../../store/user/userSlice";
import { useAppDispatch } from "../../store/hooks";
import { Dialog } from "./Dialog";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Tag {
  id: number;
  name: string;
}

interface Image {
  url: string;
}

interface BlogCardProps {
  posts: Paginated[] | null;
}

interface Paginated {
  id: string;
  images: Image[];
  title: string;
  tags: Tag[];
  username: string;
  profile_picture: string | undefined;
  description: string;
  createdAt: Date;
}

const BlogCard: React.FC<BlogCardProps> = ({ posts }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser, token } = useSelector(selectUser);
  const userId = currentUser?.user?.id;
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

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
        dispatch(getMyPosts({ userId: userId, token: token }));
      });
    }
  };

  const handleEditClick = (postId: string) => {
    navigate(`/updatePost/${postId}`);
  };

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full mt-12 gap-12">
      {posts &&
        posts.map((post) => (
          <div
            key={post.id}
            className="h-[580px] w-[400px] shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] p-3 transform transition-transform hover:scale-105 bg-custom-color1 rounded-xl"
          >
            <div className="rounded-xl overflow-hidden">
              {post.images && post.images.length > 0 && (
                <Link to={`/blog/${post.id}`}>
                  <img
                    src={`http://localhost:5000/${post.images[0].url.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt="blogPicture"
                    className="w-full object-cover object-center h-64"
                  />
                </Link>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex h-[20px]">
                {post.tags.map((tag) => (
                  <h3 key={tag.id} className="mr-2">
                    #{tag.name}
                  </h3>
                ))}
              </div>
              <Link to={`/blog/${post.id}`}>
                <h2 className="mt-4 mb-2 font-bold hover:text-custom-color3 text-lg">
                  {post.title.length > 30
                    ? post.title.substring(0, 30) + "..."
                    : post.title}
                </h2>
              </Link>
              <p className="h-[70px] text-custom-color3 mt-3 text-sm md:text-base lg:text-lg">
                {post.description.length > 145
                  ? post.description.substring(0, 100) + "..."
                  : post.description}
              </p>

              <Author
                authorName={post.username}
                profile_picture={post.profile_picture}
                createdAt={post.createdAt}
              />

              <div className="flex justify-end mx-2 mt-4">
                <div className="flex justify-center gap-1 items-center">
                  <Link to={`/blog/${post.id}`}>
                    <MdReadMore />
                  </Link>
                  <Link to={`/blog/${post.id}`}>
                    <label htmlFor="" className="cursor-pointer">
                      Read More
                    </label>
                  </Link>
                </div>
              </div>

              {currentUser && post.username === currentUser.user?.username && (
                <div className="flex justify-center gap-5">
                  <FaEdit
                    onClick={() => handleEditClick(post.id)}
                    className="text-custom-color3 hover:text-custom-color2 cursor-pointer"
                  />
                  <FaTrash
                    onClick={() => handleDeleteAccount(post.id)}
                    className="text-red-500 hover:text-red-200 cursor-pointer"
                  />
                </div>
              )}
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

export default BlogCard;
