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

    const searchParams = new URLSearchParams(window.location.search);
    const returnUrl = searchParams.get("returnUrl");
    if (returnUrl) navigate(returnUrl);
    else {
      let path = "/profile";
      if (data.role === "Admin") path = "/admin/dashboard";
      navigate(path);
    }
  };

  const loginWithoutRedirecting = (data, cb) => {
    setUser(data);
    if (cb) cb();
  };

  const getUsername = () => {
    return user?.username;
  };

  const getUserId = () => {
    return user?.profileId;
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
    return isInRole("Admin");
  };

  const isInRole = (...roles) => {
    if (!isAuthenticated()) return false;
    const payload = decodeToken(user?.token);
    return roles.includes(payload.role);
  };

  const value = useMemo(
    () => ({
      user,
      isAdmin,
      login,
      logout,
      isAuthenticated,
      isInRole,
      loginWithoutRedirecting,
      getUsername,
      getUserId,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
