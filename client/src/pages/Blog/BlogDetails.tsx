import { useParams } from "react-router-dom";
import BlogPathComponent from "../../components/Blog/BlogPathComponent";
import CommentsContainer from "../../components/Blog/CommentsForm";
import Author from "../../components/Blog/Author";
interface Tag {
  id: number;
  name: string;
}

interface BlogType {
  id: number;
  cover: string;
  title: string;
  tags: Tag[];
  authorName: string;
  profilePicture: string;
  description: string;
  createdAt: Date;
}

interface AuthorProps {
  blog: BlogType;
}

const BlogPathComponents = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Blog", link: "/blog" },
];

const BlogDetails = ({ blogs }: { blogs: BlogType[] }) => {
  const { id } = useParams<{ id: string }>();

  // Find the blog with the matching id
  const blog = blogs.find((blog) => blog.id.toString() === id);

  if (!blog) {
    return <div>Loading...</div>; // Show a loading message while the blog is being fetched
  }
  // const splitDescriptionIntoParagraphs = (description: string, charLimit: number) => {
  //   const paragraphs = [];
  //   let currentParagraph = '';
  //   let currentLength = 0;

  //   description.split(' ').forEach((word) => {
  //     if (currentLength + word.length + 1 <= charLimit) {
  //       currentParagraph += `${word} `;
  //       currentLength += word.length + 1;
  //     } else {
  //       paragraphs.push(currentParagraph.trim());
  //       currentParagraph = `${word} `;
  //       currentLength = word.length + 1;
  //     }
  //   });
  //   if (currentParagraph) {
  //     paragraphs.push(currentParagraph.trim());
  //   }

  //   return paragraphs;
  // };

  // const descriptionParagraphs = splitDescriptionIntoParagraphs(blog.description, 300);

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
            <Author blog={blog} />

            <h1 className="text-xl font-medium font-roboto mt-4 text-custom-color3">
              {blog.title}
            </h1>
            <div className="mt-4 text-custom-color3">
              <p>{blog.description}</p>
              {/* {descriptionParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))} */}
            </div>
            <CommentsContainer />
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;
