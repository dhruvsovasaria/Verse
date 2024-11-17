interface BlogCardProps {
  authorname: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogCard = ({
  authorname,
  content,
  publishedDate,
  title,
}: BlogCardProps) => {
  return (
    <div className=" pl-3 border-gray-100  shadow-sm mb-4 hover:cursor-pointer hover:shadow-md transition duration-500 rounded-lg pr-6 display-inline ">
      <span className="pr-2">
        <Avatar authorname={authorname} />
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
      </div>
    </div>
  );
};

export default BlogCard;

function Avatar({ authorname }: { authorname: string }) {
  const getInitials = (name: string) => {
    return (
      name
        .split(" ")
        //capitalise the letter and then join
        .map((word) => word[0].toUpperCase())
        .join("")
    );
  };

  return (
    <div className="relative inline-flex text-sm items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
        {getInitials(authorname)}
      </span>
    </div>
  );
}
