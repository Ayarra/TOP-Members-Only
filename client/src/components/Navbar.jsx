import { useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";
import LoginForm from "./LoginForm";
import Modal from "./Modal";
import NavbarAuth from "./NavbarAuth";
import NavbarNoAuth from "./NavbarNoAuth";
import RegisterForm from "./RegisterForm";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { auth } = useContext(AuthContext);

  return (
    <div className="bg-purple-400 flex justify-between p-6">
      <div className="text-4xl">
        <span className="text-slate-200">C</span>lub
        <span className="text-slate-200">H</span>ouse
      </div>

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
