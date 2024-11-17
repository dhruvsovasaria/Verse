import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { blogs, loading } = useBlogs();

  if (loading) {
    return <div>loading ...</div>;
  }
  return (
    <div className="">
      <Navbar authorname="Dhruv Sovasaria" />
      <div className="flex justify-center">
        <div className="flex flex-col items-center w-full max-w-3xl px-2">
          <BlogCard
            title="Himani weds Jeet"
            content="Meri aur Jeet ki shadi hone wali hai. Mai decent parivar se hu, par mai Jeet ke alawa kisi ko pyar nahi karti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            publishedDate="04/08/2004"
            authorname="Himani Jain"
          />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
