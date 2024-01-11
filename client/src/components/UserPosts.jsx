import { useEffect, useState } from "react";
import axios from "../api/axios";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const response = axios.get("/:username/posts");
  }, []);

  return (
    <div className=" mx-32 my-20">
      <h1 className="text-3xl">Your Posts</h1>
    </div>
  );
};

export default UserPosts;
