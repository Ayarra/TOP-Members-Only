import moment from "moment";
import { useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
import Post from "./Post";

const Content = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      setError("Error fetching posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [auth]);

  if (loading) {
    return <p className="text-center mt-64 text-2xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-64 text-2xl">{error}</p>;
  }

  return (
    <div className=" mx-32 my-20">
      {posts.length ? (
        posts.map((post) => (
          <Post
            key={post._id}
            postID={post._id}
            title={post.title}
            content={post.content}
            owner={post.owner}
            createdAt={post.createdAt}
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
