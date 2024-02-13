import { Link } from "react-router-dom";

interface BlogDetailsItem {
  id: number;
  name: string;
  link: string;
}

interface BlogDetailsComponentsProps {
  data: BlogDetailsItem[];
}

const BlogPathComponent = ({ data }: BlogDetailsComponentsProps) => {
  return (
    <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
      {data.map((item, index) => (
        <div className="text-custom-color3 opacity-50 text-md" key={index}>
          <Link to={item.link}>{item.name}</Link>
          {index !== data.length - 1 && <span className="px-3">/</span>}
        </div>
      ))}
    </div>
  );
};

export default BlogPathComponent;
