import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import Post from "./Post";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userID } = useParams();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`/users/${userID}`, {
          withCredentials: true,
          params: {
            userID: userID,
          },
        });
        console.log("Fetching Posts: ", response);
        setPosts(response.data.posts);
      } catch (err) {
        console.log("Error fetching posts: " + err);
        setError("Error fetching posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userID]);

  if (loading) {
    return <p className="text-center mt-64 text-2xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-64 text-2xl">{error}</p>;
  }

  return (
    <div className=" mx-32 my-20">
      <h1 className="text-3xl">Your Posts</h1>
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
      ) : (
        <p className="text-center mt-64 text-2xl">
          There are no posts to display. Make your first post.
        </p>
      )}
    </div>
  );
};

export default UserPosts;
