import moment from "moment";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import Message from "./Message";

const GET_POSTS_URL = "/messages";

const Content = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const response = await axios.get(GET_POSTS_URL);
      console.log("Fetching Posts: ", response);
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
        <Message
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
