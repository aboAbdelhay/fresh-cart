import { useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGetCart } from "../../Hooks/useGetCart";
import { useGetWishList } from "../../Hooks/useGetWishList";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let { data: dataCart } = useGetCart();
  let { data: dataWishList } = useGetWishList();
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  function closeMenu() {
    setIsMenuOpen(false); 
  }
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem("userToken");
    navigate("/login");
  }
  return (
    <>
      <nav className=" bg-[#f8f9fa] dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <img src={logo} className="" alt="" />
          <div className="flex items-center md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse">
            {localStorage.getItem("userToken") ? (
              <>
                <Link
                  className="transition-all duration-500 rounded-md cursor-pointer relative"
                  to="cart"
                >
                  <i className="fas fa-cart-shopping fa-xl"></i>
                  <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-white w-5 h-5 center bg-green-500 rounded-lg">
                    {dataCart?.numOfCartItems}
                  </span>
                </Link>
                <Link
                  className="transition-all duration-500 rounded-md cursor-pointer relative"
                  to="wishList"
                >
                  <i className="fas fa-heart fa-xl"></i>
                  <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-white w-5 h-5 center bg-green-500 rounded-lg">
                    {dataWishList?.count}
                  </span>
                </Link>
                <button
                  onClick={() => logout()}
                  type="button"
                  className="text-white bg-green-500 hover:bg-green-700 transition-all duration-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Logout
                </button>
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
                  <Link to="login">login</Link>
                </button>
                <button
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  <Link to="">Register</Link>
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
              <ul className="flex flex-col gap-y-3 p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-6  rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink className="transition-all duration-500" to="home">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink className="transition-all duration-500" to="cart">
                    cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="transition-all duration-500"
                    to="wishList"
                  >
                    wish list
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="transition-all duration-500"
                    to="products"
                  >
                    products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="transition-all duration-500"
                    to="categories"
                  >
                    categories
                  </NavLink>
                </li>
                <li>
                  <NavLink className="transition-all duration-500" to="brands">
                    brands
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
