import { useEffect, useState, createContext, useContext } from "react";

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Quiz context must be used within a QuizProvider.");
  }

  return context;
};

type User = {
  token: string | null;
  isLoggedIn: boolean;
};

type Props = {
  children: React.ReactNode;
};

export default function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<User>({ token: null, isLoggedIn: false });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem("token");

    if (tokenLocalStorage) {
      setUser({ token: tokenLocalStorage, isLoggedIn: true });
    }

    setIsLoading(false);
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
