import BlogSkeleton from "../components/BlogSkeleton";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

const Blog = () => {
  // const id =  req.param("id");
  const { id } = useParams<{ id: string }>();
  const { loading, blog } = useBlog({ id: id || "" });
  // console.log(id);
  if (loading) {
    return (
      <div className="mt-36">
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
      </div>
    );
  }

  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};

export default Blog;
