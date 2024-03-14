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
  const blog = useSelector(selectPost).post;
  const { postId } = useParams();

  useEffect(() => {
    dispatch(getSinglePost(postId ?? ""));
  }, [dispatch, postId]);

  return (
    <div>
      {blog && blog.post && blog.post[0] && (
        <div className="container mx-auto max-w-5xl flex flex-col px-5 py-5">
          <article className="flex-1">
            <BlogPathComponent data={BlogPathComponents} />
            <div>
              <img
                className="rounded-xl w-full"
                src={blog.post[0].image}
                alt={blog.post[0].title}
              />
              <Author
                authorName={blog.user.username}
                profilePicture={blog.user.profile_picture}
                createdAt={blog.post[0].createdAt}
              />

              <h1 className="text-xl font-medium font-roboto mt-4 text-custom-color3">
                {blog.post[0].title}
              </h1>
              <div className="mt-4 text-custom-color3">
                <p>{blog.post[0].description}</p>
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};


export default BlogDetails;
