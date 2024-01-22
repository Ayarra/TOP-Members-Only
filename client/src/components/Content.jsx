import moment from "moment";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import Post from "./Post";

const Content = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const response = await axios.get("/posts");
      console.log("Fetching Posts: ", response.data);
      setPosts(response.data);
    } catch (err) {
      console.log("Error fetching posts: " + err);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className=" mx-32 my-20">
      {posts.map((post) => (
        <Post
          key={post._id}
          content={post.content}
          owner={post.owner}
          createdAt={moment(post.createdAt).startOf("hour").fromNow()}
        />
      ))}
    </div>
  );
};

export default Content;
