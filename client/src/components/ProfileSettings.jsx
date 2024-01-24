import { useContext, useState } from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";

const ProfileSettings = () => {
  const { auth } = useContext(AuthContext);
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(auth.user.isAdmin);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(auth.user);
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
      localStorage.setItem(
        "auth",
        JSON.stringify({
          isAuthenticated: true,
          user: {
            ...auth.user,
            isAdmin: true, // Update isAdmin if necessary
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

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-purple-100 rounded-md shadow-md">
      <h1 className="text-3xl mb-6 ">Settings</h1>

      {!isAdmin && (
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

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default ProfileSettings;
