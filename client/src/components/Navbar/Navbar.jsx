import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";

import Modal from "../Modal";
import NavbarAuth from "./NavbarAuth";
import NavbarNoAuth from "./NavbarNoAuth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("auth");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setAuth(foundUser);
    }
    setLoading(false);
  }, [setAuth]);

  const handleHomeClick = () => {
    window.location.href = "/";
  };

  if (loading) {
    return null;
  }

  return (
    <div className="bg-purple-400  flex flex-col sm:flex-row sm:justify-between items-center gap-6  p-6 min-w-fit ">
      <button className="text-4xl" onClick={handleHomeClick}>
        <span className="text-slate-200">C</span>lub
        <span className="text-slate-200">H</span>ouse
      </button>

      <div className="flex gap-8 text-slate-200">
        {auth.isAuthenticated ? (
          <NavbarAuth user={auth.user} />
        ) : (
          <NavbarNoAuth setOpen={setOpen} />
        )}
      </div>
      <Modal open={open} setOpen={setOpen}>
        {open === 1 && <LoginForm />}
        {open === 2 && <RegisterForm setOpen={setOpen} />}
      </Modal>
    </div>
  );
};

export default Navbar;
