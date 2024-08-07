import React, { useContext } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Navbar() {
  let { userData, setUserData } = useContext(UserContext);
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="bg-gray-200  md:fixed top-0 inset-x-0  z-50 py-2 text-center capitalize">
        <div className="container flex flex-col md:flex-row justify-between items-center text-gray-500">
          <div className="flex flex-col md:flex-row space-x-3">
            <img src={logo} width={120} alt="" />
            {userData && (
              <ul className="flex flex-col md:flex-row space-x-2">
                <li>
                  <NavLink className="py-1 px-2 transition-all duration-500 rounded-md" to="home">Home</NavLink>
                </li>
                <li>
                  <NavLink className="py-1 px-2 transition-all duration-500 rounded-md" to="cart">cart</NavLink>
                </li>
                <li>
                  <NavLink className="py-1 px-2 transition-all duration-500 rounded-md" to="products">products</NavLink>
                </li>
                <li>
                  <NavLink className="py-1 px-2 transition-all duration-500 rounded-md" to="categories">categories</NavLink>
                </li>
                <li>
                  <NavLink className="py-1 px-2 transition-all duration-500 rounded-md" to="brands">brands</NavLink>
                </li>
              </ul>
            )}
          </div>
          <div className="">
            <ul className="flex flex-col md:flex-row space-x-2 items-center">
              <li className="space-x-2 text-black">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-linkedin-in"></i>
                <i className="fab fa-youtube"></i>
                <i className="fab fa-twitter"></i>
                <i className="fab fa-instagram"></i>
              </li>
              {userData ? (
                <li>
                  <li
                    onClick={() => logout()}
                    className="p-1  rounded-lg cursor-pointer"
                  >
                    logout
                  </li>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink className="py-1 px-2 transition-all duration-500 rounded-md" to="login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink className="py-1 px-2 transition-all duration-500 rounded-md" to="">Register</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
