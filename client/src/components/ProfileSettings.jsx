import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";

const ProfileSettings = () => {
  const navigate = useNavigate();

  const { auth, setAuth } = useContext(AuthContext);
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(auth.user?.isAdmin || false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMakeAdmin = async () => {
    try {
      setLoading(true);
      await axios.put(
        `/users/${auth.user.userID}/admin`,
        {
          adminPassword: adminPassword,
        },
        {
          withCredentials: true,
        }
      );

      // Update only the isAdmin property in local storage
      localStorage.setItem(
        "auth",
        JSON.stringify({
          ...auth,
          user: {
            ...auth.user,
            isAdmin: true,
          },
        })
      );
      setIsAdmin(true);
    } catch (err) {
      console.error("Error making user admin: ", err);
      setError("Error making user admin. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);

      await axios.delete(`/users/${auth.user.userID}`, {
        withCredentials: true,
        data: {
          adminPassword: adminPassword,
        },
      });

      localStorage.removeItem("auth");
      setAuth({});
      navigate("/");
    } catch (err) {
      console.error("Error deleting account: ", err);
      setError("Error deleting account. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-purple-100 rounded-md shadow-md">
      <h1 className="text-3xl mb-6">Settings</h1>

      {isAdmin ? (
        <p className="text-green-500">You are already an admin.</p>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2 text-purple-700">
            Make Admin
          </h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-purple-300"
          />
          <button
            onClick={handleMakeAdmin}
            disabled={loading}
            className="mt-2 bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 focus:outline-none"
          >
            Make Admin
          </button>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-purple-700">
          Delete Account
        </h2>
        <p className="text-red-500">
          Warning: Deleting your account is irreversible. All your data will be
          lost.
        </p>
        <button
          onClick={handleDeleteAccount}
          disabled={loading}
          className="mt-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none"
        >
          Delete Account
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default ProfileSettings;
