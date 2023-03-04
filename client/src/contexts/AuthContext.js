import { createContext, useContext, useMemo } from "react";
import { decodeToken, isExpired } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TOKEN_KEY } from "../utils/utils";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage(TOKEN_KEY, null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    let path = "/profile";
    if (data.role === "Admin") path = "/admin/users";
    navigate(path);
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const isAuthenticated = () => {
    return !isExpired(user?.token);
  };

  const isAdmin = () => {
    if (!isAuthenticated()) return false;
    const payload = decodeToken(user?.token);
    return payload.role === "Admin";
  };

  const value = useMemo(
    () => ({
      user,
      isAdmin,
      login,
      logout,
      isAuthenticated,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
