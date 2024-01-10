import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import Message from "./Message";

const Content = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/messages")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className=" mx-32 my-20">
      {posts.map((post) => (
        <Message
          key={post._id}
          content={post.content}
          createdAt={moment(post.createdAt).startOf("hour").fromNow()}
        />
      ))}
    </div>
  );
};

export default Content;
