import { useContext } from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";

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
      <div className="hover:underline cursor-pointer hover:scale-110 hover:text-slate-300 focus:ring-2 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   ">
        {user.username}
      </div>
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
