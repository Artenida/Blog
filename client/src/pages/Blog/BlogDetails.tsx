import { useParams } from "react-router-dom";
import BlogPathComponent from "../../components/Blog/BlogPathComponent";
import Author from "../../components/Blog/Author";
interface Tag {
  id: number;
  name: string;
}
interface BlogPost {
  id: number;
  cover: string | undefined;
  title: string;
  tags: Tag[];
  authorName: string;
  profilePicture: string | undefined;
  description: string;
  createdAt: Date;
}

interface AuthorProps {
  blog: BlogPost;
}

const BlogPathComponents = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Blog", link: "/blog" },
];

const BlogDetails = ({ blogs }: { blogs: BlogPost[] }) => {
  const { id } = useParams<{ id: string }>();

  const blog = blogs.find((blog) => blog.id.toString() === id);

  if (!blog) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <div className="container mx-auto max-w-5xl flex flex-col px-5 py-5">
        <article className="flex-1">
          <BlogPathComponent data={BlogPathComponents} />
          <div>
            <img
              className="rounded-xl w-full"
              src={blog.cover}
              alt={blog.title}
            />
              <Author authorName={blog.authorName} profilePicture={blog.profilePicture} createdAt={blog.createdAt} />

            <h1 className="text-xl font-medium font-roboto mt-4 text-custom-color3">
              {blog.title}
            </h1>
            <div className="mt-4 text-custom-color3">
              <p>{blog.description}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;
