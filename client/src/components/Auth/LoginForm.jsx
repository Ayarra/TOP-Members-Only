import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";

const LoginForm = ({ setOpen }) => {
  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [spin, setSpin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.username && formData.password) {
      try {
        const response = await axios.post("/auth/login", formData, {
          withCredentials: true,
        });
        setAuth({
          isAuthenticated: true,
          user: response.data,
        });
        setSpin(true);
        setTimeout(() => {
          setOpen(0);
          navigate("/");
        }, 1000);
      } catch (err) {
        setFormError(err.response);
        console.log(err);
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
          {formError.data.message}
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
        className="w-full flex justify-center items-center bg-purple-400 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:cursor-not-allowed"
        type="submit"
        disabled={!formData.password || !formData.username}
      >
        <svg
          className={`${
            spin ? "animate-spin" : "hidden"
          } -ml-1 mr-3 h-7 w-7 text-slate-400`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
