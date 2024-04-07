import { useParams } from "react-router-dom";
import BlogPathComponent from "../../components/Blog/BlogPathComponent";
import Author from "../../components/Blog/Author";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPost } from "../../store/posts/postSlice";
import { useEffect } from "react";
import { getSinglePost } from "../../api/postThunk";
import Error from "../../components/Blog/Error";
import Loading from "../../components/Blog/Loading";
import DisplayImages from "../../components/Blog/DisplayImages";

const BlogPathComponents = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Blog", link: "/blog" },
];

const BlogDetails = () => {
  const dispatch = useAppDispatch();
  const { postDetails, retrieveError, loading } = useAppSelector(selectPost);
  const { postId } = useParams();

  useEffect(() => {
    dispatch(getSinglePost(postId ?? ""));
  }, [dispatch, postId]);

  if (loading) {
    return <Loading />;
  }

  if (retrieveError) {
    return (
      <Error
        message1={"404"}
        message2={"Oooops"!}
        message3={"Page Not Found"}
        message4={"This page doesn't exist or was removed"}
        message5={"We suggest you go back to home!"}
      />
    );
  }

  return (
    <div>
      {postDetails && (
        <div className="container mx-auto max-w-5xl flex flex-col px-5 py-5">
          <article className="flex-1">
            <BlogPathComponent data={BlogPathComponents} />
            <div>
              <DisplayImages posts={postDetails} />

              <div className="flex mt-4">
                {postDetails[0]?.tags.map((tag: any) => (
                  <h3 key={tag.id} className="mr-2">
                    #{tag.name}
                  </h3>
                ))}
              </div>
              <Author
                authorName={postDetails[0]?.username}
                profile_picture={postDetails[0]?.profile_picture}
                createdAt={postDetails[0]?.createdAt}
              />
              <h1 className="text-xl font-medium font-roboto mt-4 text-custom-color3">
                {postDetails[0]?.title}
              </h1>
              <div className="mt-4 text-custom-color3">
                <p>{postDetails[0]?.description}</p>
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
