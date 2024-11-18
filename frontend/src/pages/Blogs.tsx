import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { blogs, loading } = useBlogs();

  if (loading) {
    return <div>getting your blogs ...</div>;
  }
  if (!blogs) {
    return <div>No blogs available</div>;
  }
  return (
    <div className="">
      <Navbar authorname="Dhruv Sovasaria" />
      <div className="flex justify-center">
        <div className="flex flex-col items-center w-full max-w-3xl px-2">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              title={blog.title}
              content={blog.content}
              publishedDate="04/08/2004"
              authorname={blog.author.name || "Anonymous"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
