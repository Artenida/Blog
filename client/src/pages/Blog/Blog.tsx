import Banner from "../../components/Banner";
import BlogPage from "../../components/Blog/BlogPage";
import { useState} from "react";


const Blog = () => {
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