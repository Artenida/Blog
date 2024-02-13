import Banner from "../../components/Banner";
import BlogPage from "../../components/Blog/BlogPage";
import {data} from "../../config/data";
import { useState} from "react";


const Blog = () => {
    const [blogs, setBlogs] = useState(data);

    return (
        <div>
            {/* Banner */}
            <Banner />
            
            {/* Blog Page */}
            <BlogPage/>
        </div>
    )
}

export default Blog;