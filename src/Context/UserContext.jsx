import { createContext, useState, useEffect } from "react";
import { useGetCart } from "../Hooks/useGetCart";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
  let [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
