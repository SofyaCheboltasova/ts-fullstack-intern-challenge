import { createContext, useState, ReactNode, useContext } from "react";
import { createUser, PostResponse } from "../api/api";
import UserType from "../types/userData";

interface AuthContextType {
  user: UserType | null;
  displayLogin: boolean;
  isAuthorized: boolean;
  onLogin: (login: string, password: string) => Promise<PostResponse>;
  onLogout: () => void;
  setDisplayLogin: (data: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [displayLogin, setDisplayLogin] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  async function onLogin(
    login: string,
    password: string
  ): Promise<PostResponse> {
    const response: PostResponse = await createUser(login, password);
    if (response.user) {
      setUser(user);
      setIsAuthorized(true);
      localStorage.setItem("auth_token", response.user.token);
    }
    return response;
  }

  function onLogout() {
    setUser(null);
    setIsAuthorized(false);
    localStorage.removeItem("auth_token");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        displayLogin,
        isAuthorized,
        onLogin,
        onLogout,
        setDisplayLogin,
      }}
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

