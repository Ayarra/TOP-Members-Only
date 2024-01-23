import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Post = ({ content, createdAt, owner }) => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="border  my-5 p-6 border-purple-400 rounded-lg">
      <div className=" flex justify-end gap-4 mb-4">
        <button className="bg-purple-400 text-white p-2 focus:outline-none hover:bg-purple-600 rounded-md">
          i
        </button>
        <button className="bg-red-400 text-white p-2 focus:outline-none hover:bg-red-600 rounded-md">
          x
        </button>
      </div>
      <div className="flex justify-between">
        <p className="text-purple-500 text-xl mb-3">
          {auth.isAuthenticated ? owner?.username : "Anon User"}
        </p>
        <p className="text-xs text-slate-500">{createdAt}</p>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default Post;
