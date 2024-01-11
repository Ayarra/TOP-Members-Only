import { Outlet } from "react-router-dom";
import WriteBox from "./components/InsertBox";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>

      <WriteBox></WriteBox>
    </>
  );
}

export default App;
