import { Pagination } from "swiper/modules";
import PaginationButtons from "../components/pagination/PaginationButtons";
import BlogCard from "../components/BlogCard";
import { useState } from "react";
import Banner from "../components/Banner";

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    
    return (
        <div>
            {/* Banner */}
            <Banner />
            
            {/* Tags  */}
            <div>Page Tags</div>

            {/* Blog cards section */}
            <div className="max-w-7xl mx-auto">
                <BlogCard blogs={blogs}/>
            </div>

            {/* Pagination section */}
            <PaginationButtons />
        </div>
    )
}

export default BlogPage;