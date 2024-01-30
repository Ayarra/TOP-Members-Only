import { useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
import Post from "./Post";

const Content = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setnumberOfPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useContext(AuthContext);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/posts?page=${pageNumber}`, {
          withCredentials: true,
        });
        setPosts(response.data.allPosts);
        console.log(response.data.allPosts, pageNumber);
        setnumberOfPages(response.data.totalPages);
      } catch (err) {
        setError("Error fetching posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [auth, pageNumber]);

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

      <nav className="flex justify-center mt-4">
        <button
          onClick={gotoPrevious}
          className="px-4 py-2 rounded-md text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          disabled={pageNumber === 0}
        >
          Previous
        </button>
        {pages.map((pageIndex) => (
          <button
            key={pageIndex}
            className={`mx-2 px-4 py-2 rounded-md text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
              pageNumber === pageIndex ? "bg-purple-700" : ""
            }`}
            onClick={() => setPageNumber(pageIndex)}
          >
            {pageIndex + 1}
          </button>
        ))}
        <button
          onClick={gotoNext}
          className="px-4 py-2 rounded-md text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          disabled={pageNumber === numberOfPages - 1}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Content;
