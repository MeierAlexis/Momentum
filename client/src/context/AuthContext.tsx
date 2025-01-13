import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest } from "../api/auth";
import { UserRegister, UserLogin } from "../interfaces/auth";

// Define la forma del contexto
interface AuthContextType {
  user: UserRegister | UserLogin | null;
  signup: (user: UserRegister) => Promise<void>;
  login: (user: UserLogin) => Promise<void>;
  isAuthenticated: boolean;
  errors: string[];
}

// Crea el contexto con un tipo explícito
export const AuthContext = createContext<AuthContextType | null>(null);

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserRegister | UserLogin | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const signup = async (userData: UserRegister) => {
    try {
      const res = await registerRequest(userData);
      setUser(res.data as UserRegister);
      setIsAuthenticated(true);
      setErrors([]);
    } catch (error: any) {
      setErrors(
        error.response?.data?.message
          ? Array.isArray(error.response.data.message)
            ? error.response.data.message
            : [error.response.data.message]
          : ["Unexpected error"]
      );
      throw error;
    }
  };

  const login = async (userData: UserLogin) => {
    try {
      const res = await loginRequest(userData);
      setUser(res.data as UserLogin);
      setIsAuthenticated(true);
      setErrors([]);
    } catch (error: any) {
      setErrors(
        error.response?.data?.message
          ? Array.isArray(error.response.data.message)
            ? error.response.data.message
            : [error.response.data.message]
          : ["Unexpected error"]
      );
      throw error;
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, signup, isAuthenticated, errors, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};
