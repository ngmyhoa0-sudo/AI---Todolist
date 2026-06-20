import { useState } from "react";

function useAuth() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const isAuthenticated = !!user;

  return {
    user,
    setUser,
    isAuthenticated,
  };
}

export default useAuth;
