import Navbar from "../components/Navbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react"; // Add this import
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Navbar authorname="" />
      <div className="flex items-center flex-col w-full">
        <div className="max-w-screen-lg w-full">
          {/* <label htmlFor="large-input" className="text-lg font-semibold">
        Title
      </label> */}
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="large-input"
            className="block w-full p-4 text-gray-900 border border-gray-200 rounded-lg bg-white text-base focus:outline-none placeholder-gray-500"
            placeholder="Enter your title here"
          />
          <TextEditor
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title,
                  content,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              navigate("/blog/" + response.data.id);
            }}
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish;

function TextEditor({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <div>
        <div
          className="mt-4 focus:shadow-lg 
        border-2 w-full mb-4  border-gray-100 rounded-lg bg-white"
        >
          <div className="px-4 py-2 bg-white rounded-b-lg ">
            <textarea
              id="editor"
              rows={8}
              className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 "
              placeholder="Write an article..."
              required
              onChange={onChange} // Add this onChange handler
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
