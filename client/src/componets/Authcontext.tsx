import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  fullName: string | null;
  login: (fullName: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  fullName: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fullName, setFullName] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { fullName } = JSON.parse(storedUser);
      setIsAuthenticated(true);
      setFullName(fullName);
    }
  }, []);

  const login = (fullName: string, token: string) => {
    setIsAuthenticated(true);
    setFullName(fullName);
    localStorage.setItem("user", JSON.stringify({ fullName, token }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setFullName(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, fullName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
