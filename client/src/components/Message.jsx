import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Message = ({ content, createdAt, owner }) => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="border  my-5 p-6 border-purple-400 rounded-lg">
      <div className="flex justify-between">
        <p className="text-purple-500 text-xl mb-3">
          {auth.isAuthenticated ? owner.username : "Anon User"}
        </p>
        <p className="text-xs text-slate-500">{createdAt}</p>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default Message;
