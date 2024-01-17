import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

const USERNAME_POSTS_URL = "/posts";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const { username } = useParams();

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`/users/${username}/posts`, {
        params: {
          username: username,
        },
      });
      console.log("Fetching Posts: ", response);
      setPosts(response.data);
    } catch (err) {
      console.log("Error fetching posts: " + err);
    }
  };
  useEffect(() => {
    fetchUserPosts();
  }, []);

  return (
    <div className=" mx-32 my-20">
      <h1 className="text-3xl">Your Posts</h1>
    </div>
  );
};

export default UserPosts;
