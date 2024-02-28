import moment from "moment";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";

const Post = ({ title, content, owner, createdAt, postID }) => {
  const { auth } = useContext(AuthContext);
  const [deleted, setDeleted] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(content);
  const [editMode, setEditMode] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAdmin = auth.isAuthenticated && auth.user.isAdmin;
  const isUserPost = auth.isAuthenticated && owner === auth.user.userID;

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await axios.delete(`/posts/${postID}`, {
        withCredentials: true,
      });
      setDeleted(true);
    } catch (error) {
      console.error("Error deleting post: ", error);
      setError("Error deleting post. Please try again later.");
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setUpdateLoading(true);
      await axios.put(
        `/posts/${postID}`,
        { newContent: updatedContent },
        { withCredentials: true }
      );

      setEditMode(false);
    } catch (error) {
      console.error("Error updating post: ", error);
      setError("Error updating post. Please try again later.");
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setUpdatedContent(content);
    setEditMode(false);
  };

  if (deleted) return null;
  return (
    <div className="border my-5 p-6 border-purple-400 rounded-lg">
      <div className="flex justify-between mb-4">
        <div>
          <h1 className="text-2xl">
            {title}{" "}
            <span className="text-sm text-purple-500">
              {auth.isAuthenticated ? (
                owner ? (
                  <Link to={`/users/${owner._id}`}>{owner.username}</Link>
                ) : (
                  "Anon User"
                )
              ) : (
                "Anon User"
              )}
            </span>
          </h1>
          <p className="text-xs text-slate-500">
            {moment(createdAt).fromNow()}
          </p>
        </div>
        <div className="flex gap-4">
          {!editMode && isUserPost && (
            <button
              onClick={() => setEditMode(true)}
              className="bg-purple-400 text-white p-2 focus:outline-none hover:bg-purple-600 rounded-md"
            >
              Edit
            </button>
          )}
          {(isAdmin || isUserPost) && (
            <>
              {editMode && (
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-400 text-white p-2 focus:outline-none hover:bg-gray-600 rounded-md"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleDelete}
                disabled={deleteLoading || updateLoading}
                className={`bg-red-400 text-white p-2 focus:outline-none hover:bg-red-600 rounded-md ${
                  (deleteLoading || updateLoading) && "cursor-not-allowed"
                }`}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </>
          )}
        </div>
      </div>
      {editMode ? (
        <div>
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            className="mb-4 w-full"
          />
          <div className="flex justify-end">
            <button
              onClick={handleUpdate}
              disabled={deleteLoading || updateLoading}
              className={`bg-green-400 text-white p-2 focus:outline-none hover:bg-green-600 rounded-md ${
                (deleteLoading || updateLoading) && "cursor-not-allowed"
              }`}
            >
              {updateLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-wrap break-words">
          {updatedContent !== content ? updatedContent : content}
        </p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Post;
