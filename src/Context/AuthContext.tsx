import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  userName: string | undefined;
  signIn: (username: string, navigateCallback: () => void) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | undefined>(undefined);

  const signIn = useCallback(
    (username: string, navigateCallback: () => void) => {
      setIsLoggedIn(true);
      setUserName(username);
      console.log(`User ${username} signed in`);
      navigateCallback();
    },
    []
  );

  const signOut = useCallback(() => {
    setIsLoggedIn(false);
    setUserName(undefined);
    console.log('User signed out');
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
