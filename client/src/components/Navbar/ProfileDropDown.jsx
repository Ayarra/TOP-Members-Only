import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

const ProfileDropDown = () => {
  const [dropped, setDropped] = useState(false);
  const { auth } = useContext(AuthContext);

  return (
    <div className="relative inline-block text-left">
      <button
        className=" hover:bg-purple-800 focus:ring-2 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm  text-center p-auto "
        onClick={() => {
          setDropped(!dropped);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-slate-200 hover:text-slate-300"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
        </svg>
      </button>
      {dropped && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ease-in">
          <Link
            to={`/users/${auth.user.userID}`}
            className="text-gray-700 block px-4 py-2 text-sm hover:bg-purple-800 hover:text-slate-200"
          >
            Your posts
          </Link>
          <Link
            to="/settings"
            className="text-gray-700 block px-4 py-2 text-sm hover:bg-purple-800 hover:text-slate-200"
          >
            Account settings
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
