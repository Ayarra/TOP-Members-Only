import { useContext } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import ProfileDropDown from "./ProfileDropDown";

const LOGOUT_URL = "/auth/logout";

const NavbarAuth = ({ user }) => {
  const { setAuth } = useContext(AuthContext);
  const logout = async () => {
    try {
      await axios.get(LOGOUT_URL);
      setAuth({ isAuthenticated: false, user: null });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <ProfileDropDown />
      <button
        className="border border-purple-700 hover:bg-purple-800 focus:ring-2 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        onClick={() => logout()}
      >
        Log out
      </button>
    </>
  );
};

export default NavbarAuth;
