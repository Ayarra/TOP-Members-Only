import { useContext, useState } from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";

const POSTS_POST_URL = "/messages/post";

const InsertBox = () => {
  const [expanded, setExpanded] = useState(false);
  const [textareaContent, setTextareaContent] = useState("");
  const { auth } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        POSTS_POST_URL,
        {
          content: textareaContent,
          owner: auth.user.userId,
        },
        {
          withCredentials: true,
        }
      );
      console.log(auth.user.userID);
    } catch (err) {
      console.log("error" + err);
    }
    setTextareaContent("");
  };

  return (
    <div className={`fixed right-8 bottom-8  ${expanded ? "w-1/2" : ""}`}>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="bg-purple-400 text-white px-4 py-2 rounded-full  hover:bg-purple-700 focus:outline-none focus:ring focus:border-purple-300"
      >
        {expanded ? "-" : "Write Something"}
      </button>
      <form
        onSubmit={handleSubmit}
        className={`bg-white p-4 rounded-md shadow-md ${
          expanded ? "block" : "hidden"
        }`}
      >
        {!auth.isAuthenticated ? (
          <p className="m-16 text-center text-2xl">Please register or login</p>
        ) : (
          <>
            <textarea
              className="p-2 w-full resize-none border rounded-md focus:outline-none focus:ring focus:border-purple-300"
              rows="5"
              placeholder="Type something..."
              value={textareaContent}
              onChange={(e) => setTextareaContent(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="bg-purple-400 text-white px-4 py-2 mt-2 rounded-md hover:bg-purple-800 focus:outline-none focus:ring focus:border-purple-300"
            >
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default InsertBox;
