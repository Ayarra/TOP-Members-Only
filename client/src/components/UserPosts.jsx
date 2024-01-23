import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import Post from "./Post";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const { userID } = useParams();

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
    }
  };
  useEffect(() => {
    fetchUserPosts();
  }, []);

  return (
    <div className=" mx-32 my-20">
      <h1 className="text-3xl">Your Posts</h1>
      {posts.length ? (
        posts.map((post) => (
          <Post
            key={post._id}
            content={post.content}
            owner={post.owner}
            createdAt={moment(post.createdAt).startOf("hour").fromNow()}
          />
        ))
      ) : (
        <p className="text-center mt-64 text-2xl">
          There are no posts to display. Register or Login to be the first one
          to post.
        </p>
      )}
    </div>
  );
};

export default UserPosts;
