import Navbar from "./Navbar";
import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";
export const FullBlog = ({ blog }: { blog: Blog | null }) => {
  return (
    <div>
      <Navbar authorname={blog?.author.name || ": )"} />
      <div className="flex justify-center">
        <div className="w-3/5 grid grid-cols-12 gap-3 hover:border-gray-50 hover:border-2 duration-700">
          <div className="col-span-8 ">
            <div className="font-bold text-5xl">
              {blog?.title ? (
                blog.title
              ) : (
                <div className="flex flex-col">
                  <div>Page Not Found</div>
                  <div className="text-9xl">404</div>
                </div>
              )}
            </div>
            <div className="date text-slate-500 font-semibold pt-2">
              {"2nd Dec ,2004"}
            </div>
            <div className="content pt-10">{blog?.content || " "}</div>
          </div>
          <div className=" col-span-4 AUTHOR">
            <div className="text-sm text-gray-500 font-semibold">Author</div>
            <div className="flex">
              <div className="pt-4 pr-4 self-top ">
                <Avatar size={"big"} authorname={blog?.author.name || ""} />
              </div>
              <div className="">
                <div className="text-2xl font-bold">
                  {blog?.author.name?.toUpperCase() || "Anonymous"}
                </div>
                <div className="text-slate-500 pt-2">
                  some fucking things about the author Lorem ipsum dolor sit
                  amet, consect
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
