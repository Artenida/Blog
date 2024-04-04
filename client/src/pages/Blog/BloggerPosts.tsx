import { useParams } from "react-router-dom"
import BlogCard from "../../components/Blog/BlogCard"
import { useAppDispatch } from "../../store/hooks"
import { useEffect } from "react";
import { getBloggerPosts } from "../../api/postThunk";
import { useSelector } from "react-redux";
import { selectPost } from "../../store/posts/postSlice";

const BloggerPosts = () => {
    const dispatch = useAppDispatch();
    const { bloggerPosts, retrieveError, loading} = useSelector(selectPost);
    const {userId} = useParams();

    console.log(bloggerPosts);
    
    useEffect (()=> {
        dispatch(getBloggerPosts(userId));
    }, [dispatch, userId])

    return (
        <div>
            <BlogCard posts={bloggerPosts}/>
        </div>
    )
}

export default BloggerPosts