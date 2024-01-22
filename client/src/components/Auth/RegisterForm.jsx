import { useEffect, useState } from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import axios from "../../api/axios";

export default function RegisterForm({ setOpen }) {
  const actionData = useActionData();
  const [password, setPassword] = useState();
  const [formError, setFormError] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const [spin, setSpin] = useState(false);

  function handleUsernameError(value) {
    if (value.length < 5)
      setFormError((prevData) => ({
        ...prevData,
        username: "Username should at least be 5 characters length.",
      }));
    else setFormError((prevData) => ({ ...prevData, username: "" }));
  }

  function handlePasswordError(value) {
    setPassword(value);

    if (
      value.length < 8 ||
      !/[A-Z]/.test(value) ||
      !/[a-z]/.test(value) ||
      !/[0-9]/.test(value) ||
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
    )
      setFormError((prevData) => ({
        ...prevData,
        password:
          "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.",
      }));
    else setFormError((prevData) => ({ ...prevData, password: "" }));
  }

  function handlePasswordConfirmationError(value) {
    if (password && value !== password)
      setFormError((prevData) => ({
        ...prevData,
        passwordConfirmation:
          "Confirmation password should match the password provided.",
      }));
    else
      setFormError((prevData) => ({ ...prevData, passwordConfirmation: "" }));
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "username") handleUsernameError(value);
    else if (name === "password") handlePasswordError(value);
    else if (name === "passwordConfirmation")
      handlePasswordConfirmationError(value);
  }
  useEffect(() => {
    if (actionData && !actionData.msg) {
      setSpin(true);

      setTimeout(() => {
        setOpen(0);
      }, 1000);
    }
  }, [actionData, setOpen]);

  return (
    <>
      <Form method="post" action="/">
        {actionData && actionData.msg && (
          <p className="text-center text-red-500">{actionData.msg}</p>
        )}

        {/* USERNAME */}
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
            type="text"
            placeholder="Username"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {formError.username && (
            <p className="text-red-500">{formError.username}</p>
          )}
        </div>

        {/* PASSWORD */}
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
            type="password"
            placeholder="***********"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {formError.password && (
            <p className="text-red-500">{formError.password}</p>
          )}
        </div>

        {/* PASSOWRD CONFIRMATION */}
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
            type="password"
            placeholder="***********"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {formError.passwordConfirmation && (
            <p className="text-red-500">{formError.passwordConfirmation}</p>
          )}
        </div>

        <button
          className={`w-full flex justify-center items-center bg-purple-400 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:cursor-not-allowed`}
          disabled={
            formError.username ||
            formError.password ||
            formError.passwordConfirmation
          }
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
          Register Account
        </button>
      </Form>
    </>
  );
}

export const registerAction = async (args) => {
  console.log(args);
  const data = await args.request.formData();
  const submission = {
    username: data.get("username"),
    password: data.get("password"),
    passwordConfirmation: data.get("passwordConfirmation"),
  };

  try {
    await axios.post("/auth/register", submission);
    redirect("/");
    return { msg: false };
  } catch (err) {
    return { msg: err.response.data };
  }
};
