import { useEffect, useState } from "react";
import axios from "../api/axios";

const REGITER_URL = "/auth/register";

const RegisterForm = ({ setOpen }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const [formError, setFormError] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const [mssgErr, setMssgErr] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleError = () => {
    // username validation
    if (!formData.username)
      setFormError((prevData) => ({
        ...prevData,
        username: "Username required",
      }));
    else if (formData.username.length > 15)
      setFormError((prevData) => ({
        ...prevData,
        username: "Username should have a max length of 15 characters",
      }));
    else setFormError((prevData) => ({ ...prevData, username: "" }));

    // password validation
    if (!formData.password)
      setFormError((prevData) => ({
        ...prevData,
        password: "Passowrd required",
      }));
    else if (formData.password.length < 7)
      setFormError((prevData) => ({
        ...prevData,
        password: "Password should have a minimum length of 7 characters",
      }));
    else if (!/[A-Z]/.test(formData.password))
      setFormError((prevData) => ({
        ...prevData,
        password: "Password should contain at least one uppercase character",
      }));
    else if (!/[0-9]/.test(formData.password))
      setFormError((prevData) => ({
        ...prevData,
        password: "Password should conatina at least one digit",
      }));
    else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password))
      setFormError((prevData) => ({
        ...prevData,
        password: "Password should contain at least one special character",
      }));
    else setFormError((prevData) => ({ ...prevData, password: "" }));

    // password confirmation validation
    if (!formData.passwordConfirmation)
      setFormError((prevData) => ({
        ...prevData,
        passwordConfirmation: "Password confirmation required",
      }));
    else if (formData.password !== formData.passwordConfirmation)
      setFormError((prevData) => ({
        ...prevData,
        passwordConfirmation:
          "confirmation password should match the password provided",
      }));
    else
      setFormError((prevData) => ({ ...prevData, passwordConfirmation: "" }));
  };

  useEffect(() => {
    handleError();
  }, [formData.username, formData.password, formData.passwordConfirmation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formError.username &&
      !formError.password &&
      !formError.passwordConfirmation
    ) {
      try {
        await axios.post(REGITER_URL, formData);
        setOpen(0);
      } catch (err) {
        console.log("error");
        console.log(err.response.data);
        setMssgErr(err.response.data.err);
      }
    }
    setFormData({
      username: "",
      password: "",
      passwordConfirmation: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="">
      {mssgErr && (
        <p
          className="text-red-500 mt-2 flex-wrap text-center
        mb-2"
        >
          {mssgErr}
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
          autoComplete="off"
          required
          name="username"
          value={formData.username}
          onChange={(e) => {
            handleChange(e);
            handleError(e);
          }}
          type="text"
          placeholder="Username"
        />
        {formData.username && formError.username && (
          <p className="text-red-500 mt-2 mb-0 flex-wrap">
            {formError.username}
          </p>
        )}
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
        {formData.password && formError.password && (
          <p className="text-red-500 mt-2 mb-0 flex-wrap">
            {formError.password}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="passwordConfirmation"
        >
          Confirm Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="passwordConfirmation"
          required
          value={formData.passwordConfirmation}
          onChange={(e) => {
            handleChange(e);
          }}
          type="password"
          placeholder="***********"
        />
        {formData.passwordConfirmation && formError.passwordConfirmation && (
          <p className="text-red-500 mt-2 mb-0 flex-wrap">
            {formError.passwordConfirmation}
          </p>
        )}
      </div>
      <button
        className={`w-full bg-purple-400 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:cursor-not-allowed`}
        disabled={
          formError.password ||
          formError.username ||
          formError.passwordConfirmation
        }
        type="submit"
      >
        Register Account
      </button>
    </form>
  );
};

export default RegisterForm;
