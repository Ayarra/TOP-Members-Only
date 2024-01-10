import { useContext, useState } from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";

// Login URL
const LOGIN_URL = "/auth/login";

const LoginForm = ({ setOpen }) => {
  const { setAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.username && formData.password) {
      try {
        const response = await axios.post(LOGIN_URL, formData, {
          withCredentials: true,
        });
        setAuth({
          isAuthenticated: true,
          user: { username: formData.username },
        });
        setOpen(0);
      } catch (err) {
        setFormError(err.response.data.message);
        console.log(err.response.data.message);
      }
    }
    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {formError && (
        <p
          className="text-red-500 mt-2 flex-wrap text-center
        mb-2"
        >
          {formError}
        </p>
      )}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="username"
          required
          autoComplete="off"
          value={formData.username}
          onChange={(e) => {
            handleChange(e);
          }}
          type="text"
          placeholder="Username"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="password"
          required
          value={formData.password}
          onChange={(e) => {
            handleChange(e);
          }}
          type="password"
          placeholder="***********"
        />
      </div>

      <button
        className="w-full bg-purple-400 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:cursor-not-allowed"
        type="submit"
        disabled={!formData.password || !formData.username}
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
