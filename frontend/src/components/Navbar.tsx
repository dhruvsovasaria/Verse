import { Avatar } from "./BlogCard";
// import { getInitials } from "./BlogCard/getInitials";
const Navbar = ({ authorname }: { authorname: string }) => {
  return (
    <>
      <div className="flex border-b  items-center justify-between px-6 py-4 mb-10">
        <span className="text-2xl font-bold">meDum</span>
        <div>
          <Avatar size={"big"} authorname={authorname} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
