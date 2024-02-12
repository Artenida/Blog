import PaginationButtons from "../components/pagination/PaginationButtons";
import laptop from "../assets/about.jpg";
import blogImg from "../assets/carousel2.jpg";
import { useEffect, useState } from "react";
import Banner from '../components/Banner'

const Blog = () => { 
    return (
        <div>
            <Banner />
            <PaginationButtons />
        </div>

     );
}

export default Blog;