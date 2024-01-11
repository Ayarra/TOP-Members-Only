const NavbarNoAuth = ({ setOpen }) => {
  return (
    <>
      <button
        className="border border-purple-700 hover:bg-purple-800 focus:ring-2 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   "
        onClick={() => setOpen(1)}
      >
        Log In
      </button>
      <button
        className="border border-purple-700 hover:bg-purple-800 focus:ring-2 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        onClick={() => setOpen(2)}
      >
        Register
      </button>
    </>
  );
};

export default NavbarNoAuth;
