import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import ProfileDropDown from "./ProfileDropDown";

const NavbarAuth = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const logout = async () => {
    try {
      await axios.get("/auth/logout", {
        withCredentials: true,
      });
      navigate("/");
      setAuth({ isAuthenticated: false, user: null });
      localStorage.clear();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <ProfileDropDown />
      {/* <Link to="/"> */}
      <button
        className="border border-purple-700 hover:bg-purple-800 focus:ring-2 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        onClick={() => logout()}
      >
        Log out
      </button>
      {/* </Link> */}
    </>
  );
};

export default NavbarAuth;
