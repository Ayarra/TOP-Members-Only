import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PostBox from "./components/PostBox";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <PostBox></PostBox>
    </>
  );
}

export default App;
