import { Outlet } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";
export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container pt-20">
        <Outlet></Outlet>
      </div>
    </>
  );
}
