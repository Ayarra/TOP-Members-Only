import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Post = ({ title, content, owner, createdAt }) => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="border  my-5 p-6 border-purple-400 rounded-lg">
      <div className=" flex justify-between mb-4">
        <div>
          <h1 className="text-2xl">
            {title}{" "}
            <span className="text-sm text-purple-500">
              {auth.isAuthenticated ? owner?.username : "Anon User"}
            </span>
          </h1>
          <p className="text-xs text-slate-500">{createdAt}</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-purple-400 text-white p-2 focus:outline-none hover:bg-purple-600 rounded-md">
            i
          </button>
          <button className="bg-red-400 text-white p-2 focus:outline-none hover:bg-red-600 rounded-md">
            x
          </button>
        </div>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default Post;
