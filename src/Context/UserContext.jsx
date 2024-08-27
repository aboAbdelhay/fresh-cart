import { createContext, useState, useEffect } from "react";
import { useGetCart } from "../Hooks/useGetCart";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
  let [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  
  let [cartOwner, setCartOwner] = useState(
    JSON.parse(localStorage.getItem("cartOwner"))
  );

  let { data: cart } = useGetCart();

  useEffect(() => {
    if (cart) {
      let owner = cart?.data?.cartOwner;
      setCartOwner(owner);
      localStorage.setItem("cartOwner", JSON.stringify(owner));
    }
  }, [cart]);

  return (
    <UserContext.Provider value={{ userData, setUserData, cartOwner }}>
      {children}
    </UserContext.Provider>
  );
}
