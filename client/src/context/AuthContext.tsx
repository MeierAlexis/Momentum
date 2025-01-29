import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  logoutRequest,
} from "../api/auth";
import { UserRegister, UserLogin } from "../interfaces/auth";
import Cookie from "js-cookie";

interface AuthContextType {
  user: UserRegister | UserLogin | null;
  signup: (user: UserRegister) => Promise<bool>;
  login: (user: UserLogin) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  errors: string[];
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserRegister | UserLogin | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const logout = async () => {
    await logoutRequest();
    Cookie.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  const signup = async (userData: UserRegister) => {
    try {
      const res = await registerRequest(userData);

      setUser(res.data);
      setIsAuthenticated(true);
      setErrors([]);
      return true;
    } catch (error: any) {
      setErrors(
        error.response?.data?.message
          ? [error.response.data.message]
          : ["Unexpected error"]
      );
      return false;
    }
  };

  const login = async (userData: UserLogin) => {
    try {
      const res = await loginRequest(userData);
      setUser(res.data);
      setIsAuthenticated(true);
      setErrors([]);
    } catch (error: any) {
      setErrors(
        error.response?.data?.message
          ? [error.response.data.message]
          : ["Unexpected error"]
      );
    }
  };

  useEffect(() => {
    async function checkLogin() {
      const token = Cookie.get("token");
      if (token) {
        try {
          const res = await verifyTokenRequest();
          setUser(res.data);
          setIsAuthenticated(true);
        } catch {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout, isAuthenticated, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
