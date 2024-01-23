import moment from "moment";
import { useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
import Post from "./Post";

const Content = () => {
  const [posts, setPosts] = useState([]);
  const { auth } = useContext(AuthContext);
  const fetchPosts = async () => {
    try {
      const response = await axios.get("/posts", {
        withCredentials: true,
      });
      console.log("Fetching Posts: ", response.data);
      setPosts(response.data);
    } catch (err) {
      console.log("Error fetching posts: " + err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [auth]);

  return (
    <div className=" mx-32 my-20">
      {posts.length ? (
        posts.map((post) => (
          <Post
            key={post._id}
            title={post.title}
            content={post.content}
            owner={post.owner}
            createdAt={moment(post.createdAt).fromNow()}
          />
        ))
      ) : !auth.isAuthenticated ? (
        <p className="text-center mt-64 text-2xl">
          There are no posts to display. Register or Login to be the first one
          to post.
        </p>
      ) : (
        <p className="text-center mt-64 text-2xl">Be the first one to post.</p>
      )}
    </div>
  );
};

export default Content;
