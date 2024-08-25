import { useContext, useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGetCart } from "../../Hooks/useGetCart";
import { useGetWishList } from "../../Hooks/useGetWishList";
import { UserContext } from "../../Context/UserContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpenImg, setIsMenuOpenImg] = useState(false);
  let { userData, setUserData } = useContext(UserContext);
  let { data: dataCart } = useGetCart();
  let { data: dataWishList } = useGetWishList();
  let navigate = useNavigate();

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
    setIsMenuOpenImg(false);
  }
  function toggleMenuImg() {
    setIsMenuOpenImg(!isMenuOpenImg);
    setIsMenuOpen(false);
  }
  function closeMenuImg() {
    setIsMenuOpenImg(false);
  }
  function closeMenu() {
    setIsMenuOpen(false);
  }

  function logout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-[#f8f9fa] dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <img src={logo} className="" alt="Logo" />
          <div className="flex items-center md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse">
            {localStorage.getItem("userToken") ? (
              <>
                <Link
                  className="transition-all duration-500 rounded-md cursor-pointer relative"
                  to="cart"
                >
                  <i className="fas fa-cart-shopping fa-xl"></i>
                  <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-white w-5 h-5 center bg-green-500 rounded-lg">
                    {dataCart ? dataCart?.numOfCartItems : "0"}
                  </span>
                </Link>
                <Link
                  className="transition-all duration-500 rounded-md cursor-pointer relative"
                  to="wishList"
                >
                  <i className="fas fa-heart fa-xl"></i>
                  <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-white w-5 h-5 center bg-green-500 rounded-lg">
                    {dataWishList?.count ? dataWishList?.count : "0"}
                  </span>
                </Link>
                <div className="relative">
                  <button
                    type="button"
                    className="flex text-sm bg-gray-200 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    id="user-menu-button"
                    aria-controls="user-dropdown"
                    aria-expanded={isMenuOpenImg}
                    onClick={toggleMenuImg}
                  >
                    <i className="fas fa-user-circle text-3xl"></i>
                  </button>
                  {isMenuOpenImg && (
                    <div
                      className="z-50 absolute right-0 mt-2 w-72 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                      id="user-dropdown"
                    >
                      <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">
                          {userData?.name}
                        </span>
                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                          {userData?.email}
                        </span>
                      </div>
                      <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                          <Link
                            to="/personalDetails"
                            onClick={closeMenuImg}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            <i class="fa-solid fa-user-pen text-green-500"></i>{" "}
                            Personal Details
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/changePassword"
                            onClick={closeMenuImg}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            <i class="fa-solid fa-lock text-green-500"></i>{" "}
                            Change Password
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/addAddress"
                            onClick={closeMenuImg}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            <i class="fa-solid fa-address-card text-green-500"></i>{" "}
                            Add Address
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={logout}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            <i class="fa-solid fa-arrow-right-from-bracket fa-rotate-180 text-red-500"></i>{" "}
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <button
                  data-collapse-toggle="navbar-sticky"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-sticky"
                  aria-expanded={isMenuOpen}
                  onClick={toggleMenu}
                >
                  <i className="fas fa-bars fa-xl"></i>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  <Link to="/login">login</Link>
                </button>
                <button
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  <Link to="/">Register</Link>
                </button>
              </>
            )}
          </div>
          <div
            className={`items-center justify-between transition-all duration-500 ${
              isMenuOpen ? "block" : "hidden"
            } w-full text-center md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            {localStorage.getItem("userToken") && (
              <ul className="flex flex-col gap-y-3 p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink
                    className="transition-all duration-500"
                    to="home"
                    onClick={closeMenu}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="transition-all duration-500"
                    to="products"
                    onClick={closeMenu}
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="transition-all duration-500"
                    to="categories"
                    onClick={closeMenu}
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="transition-all duration-500"
                    to="brands"
                    onClick={closeMenu}
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="transition-all duration-500"
                    to="allorders"
                    onClick={closeMenu}
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
