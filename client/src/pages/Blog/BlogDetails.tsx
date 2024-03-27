import { useParams } from "react-router-dom";
import BlogPathComponent from "../../components/Blog/BlogPathComponent";
import Author from "../../components/Blog/Author";
import { useAppDispatch } from "../../store/hooks";
import { useSelector } from "react-redux";
import { selectPost } from "../../store/posts/postSlice";
import { useEffect, useState } from "react";
import { getSinglePost } from "../../api/postThunk";

const BlogPathComponents = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Blog", link: "/blog" },
];

const BlogDetails = () => {
  const dispatch = useAppDispatch();
  const { post } = useSelector(selectPost);
  const { postId } = useParams();
  const currentPost = post && post?.posts[0] ? post.posts[0] : null;
  console.log(currentPost);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    dispatch(getSinglePost(postId ?? ""));
  }, [dispatch, postId]);

  const handleImageClick = (index: any) => {
    setSelectedImageIndex(index);
  };

  return (
    <div>
      {currentPost && (
        <div className="container mx-auto max-w-5xl flex flex-col px-5 py-5">
          <article className="flex-1">
            <BlogPathComponent data={BlogPathComponents} />
            <div>
              {currentPost?.images &&
                Array.isArray(currentPost.images) &&
                currentPost.images.map((image: any, index: number) => (
                  <img
                    key={index}
                    className={`rounded-xl cursor-pointer mx-2 max-h-full`}
                    src={`http://localhost:5000/${image.url.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt={`Image ${index + 1}`}
                    onClick={() => handleImageClick(index)}
                  />
                ))}

              <div className="flex mt-4">
                {currentPost.tags.map((tag: any, index: number) => (
                  <h3 key={index} className="mr-2">
                    #{tag.name}
                  </h3>
                ))}
              </div>
              <Author
                authorName={post.user.username}
                profilePicture={post.user.profile_picture}
                createdAt={currentPost.createdAt}
              />
              <h1 className="text-xl font-medium font-roboto mt-4 text-custom-color3">
                {currentPost.title}
              </h1>
              <div className="mt-4 text-custom-color3">
                <p>{currentPost.description}</p>
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
