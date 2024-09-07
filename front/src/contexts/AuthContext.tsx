import { createContext, useState, ReactNode, useContext } from "react";
import { createUser, PostResponse } from "../api/api";

interface AuthContextType {
  displayLogin: boolean;
  isAuthorized: boolean;
  onLogin: (login: string, password: string) => Promise<PostResponse>;
  onLogout: () => void;
  setDisplayLogin: (data: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [displayLogin, setDisplayLogin] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  async function onLogin(
    login: string,
    password: string
  ): Promise<PostResponse> {
    const response = await createUser(login, password);
    if (response.token) {
      setIsAuthorized(true);
      localStorage.setItem("auth_token", response.token);
    }
    return response;
  }

  function onLogout() {
    setIsAuthorized(false);
    localStorage.removeItem("auth_token");
  }

  return (
    <AuthContext.Provider
      value={{ displayLogin, isAuthorized, onLogin, onLogout, setDisplayLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться в AuthProvider");
  }
  return context;
};

