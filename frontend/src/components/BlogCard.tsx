import { Link } from "react-router-dom";

interface BlogCardProps {
  authorname: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

const BlogCard = ({
  authorname,
  content,
  publishedDate,
  title,
  id,
}: BlogCardProps) => {
  return (
    <div className=" pl-3 border-gray-100    shadow-sm mb-4 hover:cursor-pointer hover:shadow-md transition duration-500 rounded-lg pr-6 display-inline w-full">
      <Link to={`/blog/${id}`}>
        <span className="pr-2">
          <Avatar size={"small"} authorname={authorname} />
        </span>
        <span className="font-light text-sm">
          <span className="font-semibold">{authorname}</span> • {publishedDate}
        </span>
        <div className="title&content pl-6 py-4 flex  flex-col">
          <div className="font-semibold text-xl">{title} </div>
          <div className="font-thin">{content.slice(0, 150) + " ..."}</div>
        </div>
        <div className="text-sm font-normal text-gray-400 p-4 pt-0">
          {Math.ceil(content.length / 300)} minute(s) read
        </div>{" "}
      </Link>
    </div>
  );
};

export default BlogCard;

export function Avatar({
  authorname,
  size = "small",
}: {
  authorname: string;
  size?: "small" | "big";
}) {
  const getInitials = (name: string) => {
    return name
      .trim() // Remove leading and trailing spaces
      .split(" ")
      .map((word) => word[0]?.toUpperCase() || ":)") // Safely access the first character and convert to uppercase
      .join("");
  };

  return (
    <div
      className={`relative inline-flex text-sm items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${
        size === "big" ? "w-8 h-8" : "w-6 h-6"
      }`}
      //   style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-md"
        }  font-medium text-gray-600 dark:text-gray-300`}
      >
        {getInitials(authorname)}
      </span>
    </div>
  );
}
