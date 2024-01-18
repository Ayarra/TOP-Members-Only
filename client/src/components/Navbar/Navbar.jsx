import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";
import Modal from "../Modal";
import NavbarAuth from "./NavbarAuth";
import NavbarNoAuth from "./NavbarNoAuth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { auth } = useContext(AuthContext);

  return (
    <div className="bg-purple-400 flex justify-between p-6">
      <Link to="/" className="text-4xl">
        <span className="text-slate-200">C</span>lub
        <span className="text-slate-200">H</span>ouse
      </Link>

      <div className="flex gap-8 text-slate-200">
        {auth.isAuthenticated ? (
          <NavbarAuth user={auth.user} />
        ) : (
          <NavbarNoAuth setOpen={setOpen} />
        )}
      </div>
      <Modal open={open} setOpen={setOpen}>
        {open === 1 && <LoginForm />}
        {open === 2 && <RegisterForm />}
      </Modal>
    </div>
  );
};

export default Navbar;