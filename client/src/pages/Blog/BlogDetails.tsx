import { useParams } from "react-router-dom";
import BlogPathComponent from "../../components/Blog/BlogPathComponent";
import Author from "../../components/Blog/Author";
import { useAppDispatch } from "../../store/hooks";
import { useSelector } from "react-redux";
import { selectPost } from "../../store/posts/postSlice";
import { useEffect } from "react";
import { getSinglePost } from "../../api/postThunk";

const BlogPathComponents = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Blog", link: "/blog" },
];

const BlogDetails = () => {
  const dispatch = useAppDispatch();
  const { post } = useSelector(selectPost);
  const { postId } = useParams();
  const currentPost = post && post?.posts[0]? post?.posts[0] : null
 
  useEffect(() => {
    dispatch(getSinglePost(postId ?? ""));
  }, [dispatch, postId]);
  
  return (
    <div>
      {currentPost && (
        <div className="container mx-auto max-w-5xl flex flex-col px-5 py-5">
          <article className="flex-1">
            <BlogPathComponent data={BlogPathComponents} />
            <div>
              <img
                className="rounded-xl w-full"
                src={currentPost.image}
                alt={currentPost.title}
              />
              <div className="flex mt-4">
                {currentPost.tags.map((tag) => (
                  <h3 className="mr-2">
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
